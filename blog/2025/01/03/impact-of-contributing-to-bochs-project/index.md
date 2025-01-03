---
title: The unexpected impact of contributing to the bochs project
authors: japj
tags: [opensource]
---

I have contributed to several opensource projects through the years. 
Typically driven by running into an issue or a missing feature and an interest and (spare) time in contributing.
This is a great way to learn to work together and learn from other people, improve your own skills and give back to a project in a useful way.

And you also might leave behind something that has an unexpected impact...
<!-- truncate -->

Somewhere around 1997/1998/1999 I was active in the Dutch [Demoscene](https://en.wikipedia.org/wiki/Demoscene) with a small group.

This was the time of MSDOS and I got very familiar with the Vesa Bios Extension (VBE), 
which allowed access to the video memory Linear Frame Buffer (LFB) from 386 protected mode.
This is relevant because it allowed fast access to a full 320x200x8bit video mode for displaying (real-time) graphics.

As my interest grew into running different operating systems (including Linux), I also got interested in being able to run
old demoscene productions on my computer through a PC emulation project called [Bochs](https://bochs.sourceforge.io).

I think at the time (around 2002) there was a Cirrus VGA emulation, but it had some limitations with available graphic resolutions.
The biggest issue: it did not have any support for VBE LFB video modes, so you could not run anything needing it.

But since Bochs (and the used [VGABIOS](https://github.com/bochs-emu/VGABIOS)) are opensource, I spend a some time in 2002 adding support for VBE and LFB.

There were 3 parts:
- the VBE DISPlay ioport API [VBE_DISPI](https://github.com/bochs-emu/VGABIOS/blob/master/vgabios/vbe_display_api.txt)
- the VGABIOS that applications talk to in order to change the current video mode (and that uses VBE_DISPI ioports)
  - this is actual 16 bit bios code that runs in the guest (virtualized) system
- the Bochs hardware emulation that implemented the VBE_DISPI ioports and displayed the actual graphics
  - this is "normal code" that runs on the host computer

Once this was working well enough, it was kind of "problem solved", and I stopped contributing to Bochs/VGABIOS because of other interests.

But because it is all opensource, it had a life on its own and at some point (a few years) later I ran into parts of this being used in [Xen](https://xenproject.org) and [Qemu](https://www.qemu.org).

Which is crazy in a way to realise (since I was not expecting me to have such an "impact").



