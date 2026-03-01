---
title: Lego Picture
date: 2025-02-23
tags: software, 3D printing, woodworking, photography, featured
image: /assets/img/2025-02-23-lego-picture/IMG_1519.jpg
---

![Lego Picture](/assets/img/2025-02-23-lego-picture/IMG_1519.jpg)

# Overview

This project brings together 4 of my hobbies: software development, 3D printing, woodworking and travel.

Many people make pixel art images from lego blocks. Most of these are designed so that the image is viewed when looking top-down on the bricks. This makes the design much easier since the tops of lego bricks are made of square pegs and thus can easily be mapped to the pixels in an image. In this project, I wanted to construct an image from lego bricks that would reveal itself when viewed from the side, where the bricks were layered in a standard brick wall pattern and to do so without distorting the image.

The final image is a picture I took in Kyoto, Japan. 🇯🇵

# Software

I developed a java program that will take an image file as input and convert it to the lego brick representation. The output includes a part list (the number, size, and color of lego bricks) as well as a preview image that shows what the final build will look like. In addition to the input image, the program takes various parameters like a color pallette (the list of brick colors you have available) and output image size (essentially the "resolution")

View the program on my [GitHub](https://github.com/chadheise/lego-pictures)

## Challenges

- How to reduce the image resolution without distoration. Since lego "pegs" are taller than they are wide, the original image needs to be mapped to non-square pixels so that the image doesn't get stretched.
- Color mapping: Most legos come in a limited set of standard colors which don't accurately represent the full color spectrum of most photos. To accommodate this, the software allows for custom color palettes as well as parameters to tweak how the original image colors get mapped to the limited colors in the pallete. By 3D printing the lego bricks, I also got access to much wider and more natural color set than is typically available in standard lego bricks.
- Determining how to overlay the bricks so that they would neatly overlay in a "brick" pattern without the brick seems lining up across bricks of the same color.

# 3D Printed Lego Bricks

I 3D printed Lego-style bricks based on the [openSCAD designs by Chris Finke](https://www.chrisfinke.com/2015/01/27/3d-printed-lego-compatible-bricks/)

# Frame

I built the frame using padauk and cherry wood. The frame is a few inches wide padauk with an inset cherry back. On top of the back, There are riser blocks so that the final image appears to float in front of the background panel. The final lego image is attached to these riser blocks using 3M command strips.

# Photos

<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/86E95C07-1D07-4A76-A478-1227D946678A.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0373.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0380_jpg.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0381_jpg.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0382_jpg.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0385_jpg.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0386_jpg.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0392_jpg.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0393_jpg.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0394_jpg.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0395_jpg.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0396_jpg.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0397_jpg.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0398_jpg.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_0404_jpg.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_1507_jpg.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_1512.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/IMG_1513.jpg" alt="Lego Picture" />
</div>
<div class="image-grid">
  <img src="/assets/img/2025-02-23-lego-picture/IMG_1519.jpg" alt="Lego Picture" />
  <img src="/assets/img/2025-02-23-lego-picture/shrine.jpg" alt="Lego Picture" />
</div>
