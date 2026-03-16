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

  <a href="{{ cdn }}/assets/img/thumbnail.png" class="image-item">
    <img src="{{ cdn }}/assets/img/thumbnail.png" alt="Preview">
  </a>

  <a href="{{ cdn }}/assets/img/thumbnail.png" class="image-item">
    <img src="{{ cdn }}/assets/img/thumbnail.png" alt="Preview">
  </a>

  <a href="{{ cdn }}/assets/img/thumbnail.png" class="image-item">
    <img src="{{ cdn }}/assets/img/thumbnail.png" alt="Preview">
  </a>

  <a href="{{ cdn }}/assets/img/thumbnail.png" class="image-item">
    <img src="{{ cdn }}/assets/img/thumbnail.png" alt="Preview">
  </a>

</div>

## List

- Element 1
- Element 2
- Element 3




<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
