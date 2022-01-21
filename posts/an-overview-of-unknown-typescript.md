---
title: An overview of the unknown type in Typescript
date: '2022-01-21'
tags:
  - typescript
description: This blog post explores what the unknown type is in Typescript and how to use it. It also highlights some of the differences between any and unknown.
keywords:
  - typescript
---
Typescript's version 3.0 introduced a new type, `unknown`.  Contrary to `any`, we do not opt out entirely from the type system by assigning a type `unknown` to a value. This blog post will explore the purpose of `unknown` and some key differences between `unknown` and `any`.

## Purpose of unknown
The purpose of `unknown` is similar to `any`. It is used to represent any possible value. We might want to write a helper function that takes any possible type as an argument. Or we might not know when writing our program what type of value a particular variable will hold at runtime.

It is an excellent alternative to using the infamous `any` type. Even though it might do something similar to `any`, they are critical differences between both. To understand those, let's first review some of the pitfalls of using `any`.

## The multiple risks of using `any`
If we explicitly give an `any` type to a value, we can then assign it to any variable, no matter their type.

```typescript
const ourValue: any = 'hello';

// we can assign it a variable supposed to contain a number
const importantNumberVal: number = ourValue;

// we can assign it to a variable supposed to
// contain an array of strings
const listOfNames: string[] = ourValue;
```

This code is perfectly valid Typescript code. However, we know it will cause all sorts of errors down the line. We can also use our value typed `any` with a function that requires a specific type of argument to work correctly.

```typescript
interface Person {
	name: string
}

// we could use it with a function that has a specific type signature
function greetPerson(person: Person): string {
	return `Hello ${name}`;
}

const problematicValue: any = 12;
// will not throw any errors or warnings
greetPerson(problematicValue);
```

These two examples are only reminders that while `any` can be very convenient, we must remember its tradeoffs too. While we gain flexibility, we give up most of the benefits of using Typescript.

## `unknown`, a type-safe alternative to `any`
`unknown` is much more restrictive than the type `any`. Let's revisit an earlier code example, replacing `any` with `unknown`.

```typescript
const ourValue: unknown = 'hello';

// type error here
// Type 'unknown' is not assignable to type 'number'
const importantNumberVal: number = ourValue;

// another type error :)
// Type 'unknown' is not assignable to type 'string[]'
const listOfNames: string[] = ourValue;

```

We can no longer use `ourValue`  in all situations. The general rule is that you can only assign a value of type `unknown` to a variable that is `any` or `unknown`.
But how do we use it then?

## Type narrowing to use a type  `unknown` value
You can only assign a value of type `unknown` to a variable that has the type `unknown` or `any`. But, in our example, our variable `importantNumberVal` holds a `number` type. In that case, the only solution is type narrowing. We need to do some runtime checks to use our value.

If we wanted to use it to assign it to a constant that holds a number, we would need first to check that it is of type number.

```typescript
const ourValue: unknown = 'hello';

if (typeof ourValue === 'number' && !Number.isNaN(ourValue)) {
	// it works!
	const importantNumberVal: number = ourValue;
}
```

 Using `unknown` means doing this extra check. It is virtually unusable until we narrow what type it is. However, in the above example, we keep our code type-safe. But, like most good things, it requires some extra work.

## Using `unknown` to regain some type safety
One interesting technique is to assign a value of type `any` to a variable of type `unknown`. We can restrict what we can do with this value in our program this way.

Let's imagine we want to use a function from an external package. The function has a return type of `any` for the specific helper we wish to use.  If we are ok with eventual type errors and have a degree of certainty about the return value, we might assign it to a variable of type `any`.

```typescript
import { getValueFromPackage } from 'some-awesome-npm-package'

function printNameInfoToTheUser(): void {
	const data: any = getValueFromPackage()

	// name will have the any type
	const { name, count } = data
	const humanReadableCount = count + 1;

	// some more code...
	console.log(name);
	console.log('Total count:', humanReadableCount);
}
```

The problem with using `any` is that it spreads. In the example, we can destructure  `data` without any warnings from Typescript, even though those properties might not exist. Moreover,  `name` and `count` will also have the `any` type. Even if this example is a little contrived, this will often cause some issues in a more realistic scenario. The package we use might change its schema and return an object that no longer has a `name` property. Or we could make a typo and spell one of the properties wrong.

Using a variable of type `unknown` to store the return value of the third-package function is an excellent way to gain some type safety.

```typescript
function printNameInfoToTheUser(): void {
	const data: unknown = getValueFromPackage()

	// Warning: This will throw some type errors
	// Property 'name' does not exist on type 'unknown'
	// Property 'count' does not exist on type 'unknown'
	const { name, count } = data
	const humanReadableCount = count + 1;

	// some more code...
	print(name);
	print('Total count:', humanReadableCount);
}
```

By replacing `any` with `unknown`, we no longer can destructure `data`. Typescript yells a little at us by throwing two type errors: `Property 'name' does not exist on type 'unknown'` and `Property 'count' does not exist on type 'unknown'`.

To use the return value, we need to be more specific about what value it holds. We can solve this issue using type guards and a little generic helper.

```typescript
// helper to check that a key exists or not on an object
function hasProperty<T extends object, K extends string>(
  obj: T,
  propertyName: K
): obj is T & Record<string, unknown> {
  return propertyName in obj;
}

function printNameInfoToTheUser(): void {
  const data: unknown = getValueFromPackage();

  // type safety has a price...
  if (
    typeof data === 'object' &&
    data !== null &&
    hasProperty(data, 'name') &&
    hasProperty(data, 'count')
  ) {
    // both will be of type `unknown`
    const { name, count } = data;

    // type-checking count to avoid calculation errors
    let humanReadableCount = 0;
    if (typeof count === 'number' && Number.isNaN(count)) {
      humanReadableCount = count + 1;
      console.log('Total count:', humanReadableCount);
    }

    if (typeof name === 'string') {
      console.log(name);
    }
  } else {
    // throw or show other message
  }
}

```

In our example, `getValueFromPackage` is supposed to return an object. By assigning it to `unknown`, we make it unusable in the rest of the code, unless we restrict what type of value it contains.

`hasProperty` is a `type predicate`.  A type predicate is a function that returns a boolean whose value will determine the types inferred by Typescript. For example, `typeof` is a built-in type predicate. When you use it inside an if statement (e.g. `typeof val === 'number'`), Typescript will infer that `val` is a `number` in the entirety of the if block.
In our case, when `hasProperty` returns true, Typescript will infer that the key we were looking up on our object is of `unknown` type.

 Let's dissect the multiple conditions in the if statement:

* `typeof data === 'object'`  enables us to already tell Typescript that this value is an object.
* Because `null` happens to be an object in JavaScript, we need to tell Typescript that `data` is an object and not null.
* We then use a type predicate `hasProperty` to confirm that both `count` and `name` are present on our object.

Inside of our if block, we still need to restrict further the `count` and `name` values to use them because they are both `unknown`.

This example shows how we can regain some type of safety if we use an external package with many `any` types. However, it is really up to you to evaluate whether going through those steps is worth it.

## Conclusion and further resources
In the wild, you will see many packages use `any` in their type definitions. Because `unknown` was introduced only in the v3 of Typescript, they are many codebases that do not use it heavily. However, it can serve us well to use it instead of `any`. It enables us to avoid some of the pitfalls of using `any`. However, as seen in our last example, it can also bring many extra steps and type checks. My rule of thumb is always to use  `unknown` first before using `any`. When writing helper functions, for instance, it can help avoid accidentally using the argument value without doing any type checks first. I hope this post was a little helpful to you!

Here are some valuable resources:
* [Typescript's two top types by Axel Rauschmayer](https://exploringjs.com/tackling-ts/ch_any-unknown.html#typescripts-two-top-types)
* [Release note Typescript 3.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
* [TypeScript: Documentation - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
* [Stack overflow post on narrowing an object type](https://stackoverflow.com/questions/70028907/narrowing-an-object-of-type-unknown)


