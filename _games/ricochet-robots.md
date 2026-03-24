---
layout: none
title: Ricochet Robots
description: Ricochet Robots like puzzle - share maps and replays via compact tokens or QR codes.
# repo: JannisElef/ricochet-robots
branch: main
tags: [Game, Active]
date: 2026-03-23
---

<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>{{ page.title }}</title>
<meta name="description" content="{{ page.description }}">
<meta property="og:title" content="{{ page.title }}">
<meta property="og:description" content="{{ page.description }}">
{%- if page.thumbnail %}
<meta property="og:image" content="{{ site.url }}{{ page.thumbnail }}">
{%- endif %}
<script>
  // Canonical URL for share links — uses Jekyll's site.url + page path.
  // Falls back to current location if RICOCHET_BASE_URL is not set.
  window.RICOCHET_BASE_URL = "{{ site.url }}{{ page.url | remove: 'index.html' | remove: '.html' | append: '/' }}";</script>
<!-- Game dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body style="margin:0;padding:0;background:#0d0d18;">

{%- comment -%}
  Include the game body. The file _includes/ricochet-robots.html
  contains everything from <style> through the closing </script> tag —
  i.e. the full ricochet_robots.html minus:
    - <!DOCTYPE html>, <html>, <head>, <body> wrappers
    - the two CDN <script> tags (loaded above)
    - the BASE_URL constant line (window.RICOCHET_BASE_URL is set above instead)
{%- endcomment -%}
{% include ricochet-robots.html %}

</body>
</html>
