---
title: Testing HTML in React Components with Vitest
date: 2024-09-08
topics:
  - testing
description: In this guide, we'll walk through the steps to set up HTML validation for React components using Vitest. You'll learn how to ensure your components adhere to proper HTML structure, improving code quality and catching errors early in the development process.
keywords:
  - react
  - html-validate
  - vitest
---

In this guide, we'll walk through the steps to set up HTML validation for React components using Vitest. You'll learn how to ensure your components adhere to proper HTML structure, improving code quality and catching errors early in the development process.

## What is HTML validation, and why does it matter?

You may have already used a service like [W3C validation service](https://validator.w3.org/) for your web pages. This type of validator scans your HTML and checks for essential elements, such as that the document has a language attribute (`<hmtl lang="en">`), but also that your HTML markup is valid. Having valid HTML is crucial to creating a more accessible experience for your users.

There are so many ways to check whether your HTML is valid. With React, we tend to create a lot of small components and often lack the vision of what the HTML of the page as a whole looks like. So, a service like the W3C validation service is still necessary. However, having quicker feedback while writing our reusable components during development is extremely helpful. It can significantly decrease the number of errors we encounter when we validate the HTML of a whole page. Moreover, when creating component libraries, it is essential to ensure the component has a valid HTML markup. Thus, in this post, we'll set up `html-validate` in vitest to add those HTML checks at the component level and improve the feedback loop overall.

## Setting up html validation in vitest

I assume you already have a react project with vitest. If not, you can check out the [entire demo code](#the-whole-demo-code) in the final section of the post.

The first step is to install [`html-validate`](https://www.npmjs.com/package/html-validate). If you use `npm` or `pnpm` along with vitest v2, you might need to use the flag `--legacy-peer-deps`. This flag turns off the peer dependency checking during installation.

```sh
# npm i -D html-validate
# pnpm i -D html-validate
yarn add --dev html-validate
```

Then, we need to modify the test setup file. You probably already have a setup file defined in your Vite or Vitest config. The setup file is run before each test file and reduces the boilerplate.

```ts
/// <reference types="vitest" />
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    // your test setup files
    setupFiles: ['./src/setup-tests.ts'],
    environment: 'happy-dom',
  },
});
```

In my Vite config, I have defined one setup file `./src/setup-tests/ts`. In your setup file, add this line:

```ts
// adding this to my `src/setup-tests.ts`
import 'html-validate/vitest';
```

This line extends the `expect` capabilities by adding some handy matcher functions such as `toBeValid` and `toHTMLValidate`. For the exhaustive list of the available matcher functions, check out the [html-validate source code for vitest](https://gitlab.com/html-validate/html-validate/-/blob/master/src/vitest/vitest.ts?ref_type=heads).

Once we have added the new dependency and the line in our test setup file, we're generally good to go!

## Validate your React component HTML in your tests

I created a small Button component for this demo with some _problematic_ HTML markup.

```ts
import {PropsWithChildren} from 'react';

export function Button({children}: PropsWithChildren) {
  return (
    <button>
      <div>{children}</div>
    </button>
  );
}
```

If we look at the [HTML specifications for the button element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element), we see that a button can only contain **phrasing content**. [The HTML spec](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2) defines phrasing content as the text of the document. You can only include elements concerning the text's appearance (e.g., `strong`, `span`). It is an easy error to make. Now, let's write a test that helps us catch that issue (and others).

Let's create a test file for our button and add a test case to validate the HTML:

```ts
import {Button} from './Button';
import {render, screen} from '@testing-library/react';

describe('Button', () => {
  test('has valid HTML', async () => {
    const {container} = render(<Button>Hello</Button>);
    const htmlString = container.innerHTML;

    expect(htmlString).toHTMLValidate();
  });
});
```

In this test, we use the `.toHTMLValidate()` helper from `html-validate`.
We also use the `container.innerHTML` to pass to `toHTMLValidate` the actual HTML markup of our component.
When we run the test, we see that the test fails.

![Console output of the test file for the button. The test `has valid HTML` fails, showing the error text "Error: Expected HTML to be valid but had the following errors:". It shows two errors. One is that <button> is missing the recommended "type" attribute [no-implicit-button-type]. The other is that <div> element is not permitted as content under <button> [element-permitted-content]](/img/html-vitest-error.png)

The test output shows us that our simple Button component has two issues:

- it is missing the recommended `type` attribute.
- And it captures the error we discussed - the invalid `div` element inside of a `button` element.

## The whole demo code

You can check out the entire demo code on <a href="https://stackblitz.com/edit/vitejs-vite-ceadnv?file=src%2Fcomponents%2FButton%2Findex.test.tsx" target="_blank" rel="noopener noreferrer">StackBlitz</a>.

## Conclusion

In this guide, we set up `html-validate` to validate the HTML of our React components in vitest. It greatly improves the feedback loop and helps catch all kinds of HTML errors quicker during development. I hope the guide was helpful. If you have any extra questions, don't hesitate to reach out!
