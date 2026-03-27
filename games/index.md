---
layout: default
title: Games
---


# Games

<div class="item-grid">

    {% assign sorted_games = site.games | sort: "date" | reverse %}

    {% for game in sorted_games %}
    
        {% include item-card.html game=game %}

    {% endfor %}

</div>