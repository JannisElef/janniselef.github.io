---
layout: default
title: Custom Cards Against Humanity
author: JannisElef
description: Tool for generating custom CAH-style cards for printing.
full_description: Tool for generating custom CAH-style cards for printing.
repo: JannisElef/custom-cards-against-humanity
branch: main
tags: [Website, Finished]
date: 2026-11-15
redirect_url: https://janniselef.github.io/custom-cards-against-humanity/ # if project has its own website

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

