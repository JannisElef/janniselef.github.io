---
layout: default
title: Blender Render Bot
author: JannisElef
description: Remote Blender rendering manager using git.
full_description: Remote Blender rendering manager using git. Configure a render job, set defaults and parameters, push it with your .blend source-file and let a remote PC render and push the output back to your git.
repo: JannisElef/blender-render-bot
branch: main
tags: [Blender, Finished]
date: 2026-04-06

redirect_url: https://janniselef.github.io/blender-render-bot/ # if project has it's own website
# thumbnail: /assets/img/thumbnail.gif # if thumbnail is a gif
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

 --- ! rendered best on [GitHub](https://github.com/{{ page.repo }}) ! ---

{% include readme-loader.html %} 

---


<!-- START --->





<!-- END --->

---
{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})
