---
layout: post
title: "macOS Sonoma 14 Beta 1"
date: 2023-06-07 2:36:00 +0200
categories: hackintosh
---

As every year during 2023 WWDC Apple announced their new operating system called **macOS 14 code-name Sonoma**.
I'm not there to list every major change on this new version of macOS but what actually we want is the compatibility for our hackintoshes.

More in depth many hardware configurations that were officially supported in macOS Ventura, are most likely supported now. For more info about Ventura support, you can check out [my previous post](https://dreamwhite.github.io/macos/2022/10/27/Ventura-release.html)

## Catalog URL

A new catalog URL is available for downloading the installer application. You can set this URL in your favourite macOS catalog downloader: `https://swscan.apple.com/content/catalogs/others/index-14seed-14-13-12-10.16-10.15-10.14-10.13-10.12-10.11-10.10-10.9-mountainlion-lion-snowleopard-leopard.merged-1.sucatalog.gz`

## SMBIOS

**Extracted from /System/Library/CoreServices/PlatformSupport.plist**

- `iMac19,1`
- `iMac19,2`
- `iMac20,1`
- `iMac20,2`
- `iMacPro1,1`
- `MacBookAir8,1`
- `MacBookAir8,2`
- `MacBookAir9,1`
- `MacBookPro15,1`
- `MacBookPro15,2`
- `MacBookPro15,3`
- `MacBookPro15,4`
- `MacBookPro16,1`
- `MacBookPro16,2`
- `MacBookPro16,3`
- `MacBookPro16,4`
- `Macmini8,1`
- `MacPro7,1`

<br>
As already said before with Ventura, this basically means that no more support is available for pre-Kaby Lake hardware unless patching the system using [OpenCore Legacy Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher) when it'll get updated.

# GPU Support

## Intel

Only Intel iGPUs from Kaby Lake to Ice Lake will be still supported.

**N.B.** Skylake iGPUs can still be supported by spoofing them as KBL. Thx to Intel for recycling their chips ^^

## AMD

Same support as Ventura. Nothing has actually changed so far.

## Wi-Fi

From this first version of macOS, it seems that Apple decided to completely drop the support for Broadcom based chipset (e.g. BCM94350 and BCM94360, like the Fenvi T919).
At the time of writing, there's yet nothing that can be done. Maybe OCLP can play a role here, but this means completely defeating the purpose of having a vanilla system (no patches on the system itself).

Regarding Intel modules instead, AirportItlwm doesn't work yet. However, itlwm with Heliport seems to properly work.


## Storage

For the time being, NVMeFix.kext is broken. No fix known yet.

@vit9696 official statement on NVMeFix PR #7 ([original link](https://github.com/acidanthera/NVMeFix/pull/7#issuecomment-15782756055ac)):

```
Updating NVMeFix to macOS 14 will require substantial code changes. I would say current NVMeFix is already pretty much discontinued and needs fixes even for macOS 13. We will probably not release an update for it with macOS 14 support.
```

## Audio

It seems like that some people are complaining about AppleALC not detecting any audio devices. Personally speaking I haven't encountered any issue so far. I'm using `-lilubetaall` boot argument to make sure that latest officially released kexts can be loaded even on Sonoma.

A workaround would be downloading from [dortania.github.io build](https://dortania.github.io/builds) the commit-based compiled version, but honestly I don't see the point there, if just a header mentioning the version of macOS is changed.


# Conclusions

This new OS seems more or less similar to Ventura, but with a lot of problems for Broadcom users. Hope that a vanilla solution will be available soon, as I don't quite like to root-patch my system and possibly fuck up the security features (SIP, AMFI) of it.

I'll make another post once more info will be available.