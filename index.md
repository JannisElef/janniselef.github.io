---
layout: default
title: Home
---

# Hello

Hello 2


<h1>
    <a href="projects/" style="color: var(--text-color); text-decoration: none;">
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
    <a href="games/" style="color: var(--text-color); text-decoration: none;">
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