---
layout: default
title: Ricochet Robots
description: A solo puzzle similar to Ricochet Robots - slide your robot into the goal!
full_description: A solo puzzle similar to Ricochet Robots - slide your robot into the goal! Share maps and replays via tokens, links or QR codes - challenge your friends!
repo: JannisElef/ricochet-robots
branch: main
tags: [Game, Finished]
date: 2026-03-30
redirect_url: https://janniselef.github.io/ricochet-robots/
---


{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

{% include table-of-contents.html %}

---


<!-- START --->

# How to play

The rules are simple: You start on a random map and want to move a color of robot to it's goal in the least number of moves - every robot's move counts.

You slide in a direction until you hit a wall and stop, bounce off a diagonal wall to redirect your slide or enter a portal to exit on the other side.

{% include image-grid.html 
images="
  /assets/img/ricochet-robots_example-map-preview.jpg,
  /assets/img/ricochet-robots_example-map-timeline.jpg
"
%}

# Share your game

Can't beat a map? Share the map-ID and see how your friends do it.

Once the goal is reached, the player can share a replay of their game, there you can see and analyze each one of their moves. 


You can do this by [link](https://janniselef.github.io/ricochet-robots/?r=b6b9c14dCMX0310013f0a50P090505090a02020a09010308_064a616e6e6973c370ca001e89_e4654ba98f) or QR-Code, try it yourself! 

{% include image-grid.html 
images="
  /assets/img/ricochet-robots_example-replay.png
"
%}


<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
