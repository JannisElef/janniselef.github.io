---
layout: default
title: Catan Border-Tiles
description: Border-Tiles for the old version of Catan
repo: JannisElef/catan-border-tiles
branch: main
tags: ["Active"]
date: 2026-03-16
---
        
{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

<!-- START --->

## Image Test from [Repository](https://github.com/{{ page.repo }})

<div class="image-grid">
  {% assign images = 
    "
    /assets/img/thumbnail.png,
    /assets/img/thumbnail.png,
    /assets/img/thumbnail.png,
    /assets/img/thumbnail.png
    "
    | split: "," %}

  {% for img in images %}
    <a href="{{ cdn }}{{ img | strip }}" class="image-item">
      <img src="{{ cdn }}{{ img | strip }}" alt="Preview">
    </a>
  {% endfor %}
</div>


## Main Tile

{% include stl-viewer.html 
file="/assets/stl/Catan Border-Tiles Three_Angled.stl"
id="stl-three_angled"
%}

## My Version




<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
