---
layout: default
title: CATAN-Traveler 5-6 Player Expansion
author: JannisElef
description: Custom 5-6 Player Expansion for CATAN-Traveler.
full_description: Custom 5-6 Player Expansion for CATAN-Traveler - additional figures and frame to extend the main island.
repo: JannisElef/catan-traveler-5-6-player-expansion
branch: main
tags: [3D-Print, Active]
date: 2026-04-22
gallery:
  - /assets/img/CATAN-Traveler_packaging.jpg
  - /assets/img/CATAN-Traveler_versions.jpg,
  - /assets/img/CATAN-Traveler_test-1.jpg,
  - /assets/img/CATAN-Traveler_test-frame.jpg
---

{% assign cdn = "https://cdn.jsdelivr.net/gh/" | append: page.repo | append: "@" | append: page.branch %}

{% include readme-loader.html %}

---

{% include table-of-contents.html %}

---

<!-- START -->

# Model Preview

The frame sits on top of the normal resource plates provided by the base game.
Here's a small cutout of the final playing area:

{% include stl-viewer-multi.html 
  id="mockup"
  label="CATAN-Traveler 3D-Example"
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


# Expansion Components

The frame forms a ring around the main island expanding it by 18 hex tiles.
Traditionally the 5-6 Player Expansion only adds [11 hex tiles](#the-map-classic-5-6-player). 
For additional detail about the resource types and number tokens result to the [List of Components](#list-of-components) below.


## List of Components

<iframe style="width: 100%; height: 400px;"
src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTbzZHtwSfRhKjTt6309HIwnlXNs_4tvlnr3aTTg4CgCJNPYMFgYa06k-wyRkvjIcADuIGYXCqcRtuP/pubhtml?widget=true&amp;headers=false"></iframe>


## Resource Tiles and Number Tokens

In the CATAN-Traveler version the resource tiles are printed on the 6 plates that fit in the playing area.
This reduces the number of possible games to be played by a lot.
Same with the number tokens being fixed in place.

To restore some randomness I've made the resources and number tokens interchangeable between the frames.
They're now colored resource inlays you can snap in the frames and fit the number tokens into.
See the [preview](#model-preview) on how they look like or how the resource inlays are [colored](#list-of-components) between their two types: Corner and edge inlays.

The inlays are made to snap so they hold themselves on the board to not get shook apart incase something bumps the game.
This follows the Traveler-Edition's goal of being sturdy for outdoors or a car trip where things can get shaky.
That's also the reason why the figures are press-fit into their place when placed to hold themselves and the resource plates beneath in position.



## The Map: Classic 5-6 Player

If you want to play the classic 5-6 Player expansion with only 11 additional tiles, use the following arrangement:

- three 3-piece frame tiles
- two 1-piece frame tiles

{% include stl-viewer-multi.html 
  id="mockup-classic"
  label="Classic 5-6 Player frame arrangement"
  files="
    /assets/stl/mockup/classic/CATAN_Traveler_mockup-classic-1.stl:#4fedff,
    /assets/stl/mockup/classic/CATAN_Traveler_mockup-classic-2.stl:#006eff,
    /assets/stl/mockup/classic/CATAN_Traveler_mockup-classic-3.stl:#4fedff,
  "
  filesize="1.88 MB"
%}


Because of the game's playing area border the hex tiles are cut flat on one side, resulting in one road and settlement/city position being lost for every tile.
This is fixed by the 7 additional tiles to complete the ring, the more space the better I've figured.


# Storage Box Tetris 

The two new sets of figures, the frame pieces, resource inlays and the number tokens fit neatly into the component sliders of two players.
The other two sliders are packed with the card trays like before.
Some frame pieces can be stored in the playing area like the other resource plates.

This means the 5-6 Player Expansion utilizes the last bit of unused space of the box. No additional storage solutions are required, it's ready to be taken and played everywhere!

{% include image-grid.html 
images="
  /assets/img/CATAN-Traveler_packaging.jpg
"
%}


# Version History

Here are the older versions, test prints and test fits that were created along the way. Especially the figures' print orientation and the strength of their press-fit was a tedious process...

{% include image-grid.html 
images="
  /assets/img/CATAN-Traveler_versions.jpg,
  /assets/img/CATAN-Traveler_test-1.jpg,
  /assets/img/CATAN-Traveler_test-frame.jpg
"
%}



<!-- END -->

---

{% if page.date %}
**Published:** {{ page.date | date: "%B %-d, %Y" }}
{% endif %} [-> View on GitHub](https://github.com/{{ page.repo }})

