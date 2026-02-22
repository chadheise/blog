---
title: Email Accounts on iPhone
date: 2015-12-20
tags: technology
---

# Overview

I have multiple email accounts that I synchronize on my iPhone. On my main email, I use my own custom domain and email account (e.g. johndoe@yourdomain.com) but forward the emails to my Gmail account. I have the Gmail account set up so that I can send emails from my custom domain using [aliases](https://support.google.com/mail/answer/22370?hl=en). By doing this, when other people receive my email it shows up as being from my custom domain (e.g. johndoe@yourdomain.com) instead of my Gmail account (e.g. johndoe@gmail.com). This is all configured in Gmail settings.

In order to get things working on the iPhone so that email sent from my iPhone also shows as being from my custom domain instead of my Gmail address, it takes some extra configuration. I found [this post](http://www.nathanpjones.com/wp/2014/01/using-gmail-aliases-in-ios-7/) which had many useful suggestions but didn't work perfectly for me so I wanted to share how I set everything up.

# Steps

1. Open your iPhone settings

<img src="{{site.baseurl}}/assets/img/1settings.png" alt="settings" title="iPhone Settings" width="250" />

2. Scroll and select "Mail, Contacts and Calendars"

<img src="{{site.baseurl}}/assets/img/2mailContactsCalendars.png" alt="mailContactsCalendars" title="Mail, Contacts and Calendars" width="250" />

3. Choose "Add Account"

<img src="{{site.baseurl}}/assets/img/3addAccount.png" alt="addAccount" title="Add Account" width="250" />

4. Select "Other" account. Using the "Google" option does not allow for it to be set up properly using the email alias

<img src="{{site.baseurl}}/assets/img/4googleAccount.png" alt="googleAccount" title="Google Account" width="250" />

5. Select "Add Mail Account"

<img src="{{site.baseurl}}/assets/img/5addMailAccount.png" alt="addMailAccount" title="Add Mail Account" width="250" />

6. Fill in your account information. Use your custom domain email address and your Gmail password. Choose a Name and Description as desirable.

<img src="{{site.baseurl}}/assets/img/6accountInfo.png" alt="accountInfo" title="Account Info" width="250" />

7. On the next screen, scroll down to the "incoming mail server".<br/>
**Host Name:** imap.gmail.com<br/>
**User Name:** your Gmail address (not your custom domain email)<br/>
**Password:** your Gmail password<br/>

<img src="{{site.baseurl}}/assets/img/7incomingMail.png" alt="incomingMail" title="Incoming Mail Server" width="250" />

8. Scroll to "outgoing mail server"<br/>
**Host Name:** smtp.gmail.com<br/>
**User Name:** your Gmail address (not your custom domain email)<br/>
**Password:** your Gmail password

<img src="{{site.baseurl}}/assets/img/8outgoingMail.png" alt="outgoingMail" title="Outgoing Mail Server" width="250" />

# Other Settings

## 2 Factor Authentication

If you are using Google's 2 factor authentication, then you will need to set up an app password to use instead of your normal gmail password. See this for more information: [https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)

[Google App Passwords Page](https://security.google.com/settings/security/apppasswords)

## Archive Deleted Items

I prefer not to actually delete "deleted" messages but instead just archive them in Gmail. To do this, click "Advanced" when viewing your account, then set the following settings.

<img src="{{site.baseurl}}/assets/img/archiveDeletedMessages.png" alt="archiveDeletedMessages" title="Archive Deleted Items" width="250" />

## Calendars, Contacts, and more

Following the steps above will set up your email to work properly but because of the custom setup using aliases, it will not link to your Google calendars, contacts, etc. To do this, add another account. This time choose "Google" (step 4 above) Follow the instructions using your gmail address. When complete, you will have a menu option to select services. Do not check "Mail" but check any of the other services you want to use like "Calendar" or "Contacts" to sync these Google services with your iPhone.

## Set Default Email Address

If you have multiple email accounts, you can set which one is used by default when you send an email.

1. Go to the mail settings (steps 1 & 2 above)
2. Scroll down under the "mail" heading. Select "Default Account" and choose the account you want to use.
