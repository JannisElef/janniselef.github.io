---
layout: default
title: Minesweeper
description: Classic Minesweeper with a new theme - reveal the map but not the mines!
full_description: Classic Minesweeper with a new theme - reveal the map but not the mines!
repo: JannisElef/minesweeper
branch: main
tags: [Game, Active]
date: 2026-04-08

redirect_url: https://janniselef.github.io/minesweeper/ # if project has it's own website
# thumbnail: /assets/img/thumbnail.gif # if thumbnail is a gif
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

{% include table-of-contents.html %}

---


<!-- START --->





<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
