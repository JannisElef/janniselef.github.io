---
layout: default
title: Card Cropper
description: Online-Tool for editing scanned boardgame cards.
repo: JannisElef/card-cropper
branch: main
tags: ["Active"]
date: 2026-03-29
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

<!-- START --->





<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
