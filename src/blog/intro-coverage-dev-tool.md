---
title: A small introduction to Chrome's coverage tool
date: 2025-03-14
topics:
  - performance
description: This blog post explores how to use Chrome's Coverage tool.
keywords:
  - performance
---

## Introduction

I recently discovered Chrome's Coverage tool and thought I would write a small post about it. The Coverage tool aims to help you find unused JavaScript and CSS on a page. If you are trying to optimize your website, loading less JavaScript or CSS can be a good first step. Let's have a look at how to use it!

## How-to

To test a web page, open your DevTools in Chrome:

- On Mac: `COMMAND + ALT + I`
- On Windows/Linux: `Ctrl + Alt + I`

Next, open the command menu:

- On Mac: `COMMAND + SHIFT + P`
- On Windows/Linux: `Ctrl + Shift + P`

Type "Start coverage" and select "Start instrumenting coverage, and reload the page". This command will open the Coverage panel and reload your page. You will then see a list of all the JavaScript and CSS files loaded on your page and the percentage of unused bytes for each file. Click on any file in the list, and Chrome will open it in the source panel, highlighting the unused code in red.

## Bonus: A Walkthrough

While Chrome's Coverage tool helps identify unused code, the steps to clean it up will vary depending on your project. To give you a real-world example, I recorded a short walkthrough showing how I used it on this very blog.
In the video, I analyze my site, find some unnecessary JavaScript code, and clean it up. Check it out below!

<iframe width="560" height="315" src="https://www.youtube.com/embed/w-iu4Ls2Kys?si=RwAzD5jdLbGKxAFl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Resources

- [Chrome's documentation on the Coverage tool](https://developer.chrome.com/docs/devtools/coverage/)
