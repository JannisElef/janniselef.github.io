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
        <div class="item-wrapper" 
             data-date="{{ game.date | date: '%Y%m%d' }}" 
             data-year="{{ game.date | date: '%Y' }}">
            {% include item-card.html game=game %}
        </div>
    {% endfor %}
</div>

<div id="load-more-container" style="text-align: center; margin-top: 40px; display: none;">
    <span id="load-more-btn" style="cursor: pointer; text-decoration: underline; opacity: 0.7; font-weight: bold; font-size: 0.9rem;">
        Load More
    </span>
</div>