---
layout: default
title: Projects
---


# Projects


{% include item-filter.html
   grid_id="projects-grid"
   placeholder="Search projects…"
%}


<div class="item-grid" id="projects-grid">

    {% assign sorted_projects = site.projects | sort: "date" | reverse %}

    {% for project in sorted_projects %}

        {% include item-card.html project=project %}
        
    {% endfor %}

</div>