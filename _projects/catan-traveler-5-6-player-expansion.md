---
layout: default
title: CATAN-Traveler 5-6 Player Expansion
author: JannisElef
description: Custom 5-6 Player Expansion for CATAN-Traveler
full_description: Custom 5-6 Player Expansion for CATAN-Traveler - new figures and an add-on frame.
repo: JannisElef/catan-traveler-5-6-player-expansion
branch: main
tags: [3D-Print, Active]
date: 2026-04-22

# redirect_url: https://janniselef.github.io/catan-traveler-5-6-player-expansion/ # if project has its own website
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
  id="mockup"
  label="CATAN-Traveler: 3D-Example"
  files="
    /assets/stl/mockup/CATAN_Traveler_mockup-frame.stl:#4fedff,
    /assets/stl/mockup/CATAN_Traveler_mockup-hex.stl:#30d0f0,
    /assets/stl/mockup/CATAN_Traveler_mockup-p1.stl:#ff0000,
    /assets/stl/mockup/CATAN_Traveler_mockup-p2.stl:#ffff00,
    /assets/stl/mockup/CATAN_Traveler_mockup-p3.stl:#0000ff,
    /assets/stl/mockup/CATAN_Traveler_mockup-inlay-1.stl:#79ff57,
    /assets/stl/mockup/CATAN_Traveler_mockup-inlay-2.stl:#00ab0e,
    /assets/stl/mockup/CATAN_Traveler_mockup-inlay-3.stl:#ffe23b,
    /assets/stl/mockup/CATAN_Traveler_mockup-inlay-4.stl:#de7a00,
    /assets/stl/mockup/CATAN_Traveler_mockup-inlay-5.stl:#a3a3a3,
    /assets/stl/mockup/CATAN_Traveler_mockup-numbertoken.stl:#ffffff,
  "
  filesize="2.54 MB"
%}


<!-- END -->

---

{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})

