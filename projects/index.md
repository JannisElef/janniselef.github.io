---
layout: default
title: Projects
---

# Projects

<div class="project-grid">

    {% assign sorted_projects = site.projects | sort: "date" | reverse %}

    {% for project in sorted_projects %}

        {% include project-card.html project=project %}
        
    {% endfor %}

</div>