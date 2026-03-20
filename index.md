---
layout: default
title: Home
---

# Hello

Hello 2


# Projects

<div class="project-grid">

    {% assign sorted_projects = site.projects | sort: "date" | reverse %}

    {% for project in sorted_projects %}

        {% include project-card.html project=project %}

    {% endfor %}

</div>

[-> View all projects](/projects)