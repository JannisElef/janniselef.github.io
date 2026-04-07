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
        <div class="item-wrapper" 
             data-date="{{ project.date | date: '%Y%m%d' }}" 
             data-year="{{ project.date | date: '%Y' }}">
            {% include item-card.html project=project %}
        </div>
    {% endfor %}
</div>

<div id="load-more-container" style="text-align: center; margin-top: 40px; display: none;">
    <span id="load-more-btn" style="cursor: pointer; text-decoration: underline; opacity: 0.7; font-weight: bold; font-size: 0.9rem;">
        Load More
    </span>
</div>