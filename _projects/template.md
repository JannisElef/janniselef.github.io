---
layout: default
title: Template Project
description: Template for a Project
repo: JannisElef/project-template
branch: main
tags: [Test, Active]
---


{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}


# {{ page.title }}

[-> View on GitHub](https://github.com/{{ page.repo }})

---


<div id="readme-container">Loading README...</div>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<script>

const repo = "{{ page.repo }}";
const branch = "{{ branch }}";

const readmeURL = "{{ cdn }}/README.md";

fetch(readmeURL)
  .then(response => response.text())
  .then(md => {
      document.getElementById("readme-container").innerHTML =
          marked.parse(md);
  })
  .catch(() => {
      document.getElementById("readme-container").innerHTML =
          "README could not be loaded.";
  });

</script>


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