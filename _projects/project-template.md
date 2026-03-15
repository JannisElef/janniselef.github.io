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

## Image Test from [external Repository](https://github.com/{{ page.repo }})

<a href="{{ cdn }}/assets/img/preview.png" class="img-preview">
  <img src="{{ cdn }}/assets/img/preview.png" alt="Test Image">
</a>

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