---
title: An introduction to table driven tests in Vitest
date: 2025-04-09
topics:
  - testing
description: A quick guide to writing table driven tests in Vitest to cover many test cases with minimal boilerplate.
keywords:
  - testing
  - vitest
---

I first encountered the concept of "table driven tests" when coding in the beautiful [Go language](https://go.dev/). The technique is straightforward: You create a table (an array in your JavaScript code) to define the cases you want to test. Then, you let the test runner loop through all the test cases. It is an extremely efficient technique for adding new test cases, reducing the boilerplate, and testing a lot more use cases.

This technique is absolutely brilliant for unit tests. In this blog post, we'll explore how to use it in Vitest.

## Let's write a table driven test

Let's create a quick function to validate an email:

```ts
// utils/validators.ts
export function isValidEmail(email: string): boolean {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(trimmedEmail);
}
```

In the test file, we will add a describe block for that util function:

```ts
// utils/validators.test.ts
import {isValidEmail} from './validators';

describe('isValidEmail', () => {});
```

Traditionally, to test this function, we would write tests like the following snippet:

```ts
// utils/validators.test.ts
import {isValidEmail} from './validators';

describe('validateEmail', () => {
  test('returns false when email is empty', () => {
    const result = isValidEmail('');
    expect(result).toBe(false);
  });

  test('returns false when email is empty string with white spaces', () => {
    const result = isValidEmail('  ');
    expect(result).toBe(false);
  });

  // lots of edge cases still to cover
});
```

With table driven testing, instead of writing the test straightaway, we first define our test cases in an array.

```ts
describe('isValidEmail', () => {
  const testCases: {
    name: string;
    input: string;
    expected: boolean;
  }[] = [
    {
      name: 'email is empty',
      input: '',
      expected: false,
    },
    {
      name: 'email is an empty string with white spaces',
      input: '  ',
      expected: false,
    },
    {
      name: 'missing domain',
      input: 'username@',
      expected: false,
    },
    {
      name: 'missing username',
      input: '@email.com',
      expected: false,
    },
    {
      name: 'missing at sign',
      input: 'useremail',
      expected: false,
    },
    {
      name: 'invalidates duplicate email entries with white spaces',
      input: '   test@email.com    test@email.com',
      expected: false,
    },
    {
      name: 'valid email',
      input: 'test@email.com',
      expected: true,
    },
    {
      name: 'handles leading white spaces',
      input: '   test@email.com',
      expected: true,
    },
    {
      name: 'handles trailing white spaces',
      input: 'test@email.com    ',
      expected: true,
    },
    {
      name: 'handles trailing and leading white spaces',
      input: '   test@email.com    ',
      expected: true,
    },
  ];
});
```

You can define your test cases the way you want. You could rename `expected` to `want` or `expectedOutput`. There is no strict rule here. Sometimes, you might want to add some extra properties too. I like adding a name and using the object structure to make things as readable as possible.

The only thing left is to run our tests using [`test.each()`](https://vitest.dev/api/#test-each) from Vitest. We pass our test cases to `test.each` and define a callback that gets passed the different properties we defined per test case:

```ts
import {isValidEmail} from './validators';

describe('isValidEmail', () => {
  const testCases: {
    name: string;
    input: string;
    expected: boolean;
  }[] = [
    {
      name: 'email is empty',
      input: '',
      expected: false,
    },
    // rest of our test cases...
  ];

  // You could also use `it.each`
  test.each(testCases)('$name', ({input, expected}) => {
    const result = isValidEmail(input);
    expect(result).toBe(expected);
  });
});
```

Some things to note:

- Because we use objects to define each case, we can access each property by their name using the `$` notation. If we had used `testName` instead of `name `in our test cases array, we would have written `test.each(testCases)('$testName', ` instead.
- We define a callback function that receives each test case object. We write the test logic once, and reuse it for each case.

If we run the test, we can see an output where Vitest runs each test case and outputs the result in a very clean, readable way:

```ts
 ✓ src/utils/validators.test.ts (10 tests) 2ms
   ✓ isValidEmail > 'email is empty' 1ms
   ✓ isValidEmail > 'email is empty string with white spac…' 0ms
   ✓ isValidEmail > 'missing domain' 0ms
   ✓ isValidEmail > 'missing username' 0ms
   ✓ isValidEmail > 'missing at sign' 0ms
   ✓ isValidEmail > 'invalidates duplicate email entries w…' 0ms
   ✓ isValidEmail > 'valid email' 0ms
   ✓ isValidEmail > 'handles leading white spaces' 0ms
   ✓ isValidEmail > 'handles trailing white spaces' 0ms
   ✓ isValidEmail > 'handles trailing and leading white sp…' 0ms
```

This technique makes it very easy to add new test cases!

### Using nested arrays instead of objects for the test cases

An alternative is to use nested arrays instead of objects, which can be more concise. If you prefer this notation, you would define the test cases like this:

```ts
describe('isValidEmail', () => {
  const testCases: [name: string, input: string, expected: boolean] = [
    ['email is empty', '', false],
    ['email is empty with white spaces', '  ', false],
    // ...
  ];
});
```

Then, instead of accessing the properties of an object in your `test.each`, you access the different array values based on their position:

```ts
describe('isValidEmail', () => {
  const testCases: [name: string, input: string, expected: boolean][] = [
    ['email is empty', '', false],
    ['email is empty with white spaces', '  ', false],
  ];

  test.each(testCases)('%s', (_name, input, expected) => {
    const result = isValidEmail(input);
    expect(result).toBe(expected);
  });
});
```

`%s` interpolates the `name` we provided. It follows the [`printf` formatting rules](https://nodejs.org/api/util.html#util_util_format_format_args). `%s` means you want to interpolate a string. For a number, you would write `%d` for instance.

You can choose whichever notation feels the clearest to you.

## When to use table driven tests

There’s no hard rule about when to use table driven tests, but it’s especially useful when:

- There are many slight variations to test (like lots of different types of inputs, etc.), and the test logic remains the same.
- The logic is simple and pure. Table testing shines when testing pure functions, which are functions that, given the same input, will always return the same output.

## What about Jest?

In Jest, you can use `.each` in the same way as in Vitest. You can check out [the documentation for the each method in Jest here](https://jestjs.io/docs/api#each). The examples in the documentation should feel familiar!

## Complete code demo

If you feel like playing with the code from this blog post, it is available on [Stackblitz](https://stackblitz.com/edit/demo-explore-table-testing-vitest).

## Conclusion

In this post, we explored a technique called _table driven testing_, which is quite popular in the Go community. However, we can also apply it to our JavaScript code too!

By defining test cases in a table (an array of objects or arrays), we can quickly test multiple input variations without repeating ourselves. This technique reduces the boilerplate and makes adding more test cases easy. It is especially handy when testing pure functions or utils.

Thanks for reading! I hope you find the post useful. If you have any questions or want to chat about unit tests, don't hesitate to reach out on [Bluesky](https://bsky.app/profile/oliviac.dev) 😀

## Resources

- [Vitest's documentation on test.each](https://vitest.dev/api/#test-each)
- [Jest's documentation on the `.each` method](https://jestjs.io/docs/api#each)
- [Great blog post about table driven test in Go](https://dave.cheney.net/2019/05/07/prefer-table-driven-tests)
