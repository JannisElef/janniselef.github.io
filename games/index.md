---
layout: default
title: Games
---


# Games


{% include item-filter.html
   grid_id="games-grid"
   placeholder="Search games..."
%}


<div class="item-grid" id="games-grid">

    {% assign sorted_games = site.games | sort: "date" | reverse %}

    {% for game in sorted_games %}
    
        {% include item-card.html game=game %}

    {% endfor %}

</div>