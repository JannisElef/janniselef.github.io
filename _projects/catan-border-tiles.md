---
layout: default
title: Catan Border-Tiles
description: Border-Tiles for the old version of Catan
repo: JannisElef/catan-border-tiles
branch: main
tags: [3D-Print, Finished]
date: 2026-03-16
---


{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

{% include table-of-contents.html %}

---


<!-- START --->

## Example Images

{% include image-grid.html 
images="
  /assets/img/thumbnail.jpg,
  /assets/img/Catan Border-Tiles_Base.jpg,
  /assets/img/Catan Border-Tiles_Seafarers.jpg,
  /assets/img/Catan Border-Tiles_closeup1.jpg,
  /assets/img/Catan Border-Tiles_closeup2.jpg
"
%}


## Main Tile

The tile for making the classic Catan border is three segments wide, six of them are used to assemble a complete frame.

{% include stl-viewer.html 
file="/assets/stl/Catan Border-Tiles Three_Angled.stl"
id="stl-three_angled"
filesize="15.5 KB"
%}

## My Version

Using the Bambu Lab A1 Mini with a build volume of 180x180x180 mm³, results in the main tile being too large to print in one piece, so i've split it into two tiles.
The two tiles are interchangeable with the other tiles.

{% include stl-viewer.html 
file="/assets/stl/Catan Border-Tiles Two_Angled.stl"
id="stl-two_angled"
filesize="14.7 KB"
%}

{% include stl-viewer.html 
file="/assets/stl/Catan Border-Tiles One_Flat.stl"
id="stl-one_flat"
filesize="14.5 KB"
%}

[-> View all Tiles](https://github.com/{{ page.repo }}/tree/main/assets/stl)

<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
