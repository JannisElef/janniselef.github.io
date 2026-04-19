---
layout: default
title: Gallery
author: JannisElef
description: Visual archive across all my published projects.
date: 2026-04-19
---

<link rel="stylesheet" href="/assets/css/gallery.css">

<div class="gallery-header">
  <h1>Gallery</h1>
  <p>Visual archive across all projects</p>
</div>

{% include gallery-filter.html
   grid_id="gallery-grid"
   placeholder="Search images…"
%}

<div class="gallery-grid" id="gallery-grid">

  {% assign all_items = "" | split: "" %}
  {% assign sorted_projects = site.projects | sort: "date" | reverse %}
  {% for item in sorted_projects %}{% assign all_items = all_items | push: item %}{% endfor %}
  {% if site.games %}
    {% assign sorted_games = site.games | sort: "date" | reverse %}
    {% for item in sorted_games %}{% assign all_items = all_items | push: item %}{% endfor %}
  {% endif %}

  {% for item in all_items %}{% if item.repo %}
    {% assign branch = item.branch | default: "main" %}
    {% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: item.repo | append: "@" | append: branch %}

    {% if item.gallery %}
      {% comment %} ── Gallery images (data-source="gallery") ── {% endcomment %}
      {% for img_path in item.gallery %}
        {% assign fn_ext   = img_path | split: '/' | last %}
        {% assign fn_base  = fn_ext   | split: '.' | first %}
        {% assign web_path = img_path | replace: fn_ext, "web/" | append: fn_base | append: "-web.jpg" %}
        {% assign img_src  = cdn | append: web_path %}
        <div class="gallery-item"
             data-source="gallery"
             data-title="{{ item.title | escape }}"
             data-description="{{ item.description | escape }}"
             data-date="{{ item.date | date: '%Y%m%d' }}"
             data-year="{{ item.date | date: '%Y' }}"
             data-tags="{{ item.tags | join: ',' | escape }}">
          <a href="{{ item.url }}" title="Open {{ item.title }}">
            <img data-src="{{ img_src }}" src="" alt="{{ item.title }}" onerror="this.onerror=null;this.src='/assets/img/patterns/Taieri.svg';">
            <div class="gallery-overlay"><div class="gallery-overlay-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="tags">{% for tag in item.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</div>
            </div></div>
          </a>
        </div>
      {% endfor %}

      {% comment %} Also always include the thumbnail alongside gallery images ── {% endcomment %}
      {% if item.thumbnail %}
        {% if item.thumbnail contains "://" %}
          {% assign thumb_src = item.thumbnail %}
        {% else %}
          {% assign fn_ext   = item.thumbnail | split: '/' | last %}
          {% assign fn_base  = fn_ext | split: '.' | first %}
          {% assign web_path = item.thumbnail | replace: fn_ext, "web/" | append: fn_base | append: "-web.jpg" %}
          {% assign thumb_src = cdn | append: web_path %}
        {% endif %}
      {% else %}
        {% assign thumb_src = cdn | append: "/assets/img/web/thumbnail-web.jpg" %}
      {% endif %}
      <div class="gallery-item"
           data-source="thumbnail"
           data-title="{{ item.title | escape }}"
           data-description="{{ item.description | escape }}"
           data-date="{{ item.date | date: '%Y%m%d' }}"
           data-year="{{ item.date | date: '%Y' }}"
           data-tags="{{ item.tags | join: ',' | escape }}">
        <a href="{{ item.url }}" title="Open {{ item.title }}">
          <img data-src="{{ thumb_src }}" src="" alt="{{ item.title }}" onerror="this.onerror=null;this.src='/assets/img/patterns/Inn.svg';">
          <div class="gallery-overlay"><div class="gallery-overlay-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="tags">{% for tag in item.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</div>
          </div></div>
        </a>
      </div>

    {% else %}
      {% comment %} ── Thumbnail only (data-source="thumbnail") ── {% endcomment %}
      {% if item.thumbnail %}
        {% if item.thumbnail contains "://" %}
          {% assign img_src = item.thumbnail %}
        {% else %}
          {% assign fn_ext   = item.thumbnail | split: '/' | last %}
          {% assign fn_base  = fn_ext | split: '.' | first %}
          {% assign web_path = item.thumbnail | replace: fn_ext, "web/" | append: fn_base | append: "-web.jpg" %}
          {% assign img_src  = cdn | append: web_path %}
        {% endif %}
      {% else %}
        {% assign img_src = cdn | append: "/assets/img/web/thumbnail-web.jpg" %}
      {% endif %}
      <div class="gallery-item"
           data-source="thumbnail"
           data-title="{{ item.title | escape }}"
           data-description="{{ item.description | escape }}"
           data-date="{{ item.date | date: '%Y%m%d' }}"
           data-year="{{ item.date | date: '%Y' }}"
           data-tags="{{ item.tags | join: ',' | escape }}">
        <a href="{{ item.url }}" title="Open {{ item.title }}">
          <img data-src="{{ img_src }}" src="" alt="{{ item.title }}" onerror="this.onerror=null;this.src='/assets/img/patterns/Taieri.svg';">
          <div class="gallery-overlay"><div class="gallery-overlay-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="tags">{% for tag in item.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</div>
          </div></div>
        </a>
      </div>
    {% endif %}

  {% endif %}{% endfor %}

</div>

<div id="gallery-load-more-container" style="text-align:center; margin:40px 0; display:none;">
  <span id="gallery-load-more-btn" style="cursor:pointer; text-decoration:underline; opacity:0.7; font-weight:bold; font-size:0.9rem;">
    Load More
  </span>
</div>

<script src="/assets/js/gallery.js"></script>
