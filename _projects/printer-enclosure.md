---
layout: default
title: Printer Enclosure Control
description: Files and Documentation
repo: JannisElef/printer-enclosure
branch: main
tags: [3D-Print, Electronics, Software, Semi-Active]
date: 2026-03-15
---


{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

<!-- START --->

## Circuit Diagram

<a href="{{ cdn }}/assets/img/schematic.png" class="img-preview">
  <img src="{{ cdn }}/assets/img/schematic.png" alt="Circuit Diagram">
</a>

## STL Viewer

{% assign stl = cdn | append: "/assets/stl/default_cube.stl" %}

{% include stl-viewer.html
file=stl
id="template"
%}


## Code Block

```c
// C code
#include <stdio.h>

int main() {
    printf("Hello, User!\n");
    return 0;
}
```

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