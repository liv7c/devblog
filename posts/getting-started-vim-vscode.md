---
title: Getting started with vim with vscode
date: '2022-01-03'
tags:
  - vim
description: Blog post about how to get started with vim using the vim plugin in vscode
keywords:
  - vim
  - vscode
---

Using the vim plugin in vscode is a really good way to try out another way of editing code and get a feel for it. Among the reasons to get started with vim with the vscode plugin:

* You get to dive into using vim, its modes and motions straight away with little to no configuration.  You do not have to spend hours making vim work with your linter and formatter.
* You get comfortable with vim and its text editing experience. You will already have your favorite shortcuts if you decide to use vim as your main code editor.

Nowadays, I use mostly neovim but spending time in vscode getting used to vim was very helpful. If you feel like taking this jump, let's get started!

## Installation

First, let's install the plugin: [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim). Once you relaunch your code editor and open a file, you will normally see on the bottom bar `NORMAL` which is one of vim modes. Your cursor will also look a little different.

### Vim and its modes

Vim has several modes. Each mode has its own keyboard shortcuts and motions. The three most common:

* `normal` (also called `command` mode): this is the mode you should use most of the time. In `normal` mode, you can move around your file using `g` and `gg`, go to a certain line (`:2` to go to line 2), search for a term (`/Gary` to search for that name), etc.
* `insert`: it is the mode you use for writing text. When you want to add some code, you enter the `insert` mode by typing `i`.
* `visual`:  It is the equivalent to using your mouse to select some text. Just type `v` to enter it. `V` to select the whole line in visual mode.
* `last line mode`: you enter it with the `:`. In this mode, you can do things like opening a file (`:e nameOfYourFile`), saving it (`:w`) and exiting vim (`:q`).


## Learning vim

If you are unfamiliar with vim and its modes and motions, `vimtutor` is a great way to get started.

I also cannot recommend enough this [playlist on youtube](https://www.youtube.com/playlist?list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R) by [the Primeagen](https://twitter.com/ThePrimeagen). In this series of videos, you will learn enough to get started using vim in a productive way. They are full of tips and make learning vim less overwhelming by teaching you just enough.

## Basic settings

When using the plugin, you can first customize things like the `leader` key or set up relative line numbers. The `leader` key in vim is the key you use alongside one or more other keys to create a keyboard shortcut most of the time in normal mode. When you start configuring your `vimrc`, people add what is called `remaps`. The whole idea of remaps is to create shortcuts you are very comfortable with to do certain things. You can create a shortcut to toggle the sidebar, go back and forth between your last two files, etc.

In vscode, you can also create your own shortcuts and already choose your leader key. The `,` and `space` are very popular choices for the leader key. Once again, try out a few different keys and see what feels right.

You can add some customizations directly in your `settings.json`. For example, my vim settings are:

```json
// settings.json
{
  "vim.leader": " ",
  "vim.hlsearch": true,
  "vim.useSystemClipboard": true,
  "vim.smartRelativeLine": true,
}
```

* `"vim.leader": " ",` is to use space as my leader key
* `vim.hlsearch` is to highlight the search. When you are in `normal` mode, you can use `/` and search for whatever input in your current file.
* `vim.useSystemClipboard` is a must-have. It ensures that you can copy something in your file and it will store it in your system clipboard (same thing for pasting). By default, vim does not use the system clipboard and it can be a frustrating experience.  If you do not use this setting and want to copy something to your system clipboard, you will have to use `*y`.
* `vim.smartRelativeLine`: this one was a life changer for me to get faster moving around in normal mode. Instead of line numbers, you only see the line number of your current line. The number before every other line is relative to your current position. You can go, for instance, to the line that is 2 lines above your current line doing `2k`.

## Some custom shortcuts

Remaps are the secret sauce when you start using vim as your main code editor. You can associate whatever action you often do to a keyboard shortcut. In vscode, you can already get a feel for some of the customizations you can create.

Some of my shortcuts:

```json
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "n"],
      "commands": ["workbench.action.toggleSidebarVisibility"]
    },
    {
      "before": ["<leader>", "r", "r"],
      "commands": ["editor.action.rename"]
    },
    {
      "before": ["K"],
      "commands": ["editor.action.showHover"]
    },
    {
      "before": ["<leader>", "r", "f"],
      "commands": ["fileutils.renameFile"]
    },
    {
      "before": ["<leader>", "p", "s"],
      "commands": ["extension.fuzzySearch"]
    }
  ],
```

`vi.normalModeKeyBindingsNonRecursive` is to set those shortcuts in vim normal mode only. The `before` property is the keyboard shortcut. You put your keyboard combination in an array. The `command` is what you want this combination to do. You can create shortcuts for some of vscode editor actions. I use the `rename` action a lot (normally works with `F2`) so I created a little shortcut that is easier for me. It can quickly become a little rabbit hole but there is a [whole documentation](https://code.visualstudio.com/docs/getstarted/keybindings) of all the existing keybindings. It is a good exercise to think of which one you commonly use and whether or not you could improve the existing keyboard shortcut.

In the example above:

* `K` is useful to show the definition and the detail about a function or a variable. It is the keyboard equivalent to hovering over a function with your mouse.
* You can also create shortcuts to work with some plugins. I use the `fileutils` plugin and `fuzzysearch`.  `leader r f ` is to rename the current file for instance.



## Extending vim power with some plugins

You can activate a couple of vim plugins in vscode. A vim plugin, just like in vscode, adds some extra functionalities to vim that can be very useful.

The plugin I recommend activating is `vim-surround`. It makes it very easy to manipulate modify. brackets, quotes and other surrounding elements. In your vim plugin settings, you can activate `Vim: Surround`.

Some examples of what it enables you to do:

* You can change single quotes in double quotes (`cs'"`).
* Change a html tag `cst`

Check out the [documentation](https://github.com/tpope/vim-surround) for more tips about vim surround.

## Some of my favorite vim motions

When you get started with vim, try to stay as much as possible in `normal` mode. This is the secret to become fast with vim. Some of the motions I use the most in `normal` mode:

* `gg` to go to the top of the file
* `G` to go to the bottom of the file
* `f` and `F` to move to a certain letter in a line. For instance, if you have the text `Hello there` and you are at the beginning of the line in normal mode, you can type `ft` and your cursor will be on the letter `t` of `there`.
* `zz` to center your current window pane at the line you currently are
* `0w` when you are in the middle or at the end of a line to go back to the beginning of the line
* `D` to delete the rest of the line
* `dd` to delete the whole line
* `cc` to delete the whole line and be directly in `insert` mode on the same line
* a number + `k` and `j` (e.g. `5k`) to move to a certain line
* When editing HTML, `cit` enables you to directly edit the content of tag. You are in insert mode inside of the tag (small warning: if there is some content inside the tag, it will get deleted)
* `u` to undo whatever weird thing can sometimes happen when editing with vim...

## Conclusion and further resources

If you want to test it out, the `vim` plugin in vscode is a great start. If you feel like going further, here are some resources:

* [VimTricks](https://vimtricks.com/)
* [ThePrimeagen youtube channel](https://www.youtube.com/c/ThePrimeagen)
* [Changelog](https://changelog.com/podcast) has some great podcast episodes about vim

