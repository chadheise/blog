---
layout: post
title:  "Raspberry Pi Plex Media Server"
date:   2016-12-31
---
There are many useful posts about how to set up a [Plex](https://www.plex.tv/) Media Server on a [Raspberry Pi](https://www.raspberrypi.org/) but I wanted to share what I found most useful and any "gotchas" I found along the way.

# Hardware

* [Raspberry Pi](http://a.co/29Yo7pn) - There are many different Raspberry Pi kits available and most will work fine.
* [Keyboard/Mouse](http://a.co/f35fy4N) - It will also work with most USB keyboards and mice but I chose the one I did as it is designed to be used for media servers since it includes the keyboard and trackpad in one device.
* [USB Drive](http://a.co/fA8DEHD) - You will need to get one big enough to store all of your content. At the quality I ripped, most DVDs ended up being about 2 GB and BluRays about 10 GB so the 2TB drive had enough space to get me started.
* [DVD/BluRay Drive](http://a.co/hjcWINn) - If you will not be ripping BluRays, I'm sure there are cheaper, DVD only drives available. There are also cheaper BluRay drives but this one seemed to be a good balance of quality and price.

# Setup

The first issue I faced was how to connect my Raspberry Pi to my hidden wifi network. To solve it, I found [this site](http://www.thehecklers.org/2015/02/27/how-to-connect-raspberry-pi-to-hidden-ssid/) useful.

Setting up Plex on the Raspberry Pi was pretty straightforward following [these steps](https://www.element14.com/community/community/raspberry-pi/raspberrypi_projects/blog/2016/03/11/a-more-powerful-plex-media-server-using-raspberry-pi-3).

Since I was copying my movies and other media files from my Mac to an external drive used by the Raspberry Pi, I had to format the external drive such that it could be read both by my Mac and by the Raspberry Pi. To do this I used the ExFat file format. [Here are instructions](http://www.miqu.me/blog/2015/01/14/tip-exfat-hdd-with-raspberry-pi/) on how to set up and format the drive. Where the instructions use the "mnt" command, I instead used "sudo mount".

# Operations

Here are a few useful commands I found for operating my Plex server:

To unmount the external drive:

```
cd /mnt
sudo umount driveName
```
To reboot the Raspberry Pi:

```
sudo reboot
```
To shutdown the Raspberry Pi:

```
sudo shutdown
```
To start the Plex server:

```
sudo /etc/init.d/plexmediaserver start
```
# Getting Content

I had numerous DVDs and BluRays that I had purchased that I wanted to make available on my Plex server for convenience. To do this, I ripped them using [Handbrake](https://handbrake.fr/) on my Mac.

## Scrambled DVD Content

In some cases, after ripping a DVD the content produced was scrambled (it showed up jittery and pixilated). To fix this, I had to install hte libdvdcss library. The simplest way to do this is to use [HomeBrew](http://brew.sh/). If you don't have HomeBrew already, it is super easy to install and I highly recommend it. Once installed, simply run this command:

```
brew install libdvdcss
```
Then, restart Handbrake (if it was already open) You can also install the libdvdcss library manually by following [these instructions](http://lifehacker.com/5888078/vlc-20-breaks-handbrake-dvd-ripping-heres-how-to-fix-it). For quick reference, here is the [main page for the library](http://www.videolan.org/developers/libdvdcss.html) and a direct link to the [download page](http://download.videolan.org/pub/libdvdcss/) (choose the latest version)

## Encoded BluRays

To rip BluRays you need the ability to decode them. Thankfully, there is some useful software called [MakeMKV](http://www.makemkv.com) that will do this for you. Normally, you would need to rip the BluRay using MakeMKV then convert it to your desired format using Handbrake. Thankfully, you can also link the library directly into Handbrake and let it rip the movies directly. [This article](https://www.macobserver.com/tmo/article/directly-rip-and-convert-bluray-disks-with-handbrake) describes how to set it up. MakeMKV is in beta and free but requires an access key to work. You can [get the latest access key here](http://www.makemkv.com/forum2/viewtopic.php?f=5&t=1053).

## Naming Conventions

I frequently referenced these pages to ensure I was naming my video files correctly so that Plex would not have any issues gathering the correct metadata (movie posters, etc)

* [Movie Naming](https://support.plex.tv/hc/en-us/articles/200381023-Naming-Movie-files)
* [TV Series Naming](https://support.plex.tv/hc/en-us/articles/200220687-Naming-Series-Season-Based-TV-Shows)
* [IMDB](http://www.imdb.com/) - Useful for looking up information such as the year made about movies and TV shows

# Troubleshooting

## Direct Playback not working

Many of the videos (esp BluRays) were encoded with H.264 Level 4.1 instead of Level 4. Changing the setting on the Plex client to use 41 instead of 40 allowed for direct playback and prevented problems due to encoding.

## Video Buffering

[https://support.plex.tv/hc/en-us/articles/201575036](https://support.plex.tv/hc/en-us/articles/201575036)

## Handbrake Finishes Instantly

While ripping some DVDs Handbrake will finish almost instantly and create a small file (only about 3KB) that will not play properly. To fix this, in Handbrake go to the menu > Handbrake > Preferences > Advanced. Then under the section labeled "DVD Reader" uncheck the box that says "Use libdvdnav (instead of libdvdread)" You will then need to rescan your DVD before trying to rip it. Change the setting back when you are done.

[Source](https://forum.redfox.bz/threads/with-divergent-handbrake-says-%E2%80%9Cqueue-finished%E2%80%9D-after-about-1-second.61280/)

# Updating your Server

Periodically, Plex will release software updates for their server software. I found that downloading the latest version from the settings page of the Plex UI did not work. Instead, you need to update using apt-get from the command line.

```
sudo apt-get update
sudo apt-get upgrade
```