---
layout: default
title: Hitster Custom
author: JannisElef
description: Create your own Hitster Card Deck.
full_description: Create a custom Hitster Card Deck to play with your favorite playlist.
repo: JannisElef/hitster-custom
branch: main
tags: [Active]
date: 2026-04-24

redirect_url: https://janniselef.github.io/hitster-custom/ # if project has its own website
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

