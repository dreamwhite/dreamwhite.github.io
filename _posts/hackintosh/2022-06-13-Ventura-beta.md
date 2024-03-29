---
layout: post
title: "macOS Ventura 13 Beta 1"
date: 2022-06-13 2:36:00 +0200
categories: hackintosh
---

As every year during 2022 WWDC Apple announced their new operating system called **macOS 13 code-name Ventura**.
I'm not there to list every major change on this new version of macOS but what actually we want is the compatibility for our hackintoshes.

More in depth many hardware configurations that were supported in macOS Monterey, are now unsupported.

## SMBIOS

**/System/Library/CoreServices/PlatformSupport.plist differences between macOS Ventura and macOS Monterey**

- `iMac16,1`
- `iMac16,2`
- `iMac17,1`
- `MacBook9,1`
- `MacBookAir7,1`
- `MacBookAir7,2`
- `MacBookPro11,4`
- `MacBookPro11,5`
- `MacBookPro12,1`
- `MacBookPro13,1`
- `MacBookPro13,2`
- `MacBookPro13,3`
- `Macmini7,1`
- `MacPro6,1`

<br>
This basically means that no more support is available for pre-Kaby Lake hardware unless patching the system using [OpenCore Legacy Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher) when it'll get updated.

# GPU Support

## Intel

That's way useful for iGPU only devices, mainly laptops. More in depth the following kexts got dropped:

- `AppleIntelBDWGraphics.kext`
- `AppleIntelBDWGraphicsFramebuffer.kext`
- `AppleIntelFramebufferAzul.kext`
- `AppleIntelHD5000Graphics.kext`

This means that only Intel iGPUs from Kaby Lake to Ice Lake will be still supported

## AMD

That's probably the most important one, as many people may not have a recent AMD GPU (thx chip shortage). More in depth, the following kexts got dropped:

- `AMD7000Controller.kext`
- `AMD8000Controller.kext`
- `AMD9000Controller.kext`

**TL;DR: pre Polaris card are dropped**

**Please note that NVidia Kepler GPUs are not listed since they weren't supported on macOS Monterey without [OpenCore Legacy Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher)**
<br>
This means that only the following GPUs will be still supported:

### AMD9500Controller.kext

| Vendor ID 	| Device ID 	| Description                                                     	|
|-----------	|------------	|-----------------------------------------------------------------	|
| 0x1002    	| 0x67E0     	| Baffin [Radeon Pro WX 4170]                                     	|
| 0x1002    	| 0x67E3     	| Baffin [Radeon Pro WX 4100]                                     	|
| 0x1002    	| 0x67E8     	| Baffin [Radeon Pro WX 4130/4150]                                	|
| 0x1002    	| 0x67EB     	| Baffin [Radeon Pro V5300X]                                      	|
| 0x1002    	| 0x67EF     	| Baffin [Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X] 	|
| 0x1002    	| 0x67FF     	| Baffin [Radeon RX 550 640SP / RX 560/560X]                      	|
| 0x1002    	| 0x67E1     	| Baffin [Polaris11]                                              	|
| 0x1002    	| 0x67E7     	|                                                                 	|
| 0x1002    	| 0x67E9     	| Baffin [Polaris11]                                              	|
| 0x1002    	| 0x67C0     	| Ellesmere [Radeon Pro WX 7100 Mobile]                           	|
| 0x1002    	| 0x67C1     	|                                                                 	|
| 0x1002    	| 0x67C2     	| Ellesmere [Radeon Pro V7300X / V7350x2]                         	|
| 0x1002    	| 0x67C4     	| Ellesmere [Radeon Pro WX 7100]                                  	|
| 0x1002    	| 0x67C7     	| Ellesmere [Radeon Pro WX 5100]                                  	|
| 0x1002    	| 0x67DF     	| Ellesmere [Radeon RX 470/480/570/570X/580/580X]                 	|
| 0x1002    	| 0x67D0     	| Ellesmere [Radeon Pro V7300X / V7350x2]                         	|
| 0x1002    	| 0x67C8     	|                                                                 	|
| 0x1002    	| 0x67C9     	|                                                                 	|
| 0x1002    	| 0x67CA     	| Ellesmere [Polaris10]                                           	|
| 0x1002    	| 0x67CC     	| Ellesmere [Polaris10]                                           	|
| 0x1002    	| 0x67CF     	| Ellesmere [Polaris10]                                           	|

### AMD10000Controller.kext

| Vendor ID 	| Device ID 	| Description                                	|
|-----------	|------------	|--------------------------------------------	|
| 0x1002    	| 0x6860     	| Vega 10 [Radeon Instinct MI25]             	|
| 0x1002    	| 0x6861     	| Vega 10 XT [Radeon PRO WX 9100]            	|
| 0x1002    	| 0x6862     	| Vega 10 XT [Radeon PRO SSG]                	|
| 0x1002    	| 0x6863     	| Vega 10 XTX [Radeon Vega Frontier Edition] 	|
| 0x1002    	| 0x6864     	| Vega                                       	|
| 0x1002    	| 0x6867     	| Vega 10 XL [Radeon Pro Vega 56]            	|
| 0x1002    	| 0x6868     	| Vega 10 [Radeon PRO WX 8100]               	|
| 0x1002    	| 0x6869     	| Vega 10 XGA [Radeon Pro Vega 48]           	|
| 0x1002    	| 0x686A     	| Vega 10 LEA                                	|
| 0x1002    	| 0x686B     	| Vega 10 XTXA [Radeon Pro Vega 64X]         	|
| 0x1002    	| 0x686C     	| Vega 10 [Radeon Instinct MI25 MxGPU]       	|
| 0x1002    	| 0x686D     	| Vega 10 GLXTA                              	|
| 0x1002    	| 0x686E     	| Vega 10 GLXLA                              	|
| 0x1002    	| 0x686F     	|                                            	|
| 0x1002    	| 0x687F     	| Vega 10 XT [Radeon RX Vega 64]             	|
| 0x1002    	| 0x69A0     	| Vega 12                                    	|
| 0x1002    	| 0x69A1     	| Vega 12                                    	|
| 0x1002    	| 0x69A2     	| Vega 12                                    	|
| 0x1002    	| 0x69A3     	| Vega 12                                    	|
| 0x1002    	| 0x69AF     	| Vega 12                                    	|
| 0x1002    	| 0x66A0     	| Vega 20 [Radeon Instinct]                  	|
| 0x1002    	| 0x66A1     	| Vega 20                                    	|
| 0x1002    	| 0x66A2     	| Vega 20                                    	|
| 0x1002    	| 0x66A3     	| Vega 20                                    	|
| 0x1002    	| 0x66A7     	| Vega 20 [Radeon Pro Vega 20]               	|
| 0x1002    	| 0x66AF     	| Vega 20                                    	|

### AMDRadeonX4000.kext

| Vendor ID 	| Device ID 	| Description                                                     	|
|-----------	|-----------	|-----------------------------------------------------------------	|
| 0x1002    	| 0x67C0    	| Ellesmere [Radeon Pro WX 7100 Mobile]                           	|
| 0x1002    	| 0x67C1    	|                                                                 	|
| 0x1002    	| 0x67C2    	| Ellesmere [Radeon Pro V7300X / V7350x2]                         	|
| 0x1002    	| 0x67C4    	| Ellesmere [Radeon Pro WX 7100]                                  	|
| 0x1002    	| 0x67C7    	| Ellesmere [Radeon Pro WX 5100]                                  	|
| 0x1002    	| 0x67DF    	| Ellesmere [Radeon RX 470/480/570/570X/580/580X]                 	|
| 0x1002    	| 0x67D0    	| Ellesmere [Radeon Pro V7300X / V7350x2]                         	|
| 0x1002    	| 0x67C8    	|                                                                 	|
| 0x1002    	| 0x67C9    	|                                                                 	|
| 0x1002    	| 0x67CA    	| Ellesmere [Polaris10]                                           	|
| 0x1002    	| 0x67CC    	| Ellesmere [Polaris10]                                           	|
| 0x1002    	| 0x67CF    	| Ellesmere [Polaris10]                                           	|
| 0x1002    	| 0x67E0    	| Baffin [Radeon Pro WX 4170]                                     	|
| 0x1002    	| 0x67E3    	| Baffin [Radeon Pro WX 4100]                                     	|
| 0x1002    	| 0x67E8    	| Baffin [Radeon Pro WX 4130/4150]                                	|
| 0x1002    	| 0x67EB    	| Baffin [Radeon Pro V5300X]                                      	|
| 0x1002    	| 0x67EF    	| Baffin [Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X] 	|
| 0x1002    	| 0x67FF    	| Baffin [Radeon RX 550 640SP / RX 560/560X]                      	|
| 0x1002    	| 0x67E1    	| Baffin [Polaris11]                                              	|
| 0x1002    	| 0x67E7    	|                                                                 	|
| 0x1002    	| 0x67E9    	| Baffin [Polaris11]                                              	|

### AMDRadeonX5000.kext

| Vendor ID 	| Device ID 	| Description                                	|
|-----------	|-----------	|--------------------------------------------	|
| 0x1002    	| 0x6860    	| Vega 10 [Radeon Instinct MI25]             	|
| 0x1002    	| 0x6861    	| Vega 10 XT [Radeon PRO WX 9100]            	|
| 0x1002    	| 0x6862    	| Vega 10 XT [Radeon PRO SSG]                	|
| 0x1002    	| 0x6863    	| Vega 10 XTX [Radeon Vega Frontier Edition] 	|
| 0x1002    	| 0x6864    	| Vega                                       	|
| 0x1002    	| 0x6867    	| Vega 10 XL [Radeon Pro Vega 56]            	|
| 0x1002    	| 0x6868    	| Vega 10 [Radeon PRO WX 8100]               	|
| 0x1002    	| 0x6869    	| Vega 10 XGA [Radeon Pro Vega 48]           	|
| 0x1002    	| 0x686A    	| Vega 10 LEA                                	|
| 0x1002    	| 0x686B    	| Vega 10 XTXA [Radeon Pro Vega 64X]         	|
| 0x1002    	| 0x686C    	| Vega 10 [Radeon Instinct MI25 MxGPU]       	|
| 0x1002    	| 0x686D    	| Vega 10 GLXTA                              	|
| 0x1002    	| 0x686E    	| Vega 10 GLXLA                              	|
| 0x1002    	| 0x686F    	|                                            	|
| 0x1002    	| 0x687F    	| Vega 10 XT [Radeon RX Vega 64]             	|
| 0x1002    	| 0x69A0    	| Vega 12                                    	|
| 0x1002    	| 0x69A1    	| Vega 12                                    	|
| 0x1002    	| 0x69A2    	| Vega 12                                    	|
| 0x1002    	| 0x69A3    	| Vega 12                                    	|
| 0x1002    	| 0x69AF    	| Vega 12                                    	|
| 0x1002    	| 0x66A0    	| Vega 20 [Radeon Instinct]                  	|
| 0x1002    	| 0x66A1    	| Vega 20                                    	|
| 0x1002    	| 0x66A2    	| Vega 20                                    	|
| 0x1002    	| 0x66A3    	| Vega 20                                    	|
| 0x1002    	| 0x66A7    	| Vega 20 [Radeon Pro Vega 20]               	|
| 0x1002    	| 0x66AF    	| Vega 20                                    	|

### AMDRadeonX6000.kext

| Vendor ID 	| Device ID 	| Description                                         	|
|-----------	|-----------	|-----------------------------------------------------	|
| 0x1002    	| 0x7310    	| Navi 10 [Radeon Pro W5700X]                         	|
| 0x1002    	| 0x7312    	| Navi 10 [Radeon Pro W5700]                          	|
| 0x1002    	| 0x7318    	|                                                     	|
| 0x1002    	| 0x7319    	|                                                     	|
| 0x1002    	| 0x731A    	|                                                     	|
| 0x1002    	| 0x731B    	|                                                     	|
| 0x1002    	| 0x731F    	| Navi 10 [Radeon RX 5600 OEM/5600 XT / 5700/5700 XT] 	|
| 0x1002    	| 0x7360    	| Navi 12 [Radeon Pro 5600M]                          	|
| 0x1002    	| 0x7340    	| Navi 14 [Radeon RX 5500/5500M / Pro 5500M]          	|
| 0x1002    	| 0x7341    	| Navi 14 [Radeon Pro W5500]                          	|
| 0x1002    	| 0x7343    	|                                                     	|
| 0x1002    	| 0x7347    	| Navi 14 [Radeon Pro W5500M]                         	|
| 0x1002    	| 0x734F    	| Navi 14 [Radeon Pro W5300M]                         	|
| 0x1002    	| 0x73A2    	|                                                     	|
| 0x1002    	| 0x73AB    	|                                                     	|
| 0x1002    	| 0x73BF    	| Navi 21 [Radeon RX 6800/6800 XT / 6900 XT]          	|
| 0x1002    	| 0x73A3    	| Navi 21 [Radeon PRO W6800]                          	|
| 0x1002    	| 0x73E3    	|                                                     	|
| 0x1002    	| 0x73FF    	| Navi 23 [Radeon RX 6600/6600 XT/6600M]              	|
| 0x1002    	| 0x73E0    	| Navi 23                                             	|