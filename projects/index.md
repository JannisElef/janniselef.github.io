---
layout: default
title: Projects
---

# Projects

<div class="project-grid">

{% for project in site.projects %}

    {% include project-card.html project=project %}

{% endfor %}

</div>