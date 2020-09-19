---
layout: page
title: Get Started
permalink: /get-started/
redirect_from:
  - /source-code/
  - /downloads/
---
Building from source code requires some more knowledge about the project,
as it's split in multiple components. Which component you want to tinker
with will affect what you need a bit.

Here's a short overview:
* **Uno**: A programming language (and
  [a compiler][1]), which is a dialect of [C#][2]. Unlike the traditional
  C# development tools, Uno generates C++ code that can be compiled with
  the normal native development tools (Android Studio and Xcode).
* **UX**: An XML-based declarative UI language. This is implemented in the
  [Uno compiler][1].
* **Fuselibs**: [An application framework][3]
  written in Uno, that implements the core of the Fuse development platform.
  The Fuselibs components are intended to be used from **UX**. Fuselibs
  depends on the [Uno compiler][1].
* **Fuse Studio** (sometimes referred to as just "Fuse"): This is the
  [WYSIWYG editor][4] for UX-based applications. Fuse Studio depends on
  [Fuselibs][3] and [Uno][1].

These components are written to be as independent of each other as we've
managed, and in general you can build the code in each repository
independently and get useful restults. However, most users are probably
going to want to work with all of these repositories checked out
side-by-side, so they can modify any compoent and get the desired
results.

There's documentation for this spread a bit around the place. Fuselibs
[documents how to coexist][5] with Fuse. Uno [documents how to coexist][6] with
Fuselibs.

[1]: https://github.com/fuse-open/uno
[2]: https://en.wikipedia.org/wiki/C_Sharp_(programming_language)
[3]: https://github.com/fuse-open/fuselibs
[4]: https://github.com/fuse-open/fuse-studio
[5]: https://github.com/fuse-open/fuselibs/blob/master/README.md#fuse
[6]: https://github.com/fuse-open/uno/blob/master/docs/configuration.md#standard-library

# Download Fuse Studio

You can download the latest installer from <a href="https://github.com/fuse-x/studio/releases" target="_blank">here</a>.

For Fuse 1.10 and older releases, please see <a href="https://github.com/fuse-open/fuse-studio/releases" target="_blank">here</a>.

For Fuse 1.8 and older releases, please see <a href="https://github.com/fusetools/fuse-releases/releases" target="_blank">here</a>.
