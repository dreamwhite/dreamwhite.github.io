---
layout: post
title: "macOS Sonoma 14 Beta 1 Wifi updates"
date: 2023-06-07 2:36:00 +0200
categories: macOS
---

As already said in the [previous post](https://dreamwhite.github.io/macos/2023/06/07/Sonoma-beta.html), Apple decided to completely drop the support for Broadcom based chipset (e.g. BCM94350 and BCM94360, like the Fenvi T919).

OCLP can play a role here (as described by [@khronokernel](https://github.com/khronokernel) on [OpenCore-Legacy-Patcher #1076](https://github.com/dortania/OpenCore-Legacy-Patcher/issues/1076#issue-1744994016)), but this means completely defeating the purpose of having a vanilla system (no patches on the system itself).

Regarding Intel modules instead, AirportItlwm doesn't work yet. However, itlwm with Heliport seems to properly work as well as some third party USB Wi-Fi dongles ([reference](https://www.insanelymac.com/forum/topic/356881-pre-release-macos-sonoma/?do=findComment&comment=2805928))


I'll write there my "study notes", regarding Wi-Fi support on macOS but there's actually nothing to do here, unless OCLP or Apple decides to reintroduce the support (very unlikely IMHO but let's see):

# Test 1: Inject IO80211FamilyLegacy

As already stated, `IO80211FamilyLegacy.kext` got dropped, therefore no `BCM94350` and `BCM94360` support (basically any Fenvi T919/HB1200 or M.2 version do not work).

What I did was:

- Download the latest KDK (Ventura version) from [developer.apple.com](https://developer.apple.com/download/all) (worth mentioning it that SLE kext binaries are not there anymore, but just the `Info.plist` mainly).
- Using [Suspicious Package](https://www.mothersruin.com/software/SuspiciousPackage) extracted the content of `/System/Library/Extensions`
- Injected `IO80211FamilyLegacy.kext` previously obtained via OpenCore

Result was that OC failed to inject it:

```
...
06:002 00:008 OCAK: Patching invalid size 36FF1 with 21CF000 for com.apple.driver.AppleMobileFileIntegrity
06:011 00:008 OCAK: Patching invalid size 9FF7 with 1DF9000 for com.apple.iokit.CoreAnalyticsFamily
06:028 00:017 OCAK: Patching invalid size 7AFD0 with CA7000 for com.apple.kec.corecrypto
06:037 00:008 OCAK: Patching invalid size 9FFA with 1D1D000 for com.apple.kext.CoreTrust
06:043 00:005 OCAK: Patching invalid size 1FFF2 with 2313000 for com.apple.security.AppleImage4
06:062 00:018 OCAK: Patching invalid size 22FF5 with CD8000 for com.apple.driver.corecapture
06:099 00:037 OCAK: Patching invalid size 16FF4 with 1774000 for com.apple.iokit.IONetworkingFamily
06:130 00:031 OCAK: Patching invalid size 2DFF8 with 1427000 for com.apple.iokit.IOSkywalkFamily
06:140 00:009 OCAK: Patching invalid size 5000 with 151B000 for com.apple.driver.mDNSOffloadUserClient
06:491 00:350 OCAK: Failed to patch symbol __ZN25IOSkywalkNetworkInterface13getTSOOptionsEPNS_19IOSkywalkTSOOptionsE for vtable __ZTV23IO80211SkywalkInterface
06:496 00:004 OCAK: Failed to patch vtable for superclass 26IOSkywalkEthernetInterface
06:500 00:004 OCAK: Vtable patching failed for kext com.apple.iokit.IO80211FamilyLegacy
06:504 00:004 OC: Prelinked injection IO80211FamilyLegacy.kext () - Invalid Parameter
06:510 00:005 OC: Prelinked injection IO80211FamilyLegacy.kext v1200.12.2b1
06:527 00:017 OCAK: Dependency com.apple.iokit.IO80211FamilyLegacy was not found for kext com.apple.driver.AirPort.BrcmNIC
06:629 00:101 OCAK: Vtable patching failed for kext com.apple.driver.AirPort.BrcmNIC
06:633 00:004 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\AirPortBrcmNIC.kext () - Invalid Parameter
06:639 00:005 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\AirPortBrcmNIC.kext v1400.1.1
06:653 00:014 OCAK: Dependency com.apple.iokit.IO80211FamilyLegacy was not found for kext com.apple.driver.IO80211NetBooter
06:671 00:017 OCAK: Symbol __ZN17IO80211NetBootNub9metaClassE has 0-value
06:675 00:004 OCAK: Symbol __ZN17IO80211NetBootNub11getWorkLoopEv has 0-value
06:680 00:004 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\IO80211NetBooter.kext () - Invalid Parameter
06:686 00:005 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\IO80211NetBooter.kext v1200.12.2b1
...
```

The lines that made me think "UHMMMMMMMM" were:

```
...
06:491 00:350 OCAK: Failed to patch symbol __ZN25IOSkywalkNetworkInterface13getTSOOptionsEPNS_19IOSkywalkTSOOptionsE for vtable __ZTV23IO80211SkywalkInterface
06:496 00:004 OCAK: Failed to patch vtable for superclass 26IOSkywalkEthernetInterface
...
```
 
Basically it is related to `IOSkywalkFamily` kext not working if paired with `IO80211FamilyLegacy` kext.

So what I did was:
 
- block `IOSkywalkFamily` through OpenCore `Block` mechanism (used `Exclude` strategy as it better suits for our needs aka replacing the kext with another version):


```xml
<dict>
    <key>Arch</key>
    <string>Any</string>
    <key>Comment</key>
    <string>Block IOSkywalkFamily kext</string>
    <key>Enabled</key>
    <true/>
    <key>Identifier</key>
    <string>com.apple.iokit.IOSkywalkFamily</string>
    <key>MaxKernel</key>
    <string></string>
    <key>MinKernel</key>
    <string></string>
    <key>Strategy</key>
    <string>Exclude</string>
</dict>
```

- inject both `IOSkywalkFamily` and `IO80211FamilyLegacy` (`IOSkywalkFamily` comes before `IO80211FamilyLegacy` as it depends on it):

```xml
<dict>
    <key>Arch</key>
    <string>x86_64</string>
    <key>BundlePath</key>
    <string>IOSkywalkFamily.kext</string>
    <key>Comment</key>
    <string></string>
    <key>Enabled</key>
    <true/>
    <key>ExecutablePath</key>
    <string>Contents/MacOS/IOSkywalkFamily</string>
    <key>MaxKernel</key>
    <string></string>
    <key>MinKernel</key>
    <string></string>
    <key>PlistPath</key>
    <string>Contents/Info.plist</string>
</dict>
<dict>
    <key>Arch</key>
    <string>x86_64</string>
    <key>BundlePath</key>
    <string>IO80211FamilyLegacy.kext</string>
    <key>Comment</key>
    <string></string>
    <key>Enabled</key>
    <true/>
    <key>ExecutablePath</key>
    <string>Contents/MacOS/IO80211FamilyLegacy</string>
    <key>MaxKernel</key>
    <string></string>
    <key>MinKernel</key>
    <string></string>
    <key>PlistPath</key>
    <string>Contents/Info.plist</string>
</dict>
<dict>
    <key>Arch</key>
    <string>x86_64</string>
    <key>BundlePath</key>
    <string>IO80211FamilyLegacy.kext/Contents/PlugIns/AirPortBrcmNIC.kext</string>
    <key>Comment</key>
    <string></string>
    <key>Enabled</key>
    <true/>
    <key>ExecutablePath</key>
    <string>Contents/MacOS/AirPortBrcmNIC</string>
    <key>MaxKernel</key>
    <string></string>
    <key>MinKernel</key>
    <string></string>
    <key>PlistPath</key>
    <string>Contents/Info.plist</string>
</dict>
<dict>
    <key>Arch</key>
    <string>x86_64</string>
    <key>BundlePath</key>
    <string>IO80211FamilyLegacy.kext/Contents/PlugIns/IO80211NetBooter.kext</string>
    <key>Comment</key>
    <string></string>
    <key>Enabled</key>
    <true/>
    <key>ExecutablePath</key>
    <string>Contents/MacOS/IO80211NetBooter</string>
    <key>MaxKernel</key>
    <string></string>
    <key>MinKernel</key>
    <string></string>
    <key>PlistPath</key>
    <string>Contents/Info.plist</string>
</dict>
```
 
The OS correctly boots and OpenCore correctly loads the kext:


```

05:363 00:189 OCAK: Patching invalid size 2DFF8 with 1425000 for com.apple.iokit.IOSkywalkFamily
05:367 00:003 OCAK: Excluding com.apple.iokit.IOSkywalkFamily - VirtualBase FFFFFF80027E7000, MaxSize 3F000
05:371 00:004 OCAK: Found kext com.apple.iokit.IOSkywalkFamily (9B518018) from link 9B518020 to drop
05:374 00:002 OCAK: Erasing com.apple.iokit.IOSkywalkFamily from prelinked kext under dict index 3, plist 9BD2CB98, plist index 167
05:378 00:003 OC: Prelinked blocker (Exclude) result 0 for com.apple.iokit.IOSkywalkFamily (Block IOSkywalkFamily kext) - Success

...

06:299 00:010 OCAK: Patching invalid size 5000 with 151B000 for com.apple.driver.mDNSOffloadUserClient
06:308 00:008 OCAK: Patching invalid size 16FF4 with 1774000 for com.apple.iokit.IONetworkingFamily
06:525 00:217 OCAK: Local relocs 7087 on FFFFFF8003F8C000
06:588 00:063 OC: Prelinked injection IOSkywalkFamily.kext () - Success
06:591 00:002 OC: Prelinked injection IOSkywalkFamily.kext v1.0
06:598 00:006 OCAK: Patching invalid size 36FF1 with 21CF000 for com.apple.driver.AppleMobileFileIntegrity
06:605 00:007 OCAK: Patching invalid size 9FF7 with 1DF9000 for com.apple.iokit.CoreAnalyticsFamily
06:622 00:016 OCAK: Patching invalid size 7AFD0 with CA7000 for com.apple.kec.corecrypto
06:629 00:007 OCAK: Patching invalid size 9FFA with 1D1D000 for com.apple.kext.CoreTrust
06:634 00:004 OCAK: Patching invalid size 1FFF2 with 2313000 for com.apple.security.AppleImage4
06:652 00:018 OCAK: Patching invalid size 22FF5 with CD8000 for com.apple.driver.corecapture
07:119 00:466 OCAK: Local relocs 8897 on FFFFFF800405A000
07:187 00:068 OC: Prelinked injection IO80211FamilyLegacy.kext () - Success
07:190 00:002 OC: Prelinked injection IO80211FamilyLegacy.kext v1200.12.2b1
07:395 00:205 OCAK: Local relocs 6983 on FFFFFF8004264000
07:437 00:042 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\AirPortBrcmNIC.kext () - Success
07:440 00:002 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\AirPortBrcmNIC.kext v1400.1.1
07:458 00:018 OCAK: Local relocs 305 on FFFFFF8004B07000
07:463 00:005 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\IO80211NetBooter.kext () - Success
07:466 00:002 OC: Prelinked injection IO80211FamilyLegacy.kext\Contents\PlugIns\IO80211NetBooter.kext v1200.12.2b1
07:469 00:002 OC: Prelink size 77688832 kext offset 61923328 reserved 15765504
07:472 00:002 OCAK: KC TEXT is 65536 bytes with 62032 Mach-O headers need 1392
07:989 00:516 OC: Prelinked status - Success

```
 

The result is the following: IORegistryExplorer correctly shows IOSkywalkFamily attached to the card itself:

![](assets/posts/sonoma-wifi/sonoma-wifi-ioreg.png)

On macOS Ventura, the Wi-Fi card IORegistryExplorer dump structure is pretty similar to Sonoma:

![](assets/posts/sonoma-wifi/ventura-wifi-ioreg.png)

# BUT

When opening the Wi-Fi settings menu, it seems like the card is continuously scanning for available networks without no luck...

A person reported that iPhone personal hotspot appeared randomly (phone rang and populated the section under Personal Hotspot) as described [here](https://www.insanelymac.com/forum/topic/356881-pre-release-macos-sonoma/?do=findComment&comment=2805872)

From what I've been able to find out, it seems like that Wi-Fi stack on macOS is more likely a combination of KEXTs (possibly also DEXTs) and Frameworks (`KernelCollections` and `/System/Library/PrivateFrameworks`). Without a proper patching (root-patching as OCLP does) it will never work... 

# Conclusions

This OS seems quite similar to Ventura despite completely creating problems for Broadcom users.
While waiting, a possible solution could be among the following:

- don't use Wi-Fi (Continuity should work as far as I'm aware, but needs confirmation)
- use an external USB Wi-Fi dongle (aka abandoning Apple Wi-Fi services)
- use an Intel Wi-Fi card supported by `itlwm` paired with Heliport app
- hope some chinese mofo creates an external PCIe device based on M1 Wi-Fi/BT chip

My honest thought on that, considering Apple behaviour in the previous years with "old" Macs, is that it'll completely leave us without any hope.

Personally speaking, if Sonoma won't support anymore such cards, I'll stick to macOS Ventura, till its EOL and my laptop resists over the years, then decide whether get a MacBook or switch back to Linux as already done for my first 17 years of life (now 22).

Finally, I'll make another post once a valid fix (aka not root-patching or chinese announce an external M.2 module) will be found.
In the meanwhile, I'll try to get some sleep, as I've been sleeping less than 4 hours per day for the last two weeks due to stress (university, """job""", gym, relationships etc) as well as 400mg of daily intake of caffeine.

Cheers
dreamwhite

