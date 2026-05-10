---
layout: default
title: Mathle
author: JannisElef
description: Wordle with maths.
full_description: Wordle with maths - try to solve the equation puzzle.
repo: JannisElef/mathle
branch: main
tags: [Game, Finished]
date: 2026-05-10

redirect_url: https://janniselef.github.io/mathle/ # if project has its own website
# thumbnail: /assets/img/thumbnail.gif # if thumbnail is a gif
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %}

---

{% include table-of-contents.html %}

---

<!-- START -->



<!-- END -->

---

{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})

