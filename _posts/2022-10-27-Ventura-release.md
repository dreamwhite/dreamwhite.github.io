---
layout: post
title: "macOS Ventura 13 Official Release"
date: 2022-10-27 2:36:00 +0200
categories: macOS
---

As every year during 2022 WWDC Apple announced their new operating system called **macOS 13 code-name Ventura**.
I'm not there to repeat the same thing every single time, but check out my [previous post]()

More in depth many hardware configurations that were supported in macOS Monterey, are now unsupported.

## SMBIOS

**Extracted from `/System/Library/CoreServices/PlatformSupport.plist`**

- `MacBook10,1`
- `MacBookAir8,1`
- `MacBookAir8,2`
- `MacBookAir9,1`
- `MacBookPro14,1`
- `MacBookPro14,2`
- `MacBookPro14,3`
- `MacBookPro15,1`
- `MacBookPro15,2`
- `MacBookPro15,3`
- `MacBookPro15,4`
- `MacBookPro16,1`
- `MacBookPro16,2`
- `MacBookPro16,3`
- `MacBookPro16,4`
- `iMac18,1`
- `iMac18,2`
- `iMac18,3`
- `iMac19,1`
- `iMac19,2`
- `iMac20,1`
- `iMac20,2`
- `iMacPro1,1`
- `MacPro7,1`
- `Macmini8,1`


<br>

## Download

At the moment, the only possible way to download macOS Ventura is the full-installer from Apple Catalog using the following command:

##### Make sure to have Python 3 installed on your system

`mkdir -p ~/macOS-installer && cd ~/macOS-installer && curl https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py && sudo python installinstallmacos.py`

I'm looking for a way to get the recovery