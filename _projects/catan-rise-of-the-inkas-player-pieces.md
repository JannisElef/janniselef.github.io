---
layout: default
title: CATAN Rise of the Inkas Player Pieces
author: JannisElef
description: Player Pieces to print for CATAN Rise of the Inkas.
full_description: Player Pieces to print for CATAN Rise of the Inkas. Print a set in your own color or print additional pieces to fit the Rise of the Inka theme and play it like classic CATAN.
repo: JannisElef/catan-rise-of-the-inkas-player-pieces
branch: main
tags: [3D-Print, Finished]
date: 2026-05-29

gallery:
  - /assets/img/CATAN_Inka-2.jpg
  - /assets/img/CATAN_Inka-1.jpg
  - /assets/img/CATAN_Inka-top-1.jpg
  - /assets/img/CATAN_Inka-top-2.jpg
  - /assets/img/CATAN_Inka-Blender.png

# redirect_url: https://janniselef.github.io/catan-rise-of-the-inkas-player-pieces/ # if project has its own website
# thumbnail: /assets/img/thumbnail.gif # if thumbnail is a gif
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %}

---

{% include table-of-contents.html %}

---

<!-- START -->

# Model Preview

{% include stl-viewer-multi.html 
  id="Pieces preview"
  label="CATAN Inka Pieces"
  files="
    /assets/stl/CATAN_Inka-City.stl:#ffd900,
    /assets/stl/CATAN_Inka-Settlement.stl:#4bb1ff,
    /assets/stl/CATAN_Inka-Road.stl:#afafaf,
  "
  filesize="716 KB"
%}


# Making of the models

I've taken pictures of the pieces from all sides and traced their contours in Blender like a topographic map to get the proportions right. 
The rest was measuring and afterwards fiddling around with details based on 3D printed test pieces.

{% include image-grid.html 
images="
  /assets/img/CATAN_Inka-Blender.png
"
%}

# Pictures

Here are some pictures to compare the 3D printed pieces (yellow) to the original (cyan).

{% include image-grid.html 
images="
  /assets/img/CATAN_Inka-2.jpg,
  /assets/img/CATAN_Inka-1.jpg,
  /assets/img/CATAN_Inka-top-1.jpg,
  /assets/img/CATAN_Inka-top-2.jpg
"
%}


<!-- END -->

---

{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})

