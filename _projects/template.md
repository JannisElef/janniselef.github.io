---
layout: default
title: Template
description: Template for a Project
image: /assets/img/projects_template.png
tags: [Test, Active]
repo: https://github.com/JannisElef
---

# Template Project

This is a Template for a Project

[GitHub Repo]({{ page.repo }})


## List

- Element 1
- Element 2


## STL Viewer

{% include stl-viewer.html file="/assets/stl/default_cube.stl" id="template" %}


## Code Block


```c
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
  "age": 20,
}
```
