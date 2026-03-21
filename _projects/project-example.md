---
layout: default
title: Example Project
description: Example Project for GitHub Pages.
repo: JannisElef/project-example
branch: main
tags: [Test, Semi-Active]
date: 2026-03-14
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

## List

- Element 1
- Element 2
- Element 3


## STL Viewer

{% include stl-viewer.html 
file="/assets/stl/default_cube.stl"
id="stl-default_cube"
%}


## Code Block from [Repository](https://github.com/{{ page.repo }})

{% include code-viewer.html 
file="/src/main.c" 
%}


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