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

{% include table-of-contents.html %}

---


<!-- START --->

## Image Test from [Repository](https://github.com/{{ page.repo }})

{% include image-grid.html 
images="
  /assets/img/thumbnail.png,
  /assets/img/thumbnail.png,
  /assets/img/thumbnail.png,
  /assets/img/thumbnail.png
"
%}

## List

- Element 1
- Element 2
- Element 3


## STL Viewer

{% include stl-viewer.html 
file="/assets/stl/default_cube.stl"
id="stl-default_cube"
filesize="684 Bytes"
%}

## Code Block from [Repository](https://github.com/{{ page.repo }})

{% include code-viewer.html 
file="/src/main.c" 
filesize="110 Bytes"
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