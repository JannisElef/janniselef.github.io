---
layout: default
title: Home
repo: JannisElef/janniselef.github.io
branch: main
---


{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 



<h1>
    <a href="projects/" style="color: var(--text-color); text-decoration: none;" title="View all projects">
        Projects
    </a>
</h1>

<div class="item-grid">

    {% assign sorted_projects = site.projects | sort: "date" | reverse %}

    {% assign recent_projects = sorted_projects | slice: 0, 4 %}

    {% for project in recent_projects %}

        {% include item-card.html project=project %}

    {% endfor %}

</div>

[-> View all projects](/projects)


<h1>
    <a href="games/" style="color: var(--text-color); text-decoration: none;" title="View all games">
        Games
    </a>
</h1>

<div class="item-grid">

    {% assign sorted_games = site.games | sort: "date" | reverse %}

    {% assign recent_games = sorted_games | slice: 0, 4 %}

    {% for game in recent_games %}
    
        {% include item-card.html game=game %}

    {% endfor %}

</div>

[-> View all games](/games)


# More about this website 

I wanted to explore frontend development more deeply and see how far I could take a free GitHub-Pages website.
So far, this has led me to create and use a variety of tools for generating and managing the site, coordinating new projects, and linking them here, making the entire process more efficient and convenient (while also learning a lot along the way).
This includes using Jekyll to build the website, writing [custom Python scripts](https://github.com/JannisElef/janniselef.github.io/blob/main/create-project.py) to create project repositories, manage all required components etc. to have them appear on the website.
In some cases, projects are even published on their own subpages rather than [/projects](/projects).

Speaking of repositories: All resources here are hosted on GitHub in their own [repositories](https://github.com/JannisElef/janniselef.github.io).
This page simply gathers the online files provided in those repos while also referring back to it - be it a project's [README.md](https://github.com/JannisElef/janniselef.github.io/blob/main/README.md), images, code files, STLs, or anything else needed to properly describe and document a project.

The purpose of this website is to:
- (a) package projects up for presenting it and it's components, making later changes or sharing more easy
- (b) provide 'public' access to my just-for-fun [games](/games) or purpose-driven tools hosted here on their own subpages. Of course also featuring their dedicated project info pages

Work on this website began on March 9, 2026. Several hours, long weekends and [168 commits](https://github.com/JannisElef/janniselef.github.io/commits/main/) later, this paragraph is live on March 31, 11:16pm - being displayed on a functioning website, ready to show off more projects in the future! :-)

<br>

~ Jannis