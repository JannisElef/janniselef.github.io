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
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def run(cmd, cwd=None, check=True, capture_output=False):
    return subprocess.run(
        cmd,
        cwd=cwd,
        check=check,
        capture_output=capture_output,
        text=True
    )


def ask_yes_no(question: str, default_yes: bool = True) -> bool:
    d = "Y" if default_yes else "N"
    o = "n" if default_yes else "y"
    while True:
        a = input(f"{question} [{d}/{o}] ").strip().lower()
        if not a:
            return default_yes
        if a in ("y", "yes"):
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
        if e.stdout:
            print("stdout:", e.stdout.strip())
        if e.stderr:
            print("stderr:", e.stderr.strip())


def strip_jekyll_frontmatter(text: str) -> str:
    """
    Removes leading Jekyll frontmatter (--- ... ---) if present
    and returns the remaining body.
    """
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            return parts[2].lstrip("\n")
    return text


def strip_leading_meta_info_include(text: str) -> str:
    """
    Removes a leading `{% include meta-info.html %}` if already present,
    so we don't duplicate it when rewriting index.html.
    """
    return re.sub(
        r'^\s*{%\s*include\s+meta-info\.html\s*%}\s*\n?',
        '',
        text,
        count=1,
        flags=re.MULTILINE
    ).lstrip("\n")


def update_pages_index(
    repo_path: Path,
    *,
    name: str,
    github_username: str,
    description: str,
    full_description: str,
    full_repo: str,
    today: str,
    repo_pages_url: str
):
    """
    Overwrites index.html for GitHub Pages projects:
    - keeps layout: none
    - adds normal project frontmatter fields
    - inserts {% include meta-info.html %} directly below frontmatter
    - preserves the previous page body (without old frontmatter)
    """
    index_path = repo_path / "index.html"

    existing_body = ""
    if index_path.is_file():
        existing_body = index_path.read_text(encoding="utf-8")
        existing_body = strip_jekyll_frontmatter(existing_body)
        existing_body = strip_leading_meta_info_include(existing_body).strip()

    frontmatter = f"""---
layout: none
title: {name}
author: {github_username}
description: {description}
full_description: {full_description}
repo: {full_repo}
branch: main
date: {today}

# redirect_url: {repo_pages_url} # if project has its own website
# thumbnail: /assets/img/thumbnail.gif # if thumbnail is a gif
---
"""

    content = frontmatter + "\n{% include meta-info.html %}\n"

    if existing_body:
        content += "\n" + existing_body + "\n"
    else:
        content += "\n"

    index_path.write_text(content, encoding="utf-8")
    print("→ index.html updated")


def upsert_yaml_key(text: str, key: str, value: str) -> str:
    """
    Replaces `key: ...` in YAML-like text, or appends it if missing.
    """
    pattern = rf"(?m)^{re.escape(key)}:\s*.*$"
    replacement = f"{key}: {value}"

    if re.search(pattern, text):
        return re.sub(pattern, replacement, text)
    else:
        if not text.endswith("\n"):
            text += "\n"
        return text + replacement + "\n"


def update_config_for_pages(repo_path: Path, pages_domain: str, repo_name: str):
    """
    Recommended Jekyll config for project pages:
      url: https://<username>.github.io
      baseurl: /<repo_name>
    """
    config_path = repo_path / "_config.yml"
    if not config_path.is_file():
        print("→ _config.yml not found, skipped")
        return

    config_text = config_path.read_text(encoding="utf-8")

    root_url = f"https://{pages_domain}"
    baseurl = f"/{repo_name}"

    config_text = upsert_yaml_key(config_text, "url", root_url)
    config_text = upsert_yaml_key(config_text, "baseurl", baseurl)

    config_path.write_text(config_text, encoding="utf-8")
    print(f"→ _config.yml updated (url: {root_url}, baseurl: {baseurl})")


def main():
    ensure_gh_installed()
    ensure_gh_authenticated()

    result = run(
        ["gh", "api", "user", "--jq", ".login"],
        capture_output=True
    )

    GITHUB_USERNAME = result.stdout.strip()
    PAGES_DOMAIN = f"{GITHUB_USERNAME.lower()}.github.io"

    print(f"User:   \t{GITHUB_USERNAME}")
    print(f"Domain: \t{PAGES_DOMAIN}\n")

    print(" ───────── Create new project from template ───────── ")

    name = input("Project name: ").strip()
    if not name:
        print("Aborted – no name given.")
        return

    description = input("Short description (for item-card): ").strip() or "No short description yet."
    full_description = input("Full description (for repo-About & README): ").strip() or description

    use_pages_template = ask_yes_no(
        "Should this project use the GitHub Pages template?",
        default_yes=False
    )
    deploy_pages = ask_yes_no(
        "Deploy GitHub Pages for this repository (branch: main, /root)?",
        default_yes=True
    )

    print("└────────────────────────────────────────────────────┘\n")

    today = datetime.date.today().isoformat()
    slug = slugify(name)
    repo_name = slug
    full_repo = f"{GITHUB_USERNAME}/{repo_name}"

    parent_dir = Path.cwd().parent
    repo_path = parent_dir / repo_name

    # URLs
    repo_pages_url = f"https://{PAGES_DOMAIN}/{repo_name}/"
    project_site_url = f"https://{PAGES_DOMAIN}/projects/{slug}/"

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

            # Select template based on user input
            if use_pages_template:
                template_repo = "JannisElef/pages-project-template"
            else:
                template_repo = f"{GITHUB_USERNAME}/project-template"

            run([
                "gh", "repo", "create", repo_name,
                "--public",
                "--template", template_repo,
                "--description", description,
                "--clone"
            ], cwd=parent_dir, check=True)
            print(f"\t→ New repository created & cloned: {repo_path}")

        # update repo description
        run([
            "gh", "repo", "edit", full_repo,
            "--description", description
        ], check=True)
        print(f"\t→ Description of Repo set to: {description}")

        # set repo homepage-URL to the repo's GitHub Pages link
        run([
            "gh", "repo", "edit", full_repo,
            "--homepage", repo_pages_url
        ], check=True)
        print(f"\t→ Website of Repo set to: {repo_pages_url}")

        # Deploy GitHub pages for the repo if requested
        if deploy_pages:
            print("\t→ Configuring GitHub Pages deployment...")
            try:
                run([
                    "gh", "api", "-X", "POST", f"/repos/{full_repo}/pages",
                    "-f", "source[branch]=main",
                    "-f", "source[path]=/"
                ], check=True)
                print("\t✓ GitHub Pages deployed (main branch, /root)")
            except subprocess.CalledProcessError:
                print("\t! Failed to configure GitHub Pages via API. You may need to set it manually.")

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

    # ── README ────────────────────────────────────
    readme = repo_path / "README.md"
    if readme.is_file():
        readme_content = f"# {name}\n\n"

        # Append specific links ONLY if it's a pages project
        if use_pages_template:
            readme_content += f"[website]({repo_pages_url}) · [more information]({project_site_url})\n\n"

        readme_content += f"{full_description}\n"
        readme.write_text(readme_content, encoding="utf-8")
        print("→ README.md updated")

    # ── index.html + _config.yml for Pages template ─────────────────
    if use_pages_template:
        update_pages_index(
            repo_path,
            name=name,
            github_username=GITHUB_USERNAME,
            description=description,
            full_description=full_description,
            full_repo=full_repo,
            today=today,
            repo_pages_url=repo_pages_url
        )
        update_config_for_pages(repo_path, PAGES_DOMAIN, repo_name)

    # ── create _projects/*.md ───────────────────────────────────────
    template = Path("_projects/project-template.md")
    target = Path("_projects") / f"{slug}.md"

    if not template.is_file():
        print("ERROR: project-template.md not found in _projects/")
        return

    content = template.read_text(encoding="utf-8")
    parts = content.split("---", 2)

    # Adding both descriptions to Jekyll frontmatter
    front = f"""---
layout: default
title: {name}
author: {GITHUB_USERNAME}
description: {description}
full_description: {full_description}
repo: {full_repo}
branch: main
tags: [Active]
date: {today}

# redirect_url: {repo_pages_url} # if project has its own website
# thumbnail: /assets/img/thumbnail.gif # if thumbnail is a gif
---
"""

    body = parts[2].strip() if len(parts) >= 3 else ""
    target.write_text(front + "\n" + body + "\n", encoding="utf-8")
    print(f"→ Created {target}")

    print("\n" + "─" * 60 + "\n")

    # commit & push new project (default is N)
    if ask_yes_no(f"Commit & push 'Initial commit' in ../{repo_name}?", default_yes=False):
        git_commit_and_push(repo_path, "Initial commit")

    print()

    # commit & push github-pages repo (default is N)
    if ask_yes_no(f"Commit & push 'Add {slug}' to pages repo?", default_yes=False):
        git_commit_and_push(Path("."), f"Add {slug}")

    print("\nDone.\n")
    print("Project Links:")
    print(f"  → Project Page:    {project_site_url}")
    print(f"  → Online Website:  {repo_pages_url}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nAborted by user.")
    except Exception as e:
        print("Unexpected error:")
        print(e)
