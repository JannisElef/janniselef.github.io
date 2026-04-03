---
layout: default
title: cyber snake
description: Classic snake with a new coating.
full_description: Classic snake with a new coating: bonus food, ramping up speeds and a new cyber themed enviornment.
repo: JannisElef/cyber-snake
branch: main
tags: [Active]
date: 2026-04-04

redirect_url: https://janniselef.github.io/cyber-snake/ # if project has it's own website
# image: /assets/img/thumbnail.jpg # if thumbnail is a jpg
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

{% include table-of-contents.html %}

---


<!-- START --->





<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
