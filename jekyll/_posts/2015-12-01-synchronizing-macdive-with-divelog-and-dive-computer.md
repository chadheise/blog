---
title:  "Synchronizing MacDive with DiveLog and Dive Computer"
date:   2015-12-01
permalink: "/synchronizing-mac-dive"
---
<img src="{{site.baseurl}}/assets/img/butterflyFish.jpg" alt="butterflyFish" title="Butterfly Fish" />

# Overview

As a scuba diver and tech guru, I enjoy logging all of my dives electronically. Of course I want both a portable version that I can use to log my dives while at the beach or on a dive boat as well as a more full-featured version on my laptop that I can add details to later. Furthermore, I want to synchronize the dive data from my dive computer into my logbook and keep all the data in sync.

To do this, I use [MacDive](http://www.mac-dive.com/) for logging the dives on my computer, I use the [DiveLog](https://itunes.apple.com/us/app/dive-log/id301049600?mt=8) app for logging on my iPhone and iPad, and I use my [Suunto](http://www.suunto.com/Dive-Collections/Watch-sized-dive-computers/) D4 dive computer for tracking realtime dive data underwater. I've found this system works pretty well but keeping everything in sync can be a bit tricky. Here are some of my discoveries in getting everything to work.

# How to Merge Dives

In order to get everything logged in the DiveLog app and recording on my dive computer synchronized with MacDive I do the following:

1. Import new dives from dive computer to MacDive (recommended: “Only New Dives”) (File -> Download Dives) The dives recorded by your Dive Computer with depth and other info will now be in MacDive.
2. To merge data you've recorded on your phone with the data on your Mac, set the date and time of each dive on the iPhone (DiveLog) to match data from the computer (MacDive). The synchronization processes will merge the dives based on the timestamp so it is important to do this before importing from DiveLog.
3. Import the dives from iPhone (DiveLog) using the “sync” button in MacDive
4. Make any changes/additions to logs in MacDive. This will serve as the "master" source for your log book.
5. Re-sync with iPhone. Assuming you've followed the steps above, all the latest data will be in MacDive. If this is the case, I find it easier to overwrite the data in DiveLog with data from MacDive.
6. To get the data on my iPad, I then do one of 2 options:
    1. Overwrite the iPad data with MacDive data. Do the same thing as was done in step 5 but on the iPad.
    2. In DiveLog on the iPhone, upload the data to iCloud. Then open DiveLog on the iPad and download the data from iCloud.

# Troubleshooting

## Error Importing from dive computer

When importing data from my Suunto D4 into MacDive, I sometimes see the following:

```
Import Error
 Failed connecting to dive computer on serial port '/dev/tty.usbserial-ST000001' (Error Code: -7)
```
To fix it, I check the following:

1. Make sure [FTDI driver](http://www.ftdichip.com/Drivers/VCP.htm) is installed
2. Check USB devices by opening terminal and running
    
    ```
     system\_profiler SPUSBDataType
    ```
3. Check device id by running this command in terminal
    
    ```
     ls /dev/tty.\*
    ```
4. Make sure dive computer shows "Data Transfer" sometimes it will timeout and go back to "Time" mode. To fix this, unplug and replug the cable to the dive computer.

# Links

- [MacDive's guide for syncing with DiveLog](http://www.mac-dive.com/help/index.php?title=Dive_Log_Sync)
