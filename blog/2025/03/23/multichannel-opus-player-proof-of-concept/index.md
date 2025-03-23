---
title: Learning Track Player - POC
authors: japj
tags: [choir, llms]
draft: true
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 5
---
import MultiChannelOpusPlayerPoc from '@site/src/components/MultiChannelOpusPlayerPoc'

I build a Proof of Concept (POC) Multi-Channel Opus Player for Learning Tracks

Press the below "Play" button to start playback, and use the volume and panning sliders to change the mix. See the full explanation after the player.

## Player
<MultiChannelOpusPlayerPoc sourceUrl="/experiment/output.opus" showFileBrowser={false} />

<!-- truncate -->

## Overview

This Proof of Concept uses:
- Opus Audio Compression to store the different parts of the learning track in separate channels.
  - The example opus file I generated is 10Mb for 9 channels of data (4 voices, 4 piano and 1 click track)
- Ogg Description Metadata to store the names of the parts of the learning track
- WebAssembly version of the Ogg Opus Decoder
- WebAudio for playback and control of panning & volume

I build this Proof Of Concept with the help of [Claude](http://claude.ai) and [GitHub CoPilot](https://github.com/features/copilot).

## Why?

The inspiration for this POC was re-ignited while working on the [Examples - Custom Playback on Website](/docs/examples#custom-playback-on-website) section of my [Creating Vocal Learning Tracks](/docs/introduction) documentation.<br/>
I already had some past experience with the Opus codec and its support for multi-channel audio.<br/>

:::tip[The idea is simple]
Instead of preparing all the mixes in advance, enable a singer to just choose what mix they want on demand.<br/>
:::

## Using LLMs for the POC

I wanted to get some more practical experience in using LLMs for prototyping software.

There are lot of online talks on AI and LLMs, but until you are actually used it to solve a practical problem it is difficult to really have a better understanding.<br/>

:::warning
You still need to know what you are doing.<br/>The generated code is not always correct and that requires debugging (or re-prompting).
:::

## The first step: Encoding the Learning track

This was my first prompt in Claude:

```text
I am interested in using the opus audio codec multiple channel support as a way 
to store multiple voice parts of a choir arrangement (soprano, alto, tenor, bass). 
The idea is to generate an opus file containing all voices where each voice is 
stored in its own channel. Then during playback it should be possible to decide 
on the final volume and panning of the channels so a listener has the option to 
choose their own custom mix. Give me a short overview of steps to create such an 
opus file using s.wav,a.wav,t.wav and b.wav and also give an overview how to 
playback such an opus file using browser apis. 
As an alternative list what technology could be best used to reach these goals
```

This resulted in (abbreviated version):
- Creating a multi-channel Opus file from separate choir voice recordings is definitely possible. Opus supports up to 255 channels, making it suitable for your SATB (Soprano, Alto, Tenor, Bass) arrangement.
- You can create a multi-channel Opus file using FFmpeg
- Playback using the Web Audio API in modern browsers
- Alternative Technologies

    If Opus doesn't suit your needs, consider these alternatives:

    - WebM with Vorbis or Opus codec - Good browser support, similar capabilities
    - Web Audio API with individual audio files - Load each voice separately and mix them at runtime
    - Stem files (used in music production) - Store multiple tracks in a format designed for remixing
    - WebAssembly audio mixing framework - For more complex real-time processing
    - Ogg Vorbis - Another open audio codec with multi-channel support

    The Web Audio API approach with separate files might actually be easier to implement and gives you more flexibility for custom mixing without having to re-encode.

And after an additional prompt on storing metadata about the channels:

```text
Does opus have a way to store metadata about each channel to store the voice name?
```

After a while I ended up with an ffmpeg commandline to encode my input files:

```sh
ffmpeg -i ./data/shower-the-people/S.wav -i ./data/shower-the-people/A.wav -i ./data/shower-the-people/T.wav -i ./data/shower-the-people/B.wav -i ./data/shower-the-people/S-P.wav -i ./data/shower-the-people/A-P.wav -i ./data/shower-the-people/T-P.wav -i ./data/shower-the-people/B-P.wav -i ./data/shower-the-people/Click.wav \
-filter_complex "[0:a][1:a][2:a][3:a][4:a][5:a][6:a][7:a][8:a]amerge=inputs=9[aout]" \
-map "[aout]" -c:a libopus -b:a 288k -mapping_family 255 \
-metadata comment="Channel order: S, A, T, B, S-P, A-P, T-P, B-P, Click" \
./data/shower-the-people/output.opus
```

## Oops: Opus Mapping Family 255

Now that I have this `output.opus` file containing all the tracks, it is time to see if I can also actually playback the audio in the browser.
And this is where I ran into a problem, because I couldn't get the generated opus file loading correctly using the `audioContext.decodeAudioData` method.

:::danger[Error]
Error loading audio file: EncodingError: Decoding failed
:::

I confirmed I could open the file in [Audacity](https://www.audacityteam.org), but it didn't work from the browser. And I believe this is because of the `mapping_family 255` option that I actually used because I needed 9 channels.<br/>
The other mappings mostly relate to surround sound where channels have a specific location meaning (front left, front center, side left, rear right, etc).

From the [Ogg Encapsulation Specification - Channel Mapping Family 255](https://www.rfc-editor.org/rfc/rfc7845.html#section-5.1.1.3)

:::info[Channel Mapping Family 255]
Allowed numbers of channels: 1...255.  No defined channel meaning.

Channels are unidentified.  General-purpose players SHOULD NOT
attempt to play these streams.  Offline implementations MAY
deinterleave the output into separate PCM files, one per channel.
Implementations SHOULD NOT produce output for channels mapped to
stream index 255 (pure silence) unless they have no other way to
indicate the index of non-silent channels.
:::