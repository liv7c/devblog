---
title: Getting started with tmux
date: 2022-02-05
topics:
  - tmux
description: tmux is a great tool to make your dev life easier. It enables you to manage multiple sessions, terminal windows, and panes from one terminal screen. This blog post will look at how to configure it and at some of the cool things we can do with tmux.
keywords:
  - tmux
---

Apart from its cool name, tmux is also a great tool to make your developer life easier. In this post, we'll look at the purpose of tmux and some basic terminology. We'll write a tmux configuration that is enough to start using it and look at the most common commands.

## Why use tmux?

Have you ever gotten lost switching between a tab in iterms where you run your tests while another tab runs your application (and a third one runs the backend)? Or do you have to work with a couple of repositories at once and have multiple terminals opened at the same time? tmux is a terminal multiplexer. The whole purpose of tmux is to make your life easier running and switching between different programs in one terminal.

## Some basic terminology

Let's look at different critical terms before diving deeper into using and configuring tmux.

A session in tmux gets created when you start tmux in your terminal. You can run multiple sessions at once (though only one is visible at a time, the others will be detached). Each session contains its own set of windows and panes.

A window is your entire terminal window. A pane is what you create when you split your terminal window vertically or horizontally. Tmux enables you to make those splits and windows with whatever keymap you choose. You can also script it all (see the last section at the end).

A tmux window:

![A tmux window takes up your entire terminal window](/img/tmux-window.png)

A tmux pane:
![Example of a tmux pane in tmux, splitting the tmux window in half vertically](/img/tmux-pane.png)

## Installing tmux and running it

First, make sure you have tmux installed on your system. Check out [the tmux official wiki](https://github.com/tmux/tmux/wiki/Installing) for all the information you need to install it properly. Once installed, you can check that everything is working by running the command `tmux` in your terminal. You should be in a tmux session. To exit it, type `exit` and enter.

## Configuring and using tmux

Now it is time to configure tmux (just a little bit) and explore some cool things we can do with it. First, let's create a `.tmux.conf` file in your **root directory**. This is the configuration file tmux will load when you launch it.

```shell
touch ~/.tmux.conf
```

### Testing your config

The goal of configuring it is to find what works for you. I'd recommend writing the tmux config while being in tmux so that you can test it out as we add new things to it. If you are inside tmux, just like a bashrc, you need to source your tmux config as you make changes for it to take effect.

If you're inside tmux, you can source your updated config in command mode. Run `<ctrl-b>:` (ctrl b followed by a colon). You should see the bottom bar changing. Enter `source-file ~/.tmux.conf` and your configuration should be loaded. Let's add a custom keymap to our configuration to do this quicker:

```bash
bind r source-file ~/.tmux.conf\; display "config reloaded"
```

`bind` is our way to tell tmux that `r` preceded by the prefix key should source the tmux config. By pressing `<ctrl-b>` followed by `r`, this will reload your config without leaving tmux. Don't forget to source your config one last time in command mode before trying out this command. This key combination might feel very awkward. So let's move on to choose a better prefix.

### Choose a prefix you're comfortable with

The whole point of tmux is to have keyboard shortcuts that work for you. tmux has a set of default keymaps to create windows, new panes, switch between sessions, etc. Each keymap uses a `prefix`. You can think of it as the `leader` key in vim. You combine the prefix with another key to interact with tmux and ask it to do something. By default, the prefix is `C-b` (ctrl-b). If you like this prefix, you can move on to the next section. A popular alternative is to use `C-a` as the prefix.

Add this to your tmux config:

```bash
# in your ~/.tmux.conf
# Setting the prefix from C-b to C-a
set -g prefix C-a
# free original prefix keybinding
unbind C-b
# make sure we can send C-a to other apps
bind C-a send-prefix
```

- `set -g prefix C-a` will tell tmux every time it runs `control+a` as its prefix.
- `unbind` is to free `C-b` and keep only one combination as our prefix.
- `bind C-a send-prefix` is to make sure you can use this keymap in programs running inside of tmux. For instance, if you use vim and do not include this line, any of your vim keymaps using `C-a` would no longer work inside tmux.

### A small note before going further

In the rest of the article, I'll be writing `<PREFIX>` often followed by a letter to explain the different commands you can use in tmux. `<PREFIX>` is whatever prefix you choose to use (for instance, `Ctrl-a`).

### Creating windows and panes in tmux

Generally, after setting up the `prefix` in the tmux configuration, it is very common also to customize the keymap to create new panes (vertical or horizontal splits in a window) and navigate between those panes. In your `.tmux.conf`, add:

```bash
# below your prefix config
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %
```

Let's dissect these few lines.

- By default, to create a horizontal split, you would use `<PREFIX>"` (`C-a` followed by a double quote `"`). Instead, we bind `-` to create a horizontal split. You can create a new pane in your window using your prefix followed by `-`.
- For a vertical split, the keymap is by default `<PREFIX>%`. A popular replacement is to use `|` instead. It might also be easier to remember. You can now type `<PREFIX>|` to create a vertical split.

The default keymap is `<PREFIX>c` to create a new window.

If you want to test these keymaps, reload your config (`<PREFIX>r`).

### Navigating between panes and windows in a tmux session

To navigate between your windows, there are three main ways:

- `<PREFIX> n` to go to the next window
- `<PREFIX> 1` to go to a particular window. Every window has a number. It starts at 0.
- `<PREFIX> w` to have an interactive list of all your windows with a preview of what contains each window.

A popular option to navigate between your panes is to use the same keys as in vim (`k` to go up, `j` to go down, `h` to go to the left pane, `l` to go to the right pane). Let's add this to our `tmux.conf`

```bash
# in your ~/.tmux.conf
# map direction keys for vim like experience
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
```

I also use the vim keys to resize the panes.

```bash
# in your ~/.tmux.conf
# resize panes with repeated key
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5
```

But if you do not care about vim, you can use `<PREFIX>` followed by the arrow key to move your cursor to a particular split.

### Creating sessions and naming sessions

Earlier, I mentioned that you could have multiple sessions with their own set of windows and panes (and processes running). When you start tmux, you create a session at the same time. My go-to commands to manipulate sessions in tmux:

- `tmux new-session -s coding` to start tmux and create a "coding" session.
- If you are already in a tmux session and wish to create a new one, you can run `tmux new-session -s processes -d`. The `-d` is essential here. It will make that session in detached mode.
- To switch between sessions, you can use `<PREFIX>(` to go to the next session or `<PREFIX>)` to go to the previous session.
- You can also use an interactive list (like for the windows) by pressing `<PREFIX>s`. Press `q` to leave the interactive list.
- To rename your current session, use `<PREFIX>$`.

### Detached mode

One great functionality is to run processes in the background using tmux detached mode. You can always re-attach to a session later on.

If you are always in tmux, you can essentially leave tmux momentarily while not killing any processes by pressing `<PREFIX>d`. It will send whatever tmux session you're on in the background. You can reattach this same session to run `tmux attach-session` (or `tmux a`).

If you have several tmux sessions running in detached mode, you can also attach to a particular session directly. Use `tmux a -t NAME_OF_YOUR_SESSION`. `NAME_OF_YOUR_SESSION` will be your session name.

### Closing a tmux window and stopping all tmux processes

One significant point of attention is to make sure you do not forget a tmux session that runs in the background. `tmux ls` is an excellent command to remember. It will list all your tmux sessions and show you when they were created.

When it comes to quitting a window or pane, here's my list of essential commands:

- To kill a window or pane, `<PREFIX>x` (`ctr-a x` in my case).
- You can also use `<PREFIX>&` to kill a window.

When it comes to killing a session in tmux, I generally kill all sessions simultaneously. I first leave tmux by pressing `<PREFIX>d`. It will send all sessions in detached mode. tmux still runs but in the background. If you do a `tmux ls`, you'll still see all of your sessions. I then do `tmux kill-server` (be careful because it will essentially kill all sessions and processes running in tmux).
If you want to kill one specific session, leave `tmux` (`<PREFIX>d`) and then type `tmux kill-session -t NAME_OF_SESSION_TO_KILL`.

### Scrolling in your tmux buffer

There is a mode called `copy mode` in tmux. You enter it by pressing `<PREFIX>[` (and quit it by pressing `ENTER`). After pressing `<PREFIX>[`, you can then move in your buffer with your arrow keys. You can also use vim keys in copy mode (like `b` and `w` to move from one word to another, `gg` ) if you enable vim keys in your config.

```bash
# in your ~/.tmux.conf
# enable vi key bindings
setw -g mode-keys vi
```

### Searching in a tmux buffer

Here are the steps if you are searching for something in your current buffer:

1. Enter copy mode `<PREFIX>[`.
2. Press `?` if you want to search for an element above your current position in your buffer. Or you can press `/` to search down.
3. Type the element you are searching for.
4. Press `n` to move between the found occurrences.

### Help in tmux

If you forget how to do something in tmux, tmux has a help menu with a list of the keymaps. Type `<PREFIX>?` to enter it (and `q` to exit it).

### Colors in tmux

To have your colors work properly in tmux in programs like vim or emac, add this to your config:

```bash
# Configure color for terminal
set -g default-terminal "screen-256color"
```

### Extending tmux with plugins

There is a plugin system to extend tmux. If you feel like adding some plugins, you need to install `tpm` (tmux plugin manager). You can find all the installation information [in the Github repository](https://github.com/tmux-plugins/tpm). Once you've installed it, you can add some plugins to your tmux config. You should add all the plugin related stuff **at the very end of your config.**

Here's what I have in my config:

```bash
# at the very end of ~/.tmux.conf
set -g @themepack 'powerline/default/cyan'

# set up plugins
set -g @plugin 'tmux-plugins/tpm'
# theme
set -g @plugin 'jimeh/tmux-themepack'

# Initialize TMUX plugin manager
# keep this line at the very bottom of tmux.conf
run '~/.tmux/plugins/tpm/tpm'

```

Instead of configuring it by hand, I added `tmux-themepack` to style the bottom bar.

## Scripting tmux with tmuxinator

At this point, we have a working tmux config and a set of keymaps we are comfortable with to create windows, sessions, and move in our terminal. What gives tmux an extra edge over using built-in tabs in your terminal (if you have those) is automating things. If you open your terminal every morning to launch the same programs and create the same tmux sessions, you can create a script and launch everything in half a second.

[tmuxinator](https://github.com/tmuxinator/tmuxinator) is a great tool to create scripts quickly. Let's create an example script together to get the ball rolling for you. Let's start a project called "work".

First, we launch tmuxinator by typing `tmuxinator new work`. Let's modify the newly created config:

```yaml
# /Users/yourusername/.config/tmuxinator/work.yml

name: work
# the path you want to launch tmux in
root: ~/projects/devblog

# Controls whether the tmux session should be attached to
# automatically. Defaults to true.
# attach: false

windows:
  - editor: nvim
  - process: npm run dev
```

- `name` will be the name of your script. Once created, when you open your terminal, you can type `tmuxinator work` and it will launch tmux, creating all the windows you mentioned in the script.
- The `windows` property contains a list of the different windows we want to create. It will create two windows: "editor" and the other named "process".
- We then launch `nvim` in the editor window while starting npm in the other window.

If you're into aliases, you can create a quick one for `tmuxinator` (it is a great name, but it can be a long one to write).

```bash
# in your ~/.bashrc
alias tx="tmuxinator"

# I also have an alias for tmux cos I'm lazy :)
alias tm="tmux"
```

## Conclusion and great resources

We've explored tmux and how to configure it and use it. We finished the article by writing a small script that is only a glimpse of all the cool things we can do with tmux. Here's my list of all the cheatsheets, documentation, and books to get extra comfortable with tmux:

- [Getting Started with tmux/tmux Wiki](https://github.com/tmux/tmux/wiki/Getting-Started)
- [Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com/)
- One of the best books on tmux: [tmux 2: Productive Mouse-Free Development by Brian P. Hogan](https://pragprog.com/titles/bhtmux2/tmux-2/)
- [Tmuxinator](https://github.com/tmuxinator/tmuxinator)
- [Video on tmux by ThePrimeagen](https://www.youtube.com/watch?v=NZO8KjNbwJk)
- [GitHub - liv7c/dotfiles: Personal config for bash, tmux, git, and neovim](https://github.com/liv7c/dotfiles): my custom config if you feel like taking a look (definitely a work in progress)

I hope this guide will be helpful to you. If you have any questions, you can reach me on [Bluesky](https://bsky.app/profile/oliviac.dev).
