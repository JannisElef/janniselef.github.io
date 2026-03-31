---
layout: default
title: Card Cropper
description: Online-Tool for editing scanned boardgame cards.
repo: JannisElef/card-cropper
branch: main
tags: [Website, Active]
date: 2026-03-29
redirect_url: https://janniselef.github.io/card-cropper/
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

<!-- START --->


{% include image-viewer.html 
   file="/assets/img/card_result.png" 
   id="render-01" 
   filesize="8.98 MB"
%}



<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
