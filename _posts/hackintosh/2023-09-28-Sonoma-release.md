---
layout: post
title: "macOS Sonoma 14 Release"
date: 2023-09-28 23:30:00 +0200
categories: hackintosh
---

As already said in the [previous post](https://dreamwhite.github.io/macos/2023/06/07/Sonoma-beta.html), Apple decided to completely drop the support for Broadcom based chipset (e.g. BCM94350 and BCM94360, like the Fenvi T919).

OCLP can play a role here (as described by [@khronokernel](https://github.com/khronokernel) on [OpenCore-Legacy-Patcher #1076](https://github.com/dortania/OpenCore-Legacy-Patcher/issues/1076#issue-1744994016)), but this means completely defeating the purpose of having a vanilla system (no patches on the system itself).

Regarding Intel modules instead, at the time of writing there's a preview of AirportItlwm available [here](https://github.com/OpenIntelWireless/itlwm/issues/883#issuecomment-1670749680) but please note that it's still in development stage.

In any case I succeeded installing macOS Sonoma 14 (23A344) on my laptop with a Fenvi BCM94360NG just for testing purposes. I'll still remain solid on macOS Ventura unless things, such as stable kexts or even new Wi-Fi modules, change (very unlikely).

Anyway, these are the things I did to install, starting from a freshly installed version of macOS Sonoma 14.

# Requirements

- [OpenCore Legacy Patcher 0.6.9](https://github.com/dortania/OpenCore-Legacy-Patcher/actions/workflows/build-app-wxpython.yml) (you need to be registered on GitHub to download the artifacts)
    - Download `OpenCore-Patcher.app (GUI)`
- Necessary kexts:
    - [`AMFIPass.kext`](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/main/payloads/Kexts/Acidanthera/AMFIPass-v1.3.1-RELEASE.zip) to avoid using `amfi=0x80` boot argument (which fucks up every app permission)
    - [`IOSkywalkFamily`](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/sonoma-development/payloads/Kexts/Wifi/IOSkywalkFamily-v1.0.0.zip) from [dortania's OpenCore Legacy Patcher `sonoma-development` branch](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/sonoma-development/)
    - [`IO80211FamilyLegacy`](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/sonoma-development/payloads/Kexts/Wifi/IO80211FamilyLegacy-v1.0.0.zip) from [dortania's OpenCore Legacy Patcher `sonoma-development` branch](https://github.com/dortania/OpenCore-Legacy-Patcher/blob/sonoma-development/)
- Optional kexts:
    - [`AirportBrcmFixup`](https://github.com/acidanthera/AirportBrcmFixup/releases/download/2.1.7/AirportBrcmFixup-2.1.7-RELEASE.zip) from [acidanthera's AirportBrcmFixup repository](https://github.com/acidanthera/AirportBrcmFixup)
- `Misc/Security/SecureBootModel` set to `Disabled`
- `NVRAM/Add/7C436110-AB2A-4BBB-A880-FE41995C9F82/csr-active-config` set to `<03080000>` (or `AwgAAA==` if you're using a plain-text editor)
    - Personally I prefer keeping the SIP minimally lowered, just to make OCLP working. In case you wanna reduce system protection features, you're on your own
- `csr-active-config` added under `NVRAM/Delete/7C436110-AB2A-4BBB-A880-FE41995C9F82` to make sure that the right SIP value is injected when you boot OpenCore
- Two bootable drives (one can be the ESP partition on your drive)

# Steps

Before proceeding with the root patching, make two copies of the EFI: one goes onto the first bootable drive (e.g. ESP partition on your drive), the other one goes onto the second bootable drive.
On the second bootable drive make sure to tweak the config as it follows:

- Under `Kernel/Add` add the following kexts in this order:
    - `AMFIPass.kext`
    - `IOSkywalkFamily.kext`
    - `IO80211FamilyLegacy.kext`
    - `AirportBrcmNIC.kext` that is bundled with `IO80211FamilyLegacy.kext`

```xml
<dict>
    <key>Arch</key>
    <string>x86_64</string>
    <key>BundlePath</key>
    <string>AMFIPass.kext</string>
    <key>Comment</key>
    <string></string>
    <key>Enabled</key>
    <true/>
    <key>ExecutablePath</key>
    <string>Contents/MacOS/AMFIPass</string>
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
```

In case you need `AirportBrcmFixup` add also:

```xml
<dict>
    <key>Arch</key>
    <string>x86_64</string>
    <key>BundlePath</key>
    <string>AirportBrcmFixup.kext</string>
    <key>Comment</key>
    <string>Various patches for Broadcom Airport Wi-Fi cards</string>
    <key>Enabled</key>
    <true/>
    <key>ExecutablePath</key>
    <string>Contents/MacOS/AirportBrcmFixup</string>
    <key>MaxKernel</key>
    <string></string>
    <key>MinKernel</key>
    <string>12.0.0</string>
    <key>PlistPath</key>
    <string>Contents/Info.plist</string>
</dict>
<dict>
    <key>Arch</key>
    <string>x86_64</string>
    <key>BundlePath</key>
    <string>AirportBrcmFixup.kext/Contents/PlugIns/AirPortBrcmNIC_Injector.kext</string>
    <key>Comment</key>
    <string>AirportBrcmNIC Injector - AirportBrcmFixup companion</string>
    <key>Enabled</key>
    <true/>
    <key>ExecutablePath</key>
    <string></string>
    <key>MaxKernel</key>
    <string></string>
    <key>MinKernel</key>
    <string>12.0.0</string>
    <key>PlistPath</key>
    <string>Contents/Info.plist</string>
</dict>
```

- Block `IOSkywalkFamily.kext` injection in the kernel cache using `Exclude` strategy:

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

- Add `-amfipassbeta` to your boot arguments (`NVRAM/Add/7C436110-AB2A-4BBB-A880-FE41995C9F82/boot-args`) for loading the kext on Sonoma
    - Technical background: this is a Lilu plugin that has a `PluginConfiguration` set to run on certain macOS versions. Example [here](https://github.com/acidanthera/AppleALC/blob/c90e10bdfbbc009018c678f41faf6289ee8d840a/AppleALC/kern_start.cpp#L36). Probably this kext hasn't been updated yet to load on Sonoma, but using the beta boot argument, you'll force the load on unsupported macOS versions.

Finally:

1. Open `OpenCore-Patcher.app`
2. Select `Post-Install Menu`
    1. Make sure that `Networking: Modern Patches` is in the available patches
3. Click on `Start Root Patching` and wait till the app asks to reboot
4. Once the reboot dialog shows up, reboot the system and boot using the second bootable drive

You should notice that the first boot is really slow (at least that happened with me). The next ones should be regular

That's all.

Please note , despite I'm not a big fan of OCLP, some people may still want to use macOS Sonoma with their Broadcom BCM94350/BCM94360 chipsets. I respect them for their decision, but for stability purposes, I don't endorse following them as well as this guide.

Cheers
dreamwhite

