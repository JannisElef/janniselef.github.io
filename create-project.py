#!/usr/bin/env python3
"""
Create new project from template – cloned NEXT TO pages repo (../)
"""


import re
import datetime
import shutil
import subprocess
import sys
from pathlib import Path




def ensure_gh_installed():
    if shutil.which("gh") is not None:
        return True

    print("GitHub CLI (gh) is not installed.")

    install = input("Install it automatically? [Y/n] ").strip().lower()
    if install not in ("", "y", "yes"):
        print("Please install it manually: https://cli.github.com/")
        sys.exit(1)

    return install_gh()

def install_gh():
    try:
        if sys.platform.startswith("linux"):
            print("→ Installing via apt...")
            subprocess.run(["sudo", "apt", "update"], check=True)
            subprocess.run(["sudo", "apt", "install", "-y", "gh"], check=True)

        elif sys.platform == "darwin":
            print("→ Installing via Homebrew...")
            subprocess.run(["brew", "install", "gh"], check=True)

        elif sys.platform.startswith("win"):
            print("→ Installing via winget...")
            subprocess.run(["winget", "install", "--id", "GitHub.cli", "-e"], check=True)

        else:
            print("Unknown OS. Please install GitHub CLI manually.")
            sys.exit(1)

    except subprocess.CalledProcessError:
        print("Automatic installation failed.")
        print("Please install it manually: https://cli.github.com/")
        sys.exit(1)

    if shutil.which("gh") is None:
        print("gh was not found after installation.")
        sys.exit(1)

    print("✓ GitHub CLI installed successfully")
    return True

def ensure_gh_authenticated():
    try:
        subprocess.run(
            ["gh", "auth", "status"],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
    except subprocess.CalledProcessError:
        print("You are not logged into GitHub.")
        login = input("Log in now? [Y/n] ").strip().lower()

        if login in ("", "y", "yes"):
            subprocess.run(["gh", "auth", "login"], check=True)
        else:
            sys.exit(1)



def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')


def run(cmd, cwd=None, check=True, capture_output=False):
    return subprocess.run(
        cmd, cwd=cwd, check=check,
        capture_output=capture_output, text=True
    )


def ask_yes_no(question: str, default_yes: bool = True) -> bool:
    d = "Y" if default_yes else "N"
    o = "n" if default_yes else "y"
    while True:
        a = input(f"{question} [{d}/{o}] ").strip().lower()
        if a in ("", "y", "yes"):
            return True
        if a in ("n", "no"):
            return False
        print("Please answer y/n.")


def git_commit_and_push(repo_dir: Path, commit_msg: str):
    try:
        run(["git", "add", "."], cwd=repo_dir)
        run(["git", "commit", "-m", commit_msg], cwd=repo_dir)
        run(["git", "push", "-u", "origin", "main"], cwd=repo_dir)
        print(f"✓ {commit_msg!r} committed & pushed")
    except subprocess.CalledProcessError as e:
        print("Git failed:")
        print(e)
        if e.stdout:   print("stdout:", e.stdout.strip())
        if e.stderr:   print("stderr:", e.stderr.strip())


def main():

    ensure_gh_installed()
    ensure_gh_authenticated()

    result = run(
        ["gh", "api", "user", "--jq", ".login"],
        capture_output=True
    )

    GITHUB_USERNAME = result.stdout.strip()
    PAGES_DOMAIN = f"{GITHUB_USERNAME.lower()}.github.io"

    print(f"User: \t{GITHUB_USERNAME}")
    print(f"Domain: {PAGES_DOMAIN}\n")

    print(" ───────── Create new project from template ───────── ")

    name = input("Project name: ").strip()
    if not name:
        print("Aborted – no name given.")
        return

    desc = input("Description: ").strip() or "No description yet."

    print("└────────────────────────────────────────────────────┘\n")

    today = datetime.date.today().isoformat()
    slug = slugify(name)
    repo_name = slug
    full_repo = f"{GITHUB_USERNAME}/{repo_name}"

    parent_dir = Path.cwd().parent
    repo_path = parent_dir / repo_name

    print(f"\n→ Target path: {repo_path}")

    try:
        if repo_path.exists():
            print(f"→ Folder already exists: {repo_path}")
            if not ask_yes_no("Continue anyway (fetch + reset --hard origin/main)?", default_yes=False):
                print("Aborted.")
                return

            git_dir = repo_path / ".git"
            if not git_dir.is_dir():
                print("ERROR: Folder exists but is NOT a git repository.")
                return

            print("→ Updating existing repo...")
            run(["git", "fetch", "origin"], cwd=repo_path, check=True)
            run(["git", "reset", "--hard", "origin/main"], cwd=repo_path, check=True)
            print("→ Repo reset to origin/main")

        else:
            print("Creating new repository and cloning...")
            run([
                "gh", "repo", "create", repo_name,
                "--public",
                "--template", f"{GITHUB_USERNAME}/project-template",
                "--description", desc,
                "--clone"
            ], cwd=parent_dir, check=True)
            print(f"\t→ New repository created & cloned: {repo_path}")

        
        # update repo description
        run([
            "gh", "repo", "edit", full_repo,
            "--description", desc
        ], check=True)
        print(f"\t→ Description of Repo set to: {desc}")

        # set repo homepage-URL
        homepage_url = f"https://{PAGES_DOMAIN}/projects/{slug}/"
        run([
            "gh", "repo", "edit", full_repo,
            "--homepage", homepage_url
        ], check=True)
        print(f"\t→ Website of Repo set to: {homepage_url}")
        
    except subprocess.CalledProcessError as e:
        print("Command failed:")
        print(" ".join(e.cmd))
        if e.stderr:
            print("Error:", e.stderr.strip())
        return
    except Exception as e:
        print("Unexpected error:")
        print(e)
        return

    #  README
    readme = repo_path / "README.md"
    if readme.is_file():
        readme_content = f"""# {name}

{desc}

"""
        readme.write_text(readme_content, encoding="utf-8")
        print("→ README.md updated")

    # ── create _projects/*.md ────────────────────────────────────
    template = Path("_projects/project-template.md")
    target = Path("_projects") / f"{slug}.md"

    if not template.is_file():
        print("ERROR: project-template.md not found in _projects/")
        return

    content = template.read_text(encoding="utf-8")
    parts = content.split("---", 2)

    front = f"""---
layout: default
title: {name}
description: {desc}
repo: {full_repo}
branch: main
tags: ["Active"]
date: {today}
---
"""

    body = parts[2].strip() if len(parts) >= 3 else ""
    target.write_text(front + "\n" + body + "\n", encoding="utf-8")
    print(f"→ Created {target}")

    print("\n" + "─" * 60 + "\n")

    # commit & push new project
    if ask_yes_no(f"Commit & push 'Initial commit' in ../{repo_name}?"):
        git_commit_and_push(repo_path, "Initial commit")

    print()

    # commit & push github-pages repo
    if ask_yes_no(f"Commit & push 'Add {slug}' to pages repo?"):
        git_commit_and_push(Path("."), f"Add {slug}")

    print("\nDone.\n")
    print(f"Project website:")
    print(f"  → {homepage_url}\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nAborted by user.")
    except Exception as e:
        print("Unexpected error:")
        print(e)