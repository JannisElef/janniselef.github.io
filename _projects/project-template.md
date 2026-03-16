---
layout: default
title: Template Project
description: Template for a Project
repo: JannisElef/project-template
branch: main
tags: [Test, Active]
date: 2026-03-15
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


## STL Viewer

{% assign stl = cdn | append: "/assets/stl/default_cube.stl" %}

{% include stl-viewer.html
file=stl
id="template"
%}


## Code Block from [Repository](https://github.com/{{ page.repo }})

{% include code-viewer.html file="/src/main.c" %}


## Code Block from Markdown


```json
{
  "firstName": "Jannis",
  "lastName": "Elef",
  "age": 20
}
```



<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})