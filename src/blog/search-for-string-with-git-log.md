---
title: Search for a string in your git history with git log
date: 2022-01-07
topics:
  - git
description: Explore your git history with git log
keywords:
  - git
---

Recently, I discovered a useful functionality of `git log` while cleaning up some code. You can pass an option to `git log` to get back a list of all the commits that changed a particular string. Let's explore that feature!

## Using `git log -S`

If you want to find all the occurrences of a specific string in your git history, `git log -S` is perfect for the job.

For example, if you look for a particular component in a React app, you can type:

```shell
git log -S ContentWrapper
```

It will return a list of all the commits where that string appears:

```shell
commit ab68707f03a5636c399213194a32c29d631e7c2b
Author: Olivia Coumans <my_email@email.com>
Date:   Tue Jan 4 11:03:34 2022 +0100
  feat(styles): create PageContentWrapper comp

commit 5e79c7fa417c5a58b7b6c6bfb71de318686a6210
Author: Olivia Coumans <my_email@email.com>
Date:   Thu Dec 30 12:57:15 2021 +0100
  feat(footer): add site footer
```

You can then use `git show [COMMIT_HASH]` to display the content of a commit with all the diffs.

```shell
git show ab68707
```

## Bonus: list all the commits that modified a file

`git log -p FILE_PATH` is a quick way to list all the commits that modified a specific file.

Don't hesitate to pass flags to customize the output of `git log`:

```shell
git log --name-only --oneline -p ./components/SiteHeader/SiteHeader.tsx
```

The above example will only display the hash and the name of each commit that modified the file.

## Conclusion and further resources

With `git log` and some of its options, you can quickly find out when some piece of code was removed or added while staying in your terminal. I hope it will be helpful for you too!

Some further resources:

- [Git documentation on git log -S](https://git-scm.com/docs/git-log#Documentation/git-log.txt--Sltstringgt)
- [Git documentation on git-log](https://www.git-scm.com/docs/git-log)
