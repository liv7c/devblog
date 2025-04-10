---
title: Using Vim with VSCode
date: 2022-01-03
updated: 2025-04-10
topics:
  - vim
description: Blog post sharing some tips about using Vim with VSCode
keywords:
  - vim
---

In this post, I’ll share tips on using the Vim plugin in VSCode. It’s an excellent way to explore a different editing style and get a feel for Vim without leaving your current setup. The plugin provides access to Vim’s modes and motions with minimal configuration.

I originally started using Vim to rely less on my mouse, and it’s made a huge difference. These days, I regularly switch between VSCode (with the Vim plugin) and Neovim, and having Vim baked into my daily workflow makes that back-and-forth feel seamless. Plus, editing with Vim is fun! If you're considering trying it, let’s dive in.

## Installation

First, install the plugin [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim). Once you relaunch your code editor and open a file, you’ll see `NORMAL` in the bottom bar - one of Vim’s modes. Your cursor will also look a bit different.

![Zoomed-in view of a VSCode status bar with the Vim plugin activated. The current Git branch is displayed, along with a cross icon and a warning triangle icon, showing a zero count. The "NORMAL" Vim mode is highlighted with a marker, making it clear where it appears in the status bar.](/img/vscode_status_bar_vim_mode.png)

## Remember Vim and its modes

Vim has several modes, each with its keyboard shortcuts and motions. The four most common are:

- **Normal mode** (also called "Command mode"): This is the mode you'll use most of the time. In Normal mode, you can navigate your file with commands like `g` and `gg`, search for text (e.g., `/Gary` to search for that name), and more.
- **Insert mode**: This is where you write text. To enter Insert mode, press `i`. You’ll use this mode whenever you want to add or modify code.
- **Visual mode**: This mode is the equivalent of selecting text with your mouse. To enter Visual mode, press `v`. You can select an entire line by pressing `V` while in Visual mode.
- **Last line mode**: Access this mode by pressing `:`. It allows you to run commands like opening a file (`:e` filename), saving a file (`:w`), and exiting Vim (`:q`).

## Learning vim

If you're new to Vim, `vimtutor` is an excellent resource to get started. It’s an interactive tutorial that covers the basics and helps you become comfortable with the editor. Once Vim is installed on your computer, you can access the tutorial anytime by typing `vimtutor` in your terminal.

Additionally, I highly recommend this [Youtube playlist](https://www.youtube.com/playlist?list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R) by the Primeagen. This series of videos provides practical insights and tips to help you get comfortable with Vim more quickly.

## Basic settings

Now that you have Vim installed and running, let’s configure it to fit your workflow. To improve your Vim experience, you can customize a range of settings, like the leader key or enabling relative line numbers.

In traditional Vim, you configure Vim settings in a `vimrc` file, where you define key mappings, plugins, and various preferences. In VSCode, you can enable a similar setup using the `vim.vimrc.enable` setting, which allows you to use a vimrc file to configure your Vim plugin. However, I prefer configuring Vim settings directly within VSCode’s settings.json, as it feels more integrated with the VSCode environment.

The **leader key** in Vim is combined with other keys to create custom keyboard shortcuts, especially in normal mode. As you get more comfortable, you’ll likely create "remaps”, shortcuts for common actions like toggling the sidebar or quickly switching between files.

In VSCode, you can define your shortcuts and pick a leader key, with `,` and `space` being popular choices. Feel free to experiment and see what works best for you.

Here’s how I configure my Vim settings in `settings.json`:

```json
// settings.json
{
  "vim.leader": " ",
  "vim.hlsearch": true,
  "vim.useSystemClipboard": true,
  "vim.smartRelativeLine": true
}
```

- `"vim.leader": " ",`: Sets the spacebar as my leader key, which triggers custom keyboard shortcuts.
- `vim.hlsearch`: Highlights search results when you search with `/` in normal mode, making it easier to spot matches.
- `vim.useSystemClipboard` Ensures you can copy and paste between Vim and your system clipboard (no need to use extra commands like `*y`).
- `vim.smartRelativeLine`: Displays the current line number and other line numbers relative to your position. This speeds up navigation and makes it easier to jump between lines. For example, `2k` will take you two lines up from where you are. This one was a life-changer for me!

## Creating custom shortcuts

Remaps are the secret sauce when using Vim as your primary code editor. They allow you to associate the actions you often perform with keyboard shortcuts. In VSCode, you can add custom shortcuts in your `settings.json`. The Vim plugin allows you to add custom keybindings per mode:

- **vim.normalModeKeyBindingsNonRecursive**: Custom keybindings for Normal mode.
- **vim.visualModeKeyBindingsNonRecursive**: Custom keybindings for Visual mode.
- **vim.insertModeKeyBindingsNonRecursive**: Custom keybindings for Insert mode (I don’t use this, but it's available).

Here are some of my shortcuts:

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
      "commands": ["fuzzySearch.activeTextEditor"]
    }
  ],
```

### Breaking down the commands

- `before`: This is the key combination you press to trigger the action. Each key combination is an array of keys you press in sequence. For example, `<leader> + n` means pressing the leader key followed by the letter n.
- `commands`: These are predefined VSCode actions or commands triggered by your custom keybinding. You can assign these to do anything from toggling visibility to renaming files.

For example, I use the `rename` action quite a lot. It is usually triggered by `F2`, but I found that shortcut awkward. So, I created a custom shortcut with `<leader> + r + r` that feels more comfortable and matches a keymap I have in Neovim.

### A few favorite custom keymaps

In my `settings.json`, I have a few favorite keymaps:

- **Toggle Sidebar visibility**: `<leader> + n` toggles the sidebar visibility. I use this one quite often.
- **Rename**: `<leader> + r + r` saves me some time since I don't often use the function key.
- **Show Hover information**: `K` shows detailed hover information for a function or variable. This is the keyboard equivalent of hovering over a function or variable with your mouse.

### Keymaps using extension capabilities

You can get quite creative when defining your keymaps. You can leverage some extensions you've added. For instance, I have custom keymaps for:

- **Renaming a file**: `<leader>+r+f` renames the current file using the [file util extension](https://marketplace.visualstudio.com/items/?itemName=sleistner.vscode-fileutils).
- **Fuzzy search**: `<leader> + p + s` triggers a fuzzy search in the active text editor using the [fuzzy search extension](https://marketplace.visualstudio.com/items/?itemName=jacobdufault.fuzzy-search).

### Explore and customize

It can quickly become a rabbit hole, but that's part of the beauty of using Vim. There is [complete documentation](https://code.visualstudio.com/docs/getstarted/keybindings) of all the existing keybindings in VSCode. A good exercise is to review the default keybindings and see if there are any you commonly use that could be further customized or improved.

## Extending Vim power with some plugins

Vim in VSCode supports several built-in Vim plugins that enhance what Vim can do.

One plugin I highly recommend enabling is `vim-surround`. It makes working with brackets, quotes, and tags much faster. You can quickly change or delete surrounding characters with just a few keystrokes.

To enable it, go to your settings and search for `Vim: Surround`. You'll see a checkbox to turn it on.

![Settings menu open in VSCode. "vim surround" is entered in the search input. There are three settings found. The first is a checkbox to enable the Surround plugin for Vim. The second result is an option to customize the Status Bar color in surround input mode. The third setting is to include surrounded spaces. Both the first and the third checkbox are checked.](/img/vim-surround-plugin-vscode.png)

Once enabled, here are a few examples of what you can do while in normal mode:

- Change single quotes to double quotes: `cs'"`
- Rename an HTML tag: `cst`.

It's a small plugin, but once you get used to it, it'll feel like a must-have! You can check out more examples in the [official documentation](https://github.com/tpope/vim-surround).

## Some of my favorite Vim motions

One of the first big challenges when getting started with Vim is to try to stay in Normal mode as much as possible. This is the key to becoming fast and efficient with Vim.

Here are some of my go-to motions in Normal mode:

- `gg`: Jump to the top of the file
- `G`: Jump to the bottom of the file
- `f` and `F`: Move to a specific character on the current line (f searches forward, F searches backward). For instance, in the line Hello there, typing `ft` from the start of the line moves your cursor to the `t` in there.
- `zz`: Center the current line in the viewport
- `0w`: If you're mid-line or at the end, this brings you back to the start of the line, then moves to the first word
- `D`: Delete everything from your cursor to the end of the line
- `dd`: Delete the entire line
- `cc`: Delete the line and immediately enter Insert mode on the same line
- `<number>k` or `<number>j`: Move up or down multiple lines
- `cit`: When editing HTML, this puts you into Insert mode inside a tag and deletes the existing content (Small warning: this is very powerful but will remove any current content inside the tag!)
- `u`: Undo your last action (a lifesaver when things don't go as expected...)

Getting used to these motions can be a mental workout at first. However, with practice, they quickly become second nature!

Vim also supports text objects, which makes it easy to edit things like words, quotes, or parentheses, no matter where your cursor is inside them. For example, `ci"` changes everything inside quotes, and `da(` deletes everything around a set of parentheses. It takes some time to get the hang of it, but once you do, the benefits of using Vim become clear!

## Bonus: moving a code block up or down in visual mode

I remember watching a React presentation by Ryan Florence, where I first saw this trick. During the talk, he highlighted a code block in visual mode and moved it up and down without cutting and pasting. If you want to do the same in VSCode with Vim, add these to your `settings.json`:

```json
  "vim.visualModeKeyBindings": [
    {
      "before": ["J"],
      "commands": ["editor.action.moveLinesDownAction"]
    },
	  {
      "before": ["K"],
      "commands": ["editor.action.moveLinesUpAction"]
    }
  ],
```

Now, you can select a block of code in visual mode and move it up with `K` or down with `J`. Awesome stuff!

## Conclusion and further resources

If you're interested in testing out Vim, the plugin in VSCode is a great place to start. Once you're more comfortable with the basics, there are many resources to help you dive deeper into the Vim world:

- [VimTricks](https://vimtricks.com/)
- [ThePrimeagen YouTube channel](https://www.youtube.com/c/ThePrimeagen)
- [Changelog](https://changelog.com/podcast) has some great podcast episodes about vim

My current VSCode settings and keymaps are in my [dotfiles](https://github.com/liv7c/dotfiles/blob/main/vscode/settings.json).

And if you're curious about trying out Neovim, I have a [repo with my current Neovim config](https://github.com/liv7c/nvim-config), which will continue to evolve.

I hope you find this blog post helpful. If you have any questions or want to chat about Vim, feel free to reach out on [Bluesky](https://bsky.app/profile/oliviac.dev) 😀
