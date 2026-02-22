---
title: Restoring Mac OS from Time Machine Backup
date: 2015-11-09
permalink: "/restoring-mac-from-time-machine-backup"
---

# Overview

The following is a series of steps and how-tos I've used for restoring my Mac from a Time Machine backup. Time machine does a good job of making it simple to restore your applications and files but getting all the settings and preferences back to the way they were before can be tricky. Here I highlight how I get things back up and running the way I like. Many of the settings are specific to my setup and preferences but I hope they will be of use to others as well.

# Basic Setup

## Show hidden files

This will make it easier to find things on the backup Time Machine drive

[http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks)/

## Restore settings

Note: These instructions are specific to my particular preferred settings

- Set scroll direction
  1. System Preferences > Trackpad > "Scroll & Zoom" > uncheck "Scroll direction: natural"
- Set finder preferences
  1. Finder > Preferences...
  2. Under "General" choose to show all items on desktop
  3. Under "Sidebar" select user directory to show under Favorites
- Set sorting in all folders
  1. Right click in a folder, and choose "Show View Options"
  2. Set "Arrange by:" to "Name"
  3. Set "Sort by:" to "Name"
  4. Click the "Use as Defaults" at the bottom
- Set up hot corners
  1. System Preferences > Mission Control
  2. Uncheck "Automatically rearrange Spaces based on most recent use"
  3. Uncheck "Displays have separate spaces"
  4. Click "Hot Corners..." button then set top right to be "Mission Control"
- Add lock screen to toolbar (this allows you to quickly lock your screen when you step away)
  1. Go > Utilities > Keychain Access
  2. In the toolbar menu, Keychain Access > Preferences > check the box "Show keychain status in menu bar"

# Restore Applications

## Restore applications using migration assistant

1. Go > Utilities > Migration Assistant
2. Choose the backup drive to restore from
3. If you use FireVault, DO NOT restore the either "Admin" or your specific "User". This will cause problems with FileVault and could make your machine unusable.
4. Select "Applications" and "Other files and folders" checkboxes (files will not restore Documents or other user files, that will be done later)

- It has been seen that XQuartz doesn't work after using MigrationAssistant. If you use XQuartz you can re-install it by going [here](http://xquartz.macosforge.org/landing/)
- Once complete, install [DisplayLink driver](http://www.displaylink.com/downloads/mac_downloads.php) for external USB displays (Only needed if not re-installed as part of MigrationAssistant which it should be if you had it before). This is only needed if you use a USB adapter for second (or more) displays connected to your Mac.

## Restore Firefox

Restore Firefox profile files (bookmarks, add-ons, plugins, etc) from backup by copying profile folder on backup drive to folder location on laptop.

1. Close Firefox
2. Run the following command from the terminal (adjust backup path as necessary):
   ```
   cp -r /Volumes/Backups/Backups.backupdb/406c8f4f3d8a/Latest/Macintosh\\ HD/Users/yourUserName/Library/Application\\ Support/Firefox/Profiles/b9t1x3as.default /Users/yourUserName/Library/Application\\ Support/Firefox/Profiles/
   ```
3. For more info see this [link](https://support.mozilla.org/en-US/kb/back-and-restore-information-firefox-profiles#w_restoring-a-profile-backup)

# Restore documents & files

- Copy Documents folder from TimeMachine backup to new Documents folder
- If you use Microsoft Office, close all Microsoft apps (including outlook) before copying the "Microsoft User Data folder"

# Restore developer preferences

## Restore .profile

Copy .profile file from time machine backup (adjust source path based on backup location):

```
cp /Volumes/Backups/Backups.backupdb/406c8f4f3d8a/Latest/Macintosh\\ HD/Users/yourUserName/.profile /Users/yourUserName
```

## Add shortcut for accessing a particular folder

Add the following to your .profile file. to create a command shortcut that works like cd to navigate to a particular, frequently used folder.

```
function wp() { cd /Users/your/desired/directory/$1; }
\_wp() { \_files -W /Users/your/desired/directory/; }
compdef \_wp wp<br/>
```

## Copy terminal preferences

With terminal closed, copy in your `com.apple.Terminal.plist file`. This must be done using Finder as Terminal will save its current settings when it closes and therefore can not be running when the plist file is updated.

- File location on mac: `/Users/yourUserName/Library/Preferences/com.apple.Terminal.plist`
- File location on backup: `/Volumes/Backups/Backups.backupdb/406c8f4f3d8a/2015-02-13-144500/Macintosh\ HD/Users/yourUserName/Library/Preferences/com.apple.Terminal.plist`
- Then kill the 'cfprefsd' process in Activity Monitor (Go > Utilities > Activity Monitor).(it will restart automatically) Make sure to choose "Force Quit". Using "Quit" will not work.
- Open Terminal
