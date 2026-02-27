---
title: 'Improve your Git CLI experience with Git aliases, delta, and custom functions'
date: 2026-02-27
topics:
  - Git
  - command-line
description: Learn how to enhance your Git CLI experience with Git aliases, a better Git pager using delta, and custom shell functions.
keywords:
  - Git
  - bash
---

In this article, we’ll explore various settings we can add to our Git config to make it nicer to work with when using the Git command-line interface. We’ll look at Git aliases, customizing the Git pager, and custom functions you could build on top of Git.
One of the best aspects of using the Git CLI is the number of customizations you can add to match your workflow. The beauty of it is that all those customizations are portable. You can switch editor and your Git workflow stays the same.

## A quick tour of the gitconfig

There are many ways to configure Git. You can configure it at the repository level in the `.git/config` inside of your [local repository](https://git-scm.com/docs/git-config#Documentation/git-config.txt---local). You can also configure Git globally or at the [system level](https://git-scm.com/docs/git-config#Documentation/git-config.txt---system). In this article, we will focus on the global settings. It’s a file located **at the root of your user directory** named `.gitconfig`:

```sh
cat ~/.gitconfig
```

You might remember typing `git config --global user.name "John Doe"` when you first installed Git on your computer. This command creates and writes to your global git config. This file contains several sections with settings you want to set globally and apply to any Git project on your machine. Here’s an example of a `gitconfig` file:

```yaml
[user]
  name = John Doe
  email = johndoe@email.com

[core]
  editor = nvim
  excludesfile = ~/.gitignore_global

[init]
  defaultBranch = main

[commit]
  gpgsign = true

[push]
  default = simple
  autoSetupRemote = true
```

All settings inside the `gitconfig` are grouped within sections. Here’s an overview of the sections:

- The `user` section contains your name and email that will be used as committer fields in your commits.
- The `core` section contains configurations such as the editor you wish to use when you amend a commit. You also add a global gitignore file in `excludesfile`. Git will then automatically ignore the files mentioned in this global gitignore for any local repository on your computer.
- The `init` section contains settings that get applied when you run `git init`. With `defaultBranch` set to `main`, the default branch created will be named `main` instead of `master`.
- The `commit` and `push` sections are to configure how Git behaves when pushing or committing. In the example, `autoSetupRemote` creates the remote branch automatically if it isn’t yet created in your remote repository, on Github for instance.

The first step to further customizing Git on the command line is to use another feature we haven’t looked at yet: **Git aliases**.

## Create your own shortcuts with Git aliases

In your gitconfig, you can add a section called `[alias]`. An alias looks like:

```yaml
[alias]
	st = status
```

On the left side, you add your alias name. The alias name is the shortcut you want to use. On the right is the value the alias expands to. You can use any Git command with its various flags as an alias value.
In this first example, we have an alias `st` that expands to `status`. In your terminal, you can now type:

```sh
$ git st
```

This command will give the same output as typing `git status` as `st` expands to `status`.

We all have commands we end up using all the time, or useful commands we’d use more often if we could remember which flags to pass.
Let’s imagine you use `git log --oneline` all the time.

```sh
git log --oneline
```

This command provides a more compact overview of the last commits on a branch. Here’s an example of a typical output:

```sh
69ca546 (HEAD -> main, origin/main) chore(bash): remove bash_completion from bash_profile
775be90 feat(bash): add wasm build to path
4f545cc feat(bash): disable go pls telemetry
```

With Git aliases, you can add a shortcut that will expand to that exact command:

```yaml
# In your ~/.gitconfig
[alias]
  lo = "log --oneline"
```

Now, you can type:

```sh
git lo
```

And it will expand to `git log --oneline`, giving you the same output.

In my gitconfig, I have a series of aliases I use to add files, push, unstage commits, and many others:

```yaml
[alias]
  aa = add --all
  s = status -s
  st = status
  br = branch
  c = commit --verbose
  cm = commit -m
  cp = cherry-pick
  co = checkout
  ll = log --oneline --graph
  p = push
  pf = push --force-with-lease
  unstage = restore --staged .
```

One of my favorites from this example is `unstage`. With `git unstage`, I unstage any file I might have added to the Git staging area.
To commit with a message, I do a `git cm “my commit message”` and it does the same thing as typing `git commit -m “my commit message”`. Git aliases are quick to add and can make a difference in your everyday Git CLI experience.

## Add a syntax highlighter for the Git pager

When you use commands like `git diff` and `git show`, Git uses a _pager_ to show their respective output. By default, Git uses `less`. As mentioned in the [documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration), you can choose your own pager. [**delta**](https://github.com/dandavison/delta) is a great alternative to the default pager. It provides language syntax highlighting and configurable options. You can customize delta to show the Git diff in a split view. You can also make it show line numbers. There are many [features worth exploring](https://dandavison.github.io/delta/).

To use delta, first install it following [their installation guide](https://dandavison.github.io/delta/installation.html). If you’re on MacOS, you can use Homebrew (`brew install git-delta`).
Then, in your `~/.gitconfig`, add the following rule to the `core` settings section:

```yaml
[core]
    pager = delta
```

To customize delta further, you can also add to your `gitconfig` a `[delta]` section:

```yaml
[delta]
	navigate = true
	side-by-side = true
	line-numbers = true
```

- `navigate` activates navigation keybindings. You can now use `n` to jump to the next Git diff or `N` to jump backwards.
- `side-by-side` changes the output to show on the left the previous committed version of the committed file and on the right the current modifications.
- `line-numbers` is to display the line numbers. You can turn it off by passing `false`.

If you run `git diff` now, you should see a much clearer Git diff. For instance, here’s the before/after of running `git show` in one of my repos.

Before adding delta:

![Terminal output of git show using the default Git pager. It shows a diff of a Svelte component called LiveSVGEditor, where the worker initialization code was refactored. Five lines were removed (colored in red). They are replaced by a single added line (in green) that imports an editorWorker directly. The diff is displayed in a single column with no line numbers and no syntax highlighting.](../img/git_diff_svelte_before_delta.png)

After adding delta:

![Terminal output of the same git show command after adding delta as the Git pager. The diff is now displayed in a side-by-side view with line numbers. The left column shows the previous version of LiveSVGEditor.svelte with the removed worker initialization code highlighted in red across lines 11–14. The right column shows the updated version with the single replacement line highlighted in green at line 12. The code has full syntax highlighting with keywords and strings in different colors.](../img/git_diff_svelte_after_delta.png)

## Build custom functions for more complex tasks with Git

You can think of Git as a powerful utility that you can combine with other utilities to make certain tasks easier. The power of Git lies in its composability.

In a former blog post [“Build Git helpers from scratch with Bash and fzf”](https://oliviac.dev/blog/build-git-helpers-bash-fzf/), I wrote about how to create Git helpers with `fzf`. `fzf` is a [command-line fuzzy finder](https://github.com/junegunn/fzf). In that article, we build several utilities with Git and `fzf`:

- [`dfb`](https://oliviac.dev/blog/build-git-helpers-bash-fzf/#let's-create-a-helper-to-delete-a-git-branch-using-fzf): a helper function to delete a Git branch more easily
- [`gri`](https://oliviac.dev/blog/build-git-helpers-bash-fzf/#let%E2%80%99s-create-a-helper-to-choose-a-commit-to-rebase-a-branch-onto): With this function, you can choose via `fzf` which commit you want to rebase your branch onto. Then you get the classic Git rebase-interactive menu.

> You can add shell functions directly in your `~/.bashrc`, `~/.zshrc`, or any file loaded by your shell config file. To test the following function, you can add it directly for now in your bashrc or zshrc, reload your config file via a `source ~/.bashrc` or `source ~/.zshrc`, and then you should be able to use it.

Another common Git task is staging a file or specific changes in a modified file. Let’s create a small helper that follows the same technique as the ones mentioned before.

In my bash config, I have a `bash` function called `gaf`:

```bash
function ensure_git_repo() {
    if ! git rev-parse --is-inside-work-tree &> /dev/null; then
        echo "Error: Not inside a Git repository"
        return 1
    fi
}

# use fzf to stage modified or untracked files.
function gaf() {
    ensure_git_repo || return 1

    git ls-files -m -o --exclude-standard | fzf -m --print0 | xargs -0 -o -t git add
}
```

If we dissect this function:

- `ensure_git_repo` is a small check to make sure you use this function inside a Git repository.
- `git ls-files` is a way to list files in your repository. The flag `-m` means we include in the list only modified files. `-o` is a way to include untracked files in the output. If you create a file that you have not committed yet, this file will be included in the list. `--exclude-standard` means the list won’t include excluded files. This command will take your `.gitignore` into account.
- This command pipes the result of `git ls-files` to `fzf`. Then, `fzf` will show to standard output a list of the modified files you can then add. `fzf -m` enables multi-selection. You can then select several files at once using the `Tab` key.
- The final part uses `xargs` to flatten the list of selected files and pass them to `git add`.

After adding the function, navigate to a local directory with some uncommitted changes, and then type:

```sh
$ gaf
```

You should see a list of modified files, similar to the following screenshot:

![Output of running the `gaf` command. The screen shows an interactive list of two files: README.md and an index Astro file. It also shows an interactive prompt that enables filtering](../img/gaf_fzf_picker.png)

You can then select a single file in the list with the `Enter` key. It will select the current file highlighted. If you want to select multiple files at once, you can use the `Tab` key and `Shift Tab` to unselect a file. If you then run `git status`, you should see that your selected files are now in the Git staging area. In the example, I selected the README in the fzf menu:

![Output of the `git status` command. It shows the README in the staging area. The Astro file is still unstaged](../img/gaf_git_status_after_menu.png)

You can use `gaf -p` to stage specific modifications from a file. When you select a file, you then get the Git interactive menu, where you can stage portions of that file:

```sh
$ gaf -p
```

In my repo, I then select my README and get the interactive menu where I can choose to stage or not a specific portion of the README:

![Terminal output of git add -p showing a diff of README.md in single-column view with line numbers. Two added lines are highlighted in green at lines 3 and 4: 'Repository to showcase a SVG interactive editor.' and a blank line. At the bottom, the interactive prompt reads '(1/2) Stage this hunk [y,n,q,a,d,j,J,g,/,e,p,?]?’](../img/gafp_stage_changes.png)

There are many utilities you can come up with that match those micro tasks you do with Git and enable you to stay in your shell and not depend on a specific graphical interface. If you are curious, here’s a link to my dotfiles that contain [Git helpers I use every day](https://github.com/liv7c/dotfiles/blob/main/sources/functions#L22).

## Conclusion

In this article, we looked at a few ways to make the Git command-line interface more user-friendly. Git aliases are a great first step toward creating your own shortcuts for Git commands, with or without flags. [Delta](https://github.com/dandavison/delta) is a small utility that improves the readability of Git diffs and works with little configuration.
Finally, we explored an example of creating functions on top of Git to make common tasks easier. The possibilities are endless. I hope this article gives you a few ideas. If you have any questions or would like to chat, as always, don’t hesitate to reach out on [Bluesky](https://bsky.app/profile/oliviac.dev).

## Resources

- The article gave a quick overview of the `gitconfig`. For a more complete overview of all available settings, check out the [Git documentation](https://git-scm.com/docs/git-config).
- For a more comprehensive overview of delta, check out [the delta documentation](https://dandavison.github.io/delta/introduction.html).
- If you want a step-by-step guide on how to build Git and fzf helpers, check out my former blog post ["Build Git helpers from scratch with Bash and fzf"](https://oliviac.dev/blog/build-git-helpers-bash-fzf/).
