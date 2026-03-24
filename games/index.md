---
layout: default
title: Games
---

# Games

<div class="project-grid">

    {% assign sorted_games = site.games | sort: "date" | reverse %}

    {% for game in sorted_games %}
    
        {% include project-card.html game=game %}

    {% endfor %}

</div>