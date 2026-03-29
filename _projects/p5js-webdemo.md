---
layout: default
title: p5.js Webdemo
description: Interactive p5.js sketches running in the browser.
repo: JannisElef/p5js-webdemo
branch: main
tags: [Test, Software, p5.js, Finished]
date: 2026-03-22
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %} 

---

<!-- START --->

## Flow Field

{% include p5js-editor.html file="/src/flowfield.js" id="flow" height="360" %}

## Bouncing Balls

{% include p5js-editor.html file="/src/balls.js" id="balls" height="360" %}

## Blank Editor

{% include p5js-editor.html id="blank" height="360" %}

<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [→ View on GitHub](https://github.com/{{ page.repo }})
