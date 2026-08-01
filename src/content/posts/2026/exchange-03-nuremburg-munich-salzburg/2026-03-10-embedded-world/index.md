---
title: "Embedded World"
timestamp: 2026-03-09T00:00:00Z
locations:
  - name: "Embedded World venue"
    country: "Germany"
    city: "Nuremberg"
    city_slug: "nuremberg"
    gps: [49.416511, 11.118636]
    gps_source: manual
    gps_granularity: venue
    gps_confidence: high
    gps_query: "Nürnberg Messe, Nuremberg, Germany"
events: ["embedded-world-2026"]
tags: ["exchange-03-nuremburg-munich-salzburg", "germany", "nuremberg"]
draft: false
---

A few people thought I'm from STM🤡 because I put ST Engineering on my tag

# Worthwhile

Embedded World was a rather worthwhile experience
There's a lot of stuff I got to know about

By it's nature I knew I was signing up for a business conference (and I liked and got something from BlackHat - without BlackHat there would be no Hackbadge)
There were exhibitions but I feel that to really enjoy it you have to be aiming to get something out of it, not just walking around (which leads to meaningful meetings and discussions) 

To make things more interesting I had a few goals
1. To learn more about SoMs - exploring for my FYP
2. Explore other MCU makers - They're all the same AI IoT stuff
3. Maybe find intern idk - none hiring so I give up

There's a fair bit of insights I got so I'll try to consolidate by topic, but image dump in chronological order lol (keeping things interesting)

# The later

**Embedded World Reflections**
From what I see Embedded World covers basically all parts of the embedded stack including
1. Chip/ PCB Design
2. Manufacturing
3. Sensors (MEMS, Motion, Camera) 
4. Power Components (Buck Boost) 
5. Controller ICs (BMS, ADC etc. )
6. Compute  
7. Software (GitLab, Jetbrains, STM32Cube, Eclipse)
8. Consulting

# Compute

Compute is where it gets really interesting
1. Microcontrollers
2. MCU Boards
3. Single Board Computers (SBCs)
4. System on Module (SoM)
   - Can be ARM or Intel
5. Full on motherboards
6. Cased Industrial PCs

Add a whole bunch of AI, NPU, accelerators and FPGAs and you have the state of compute in embedded world

I was surprised at the number of consultancy services
1. Chip Design Consultancy
2. PCB
3. Embedded Software etc. 

This lines up with distributors who also had a presence there like DigiKey etc. 

Notable companies 
1. Collabora - Integrate open source into enterprise
2. AVNet - AI acceleration, Windows IoT Distribution
3. Farnell/Mouser - Gave me a free dev kit lol

# Sensors

I was pleasantly surprised to see motion sensors and all sorts of things

Same things with power boost buck chips components and stuff

The hot thing is Cameras with cheap, high resolution, and AI embedded
Maybe a notable one is Onsemi?
Verisilicon has cool IPs also.

# Tooling

Rather standard
- some Agentic AI here and there

Mainly AI stuff here seems to be about inference and application on CV, maybe LLMs at higher performance level

Zephyr and Jetbrains and GitLab were there but nothing special

I think Analog Devices had some digital stuff which was surprising, but they have new analog tools for analog frontend stuff.
Man I should do more analog

# Security

A fair bit on algorithm accelerators.
A LOT on Post Quantum, but idk if its fluff or real, not convinced by explanayion
OTA updates stuff

Then there's CHERIoT, a secure chip architecture, memory safe stuff

And also there's the CRA (some law) now so security now is a selling point


# FPGAs
A lot of the FPGA demos are
1. Edge AI
2. Fast Networking
3. Demos to interface with a fast device (Camera, Display, multiple cameras
4. Security - Post Quantum Cryptography
5. DSP? Maybe some RF SDR but not really

AMD was mainly focused on showing of integrated solutions with Ryzen/ Zynq.
Altera was showing all sorts of demos, big player.

Gowin showed off some interfacing demos.
- their Avero 7 FPGA had SERDES and ip block ISP - Camera

Lattice was mainly interfacing
- I think they want to be a medium player in FPGAs, working with other FPGAs

There are also AI accelerators and stuff, PCIE, quite standard

# Microcontrollers

A lot of the MCU demos are
1. Power Monitoring
    - Get Statistics (STM, Nordic) 
2. Networking
    - Ethernet? 
    - some wireless
    - PLCs!!! People were advertising how you can make PLCs with their devices
3. Peripherals
    - Bluetooth Audio Stack
    - Keyboards etc. 
4. Security
    - Post Quantum Firmware Verification 
    -  OTA updates 
    - Communication Protocols 
5. Media/HMI
    - Terminals
6. Software Stack
    - HUxelerate Virtual MCU Platform
    - Analog Devices Multicore evaluation thingy
7. DSP/Camera Edge AI Stuff - A lot of camera demos

A lot of use cases were
1. Automotive - There's a lot
2. Asset Tracking
3. Peripherals 
4. Robotics
5. Camera/ Manufacturing uses 

I didn't know STMicro made more than MCUs, they make GAN drivers for Motors, BMS, Current Sensing etc.
By extension a lot of mcu chip companies (eg. Rockchip) went on to also make
1. Network switches

A huge topic was really Camera, ISP and NPU and YOLO models

SBCs and Compute Modules and Motherboards I really kinda got lost in the end, it's really a sea of modules

But at least the connectors are still standard, the COM HPC, SMARC and related sizes

It didn't really feel like they were pushing any boundaries except maybe AMD Ryzen AI P100 - vLLM real time

There's a lot but the main companies that stood out to me are
1. TRIA
2. Advantech - looking into SBCs there
3. Asus, Gigabyte - Well known brands
4. Adlink

There's a lot and all very similar Demos quite hard to differentiate

By extension there is a LOT of dev kit makers for MCUs and FPGAs, almost too much

# Others

Others
1. Chip Design Space
	- mainly tooling + sample IPs
	- Google silicon - Open Se Cura
	- lowRISC
	- Alibaba Risc V IP cores 
2. ISPs

There were a fair bit on Software Defined Cars
- NXP
- TI
- Automotive Grade Linux by extension

What I didn't see a lot were big data centers, which makes sense tbh, so the tooling is really geared towards the edge

# Conclusion 

OK that's it for Embedded World.
Not sure what to take from it, it's very good for exposure and networking with business people to best find the product that suits your use case.
Not too sure what I'll take from it, as an event it's like Blackhat, engagement wise (without the badges) and unlike blackhat I didn't social engineer them for merch enough but I got 2 Dev kits so I'll take it.
Maybe I'll explore more in the ecosystem and get new project ideas, seems like it really helps edge AI

I'll have wanted to do more in Nuremburg but Embedded World was that big and the timeline was quite tough (the math quiz that I bombed was right before it) 
 - Aldstast was vibey 
 - maybe if I'm nearby hopefully I'll drop by the Nazi historical Sites or Museum etc. 
