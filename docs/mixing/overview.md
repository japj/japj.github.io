---
description: In this section, we will learn about the different types of mixes.
---
# Overview

:::note
This overview uses Soprano, Alt, Tenor, Bass (SATB) parts to demonstrate the different types of mixes.
:::

Here are some common types of mixes:

## Total
This is the complete song, with all the voices.
  ```mermaid
  graph TD;
    Soprano-->Mix;
    Alt-->Mix;
    Tenor-->Mix;
    Bass-->Mix;
  ```

## Part alone
This is a mix containing only one Part (e.g. Soprano) in isolation.
  ```mermaid
  graph TD;
    Soprano-->Mix;
    Alt;
    Tenor;
    Bass;
  ```

## Part predominant
This is a mix where one Part is louder (predominant) than the other parts and allows you to still hear the complete arrangement.

  ```mermaid
  graph TD;
    Soprano--|100%|-->Mix;
    Alt--|25%|-->Mix;
    Tenor--|25%|-->Mix;
    Bass--|25%|-->Mix;
  ```

  There is also a variation where the stereo mix has the Part and Rest split.

  ```mermaid
  graph TD;
    Soprano-->Left["Left Channel"];
    Alt-->Right["Right Channel"];
    Tenor-->Right;
    Bass-->Right;
    Left-->Mix;
    Right-->Mix;
  ```

## Part missing (or Minus-One)
This is a mix where the Part is missing, but the other parts are present and this allows you to "sing along" with rest of the arrangement
  ```mermaid
  graph TD;
    Soprano;
    Alt-->Mix;
    Tenor-->Mix;
    Bass-->Mix;
  ```




