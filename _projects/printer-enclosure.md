---
layout: default
title: Printer Enclosure Control
author: JannisElef
description: Files and Documentation
repo: JannisElef/printer-enclosure
branch: main
tags: [3D-Print, Electronics, Software, Semi-Active]
date: 2026-03-15
---


{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

{% include table-of-contents.html %}

---


<!-- START --->

## Circuit Diagram

{% include image-viewer.html 
   image="/assets/img/schematic.png" 
   id="schematic" 
   filesize="89.8 KB"
%}


<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})