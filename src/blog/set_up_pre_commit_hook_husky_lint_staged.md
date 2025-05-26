---
title: How to set up a pre-commit Git hook with Husky and lint-staged
date: 2025-05-26
topics:
  - git
description: In this blog post, we’ll explore what Git hooks are. We’ll create Git hooks using Husky to add a pre-commit hook to your project.
keywords:
  - git
  - tooling
---

Git hooks are a great way to automatically run specific tasks (such as formatting or linting tasks) at key moments in your Git workflow. In this post, we'll explore Git hooks and walk through how to set up a pre-commit hook using [Husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged) to lint and format your staged files automatically. Let’s dive in.

## What are Git hooks?

As mentioned in the [Git documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), Git hooks are a way to run scripts at specific moments in your Git workflow. They can help automate repetitive checks and enforce formatting or linting rules that help collaboration.

Inside any Git-tracked project, open the `.git` folder. You’ll find a series of folders that include a `hooks` folder.

<figure>
  <img alt="Structure inside a .git folder showing the hooks directory among others" src="/img/git-folder.png" />
  <figcaption>Structure inside a .git folder showing the hooks directory, among others.</figcaption>
</figure>

The **hooks folder** contains example hook scripts (e.g., `pre-commit.sample`) that you can customize to automate tasks before commits, pushes and more. To make our lives easier, we’ll use `husky` to set up a Git hook. Husky makes it easy to create shareable Git hooks that you can add to version control.

## Setting up the demo project

In this blog post, we’ll work with a simple repository that contains a small React app created with [Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project).

To follow along, scaffold a Vite React and Typescript app:

```sh
npm create vite@latest demo-git-hooks-husky -- --template react-ts
cd demo-git-hooks-husky && npm install
```

At this point, you have a basic “Hello World” React app. The Vite boilerplate includes an `eslint.config.js` file to lint the files. Let’s install `prettier` to format our files:

```sh
npm install --save-dev prettier
```

Then, create `.prettierrc` at the root of the project with basic rules:

```json
{
  "arrowParens": "always",
  "bracketSpacing": false,
  "printWidth": 80,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false
}
```

## Installing and configuring Husky

Husky is a development dependency to make it easier to add Git hooks. First, let’s install it:

```sh
npm install --save-dev husky
```

Once Husky is installed, run the following:

```sh
npx husky init
```

As explained in the [official documentation](https://typicode.github.io/husky/get-started.html#husky-init-recommended), this command adds a “prepare” script to the `package.json` and creates a `pre-commit` hook in the `.husky` folder you should now have at the root of your repository.

The `prepare` script is one of the NPM lifecycle scripts that run automatically at specific moments. The `prepare` script runs on local `npm install` even when no arguments get passed ([see the NPM doc for more details on the `prepare` script](https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-scripts)). This means that any developer who installs the project dependencies will automatically have the Git hooks correctly set up with Husky.

Let’s configure the `pre-commit` hook that was automatically created to make it more relevant to our project!

## Configuring the `pre-commit` script with lint-staged

In our demo app, we have linting and formatting rules we want to apply to all our source files. While you could run linting and formatting as a GitHub action on push or pull requests, a `pre-commit` hook provides faster feedback by catching issues before a commit is created.
When we try to commit a series of changes, we can write our Git hook to run a list of checks **before a commit gets created**.

### Update the package.json lint and format scripts

By default, the `pre-commit` hook in `.husky` contains:

```sh
npm test
```

A good start is to ensure that all files are checked by our linter and formatted before they are committed to Git. In our `package.json`, we already have a `lint` script. Let's add a few more:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint --max-warnings=0 --fix",
    "format": "prettier --write .",
    "format:file": "prettier --write"
  }
}
```

- `lint` runs `eslint` on all the files.
- The `lint:fix` script will try to auto-fix linting issues where possible. With the flag `--max-warnings=0`, it will fail (exit with an error) if any errors or warnings remain. We’ll use this script in our pre-commit to add an extra layer of protection and make sure to know as soon as possible if we need to fix the code manually.
- `format` will format and **write** the changes.
- The `format:file` script formats the files passed to it, which works well with `lint-staged` since it provides the staged files as input. It is a slight optimization as a way to only run prettier on staged files and not on the whole project.

### Setting up lint-staged to lint and format staged files

[`lint-staged`](https://www.npmjs.com/package/lint-staged) is an NPM package that will help us run our linter or formatter on staged files. We don’t want commits to fail because of issues in unrelated files. `lint-staged` will help us **run the checks we define in our pre-commit hook on the files that are in the Git staging area**. The Git staging area is where your tracked files get placed after you use `git add the-file-you-modified`.

Let’s install `lint-staged`:

```sh
npm install --save-dev lint-staged
```

There are many options to configure `lint-staged`. One of them is to create a `.lintstagedrc` at the root of the project.

```sh
touch .lintstagedrc
```

In the configuration file for `lint-staged`, we associate file extensions with the `npm` scripts we want to run for those files. Let’s add the following config to our `.lintstagedrc`:

```json
{
  "*.{js,jsx,ts,tsx}": ["npm run lint:fix", "npm run format:file"],
  "*.{json,md,mdx,css,scss,html,yml,yaml}": "npm run format:file"
}
```

You can also add lint-staged configuration directly in the `package.json` if you do not want to create an extra configuration file:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["npm run lint:fix", "npm run format:file"],
    "*.{json,md,mdx,css,scss,html,yml,yaml}": "npm run format:file"
  }
}
```

Let’s now add an NPM script to the package.json to run lint-staged:

```json
{
  "scripts": {
    "check:precommit": "lint-staged"
  }
}
```

## Use lint-staged with the husky `pre-commit` hook

Now that we have lint-staged configured, we can modify the `.husky/precommit` file and use the `check:precommit` script we have added to the `package.json`. In `.husky/pre-commit`, add the following content:

```sh
npm run check:precommit
```

With all those changes, we now have a working pre-commit setup that uses eslint and prettier on the files we want to commit.

## Under the hood: how does husky work?

When husky is installed, it runs a script that updates the `.git/config` file by setting the `core.hooksPath` to the `.husky` directory. This tells Git to look in `.husky` for hook scripts instead of the default `.git/hooks` directory.

In `.git/config`:

```ini
[core]
  ...
  hooksPath = .husky/_
```

In the `husky` source code, in the [`index.js`](https://github.com/typicode/husky/blob/main/index.js), there is a statement that sets up the `hooksPath`:

```js
let {status: s, stderr: e} = c.spawnSync('git', [
  'config',
  'core.hooksPath',
  `${d}/_`,
]);
```

In the above snippet, `c.spawnSync` is a way to launch a child process in Node. This is like running `git config core.hooksPath <some_path>` in the terminal.

## Final project setup overview: Putting everything together

Here's a quick overview of the key files and their contents once everything is configured:

In package.json:

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:file": "prettier --write",
    "lint:fix": "eslint --max-warnings=0 --fix",
    "check:precommit": "lint-staged"
  },
  "devDependencies": {
    "eslint": "...",
    "husky": "...",
    "lint-staged": "...",
    "prettier": "..."
  }
}
```

In `.husky/pre-commit`:

```sh
npm run check:precommit
```

In `.lintstagedrc`:

```json
{
  "*.{js,jsx,ts,tsx}": ["npm run lint:fix", "npm run format:file"],
  "*.{json,md,mdx,css,scss,html,yml,yaml}": "npm run format:file"
}
```

This provides a fast, local pre-commit workflow to catch linting or formatting issues before they are committed to Git.

You can find the whole demo on [GitHub](https://github.com/liv7c/demo-git-hooks-husky).

## Troubleshooting

If the pre-commit does not work:

- Make sure you've staged the files using `git add`.
- Make sure you've staged a file that your lint-staged configuration supports (a `tsx`, `js` or whatever extension you have configured).
- Reinstall the dependencies if you do not see a `.husky` folder at the root of your project.

## Conclusion

In this blog post, we explored how to use `husky` to create a pre-commit hook and how to use lint-staged to run checks on staged files.
Pre-commit hooks help catch problems early and are a fantastic way to improve consistency when working on a shared codebase. I hope you find this blog post helpful. If you have any questions, don’t hesitate to reach out on [Bluesky](https://bsky.app/profile/oliviac.dev) 😀

## Resources

- [Husky repository](https://github.com/typicode/husky)
- [lint-staged package](https://www.npmjs.com/package/lint-staged)
- [Git official documentation on Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [NPM documentation on the different package.json life cycle scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-scripts)
