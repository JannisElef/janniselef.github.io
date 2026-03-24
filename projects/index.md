---
layout: default
title: Projects
---

# Projects

<div class="project-grid">

    {% assign sorted_projects = site.projects | sort: "date" | reverse %}

    {% for project in sorted_projects %}

        {% include item-card.html project=project %}
        
    {% endfor %}

</div>