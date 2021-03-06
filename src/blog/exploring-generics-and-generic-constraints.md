---
title: Exploring generics and generic constraints in TypeScript
date: 2022-01-14
topics:
  - typescript
description: Generics and generic constraints are incredibly powerful tools to build more reusable and type-safe code. Let's review how and why we use them.
keywords:
  - typescript
---

Generics can be hard to grasp when first learning TypeScript. This post will review what generics are and why we use them. We'll then move on to explore generic constraints. They are a handy trick to keep in mind to build more type-safe code.

## Generics as a superpower to build reusable code
The whole idea behind generics is to write functions or data structures that can work with many different types depending on the context.

The most common example to introduce generics is the `identity` function. The sole goal of this function is to return the argument it receives.

```typescript
function identify(value) {
	return value;
}
```

If you have `strict` enabled in your `tsconfig`,  the code above will cause a type error. It will tell you that `value` has the implicit type of `any`. The first approach to fixing this issue is to make `value` an `any` type explicitly.

```typescript
function identity(arg: any) {
	return arg;
}
```

One problem with this approach is that you lose all type safety. By making `value` a type of `any`, the return value of `identity` will also be of type `any`. If you store it in a variable, this variable will also be of type `any`, which could cause some type errors.

```typescript
const name = identify("Lisa"); // name will be of type `any`
const total: number = name; // would not throw a type error
```

We want TypeScript to infer the type of the argument. That's when generics come to the rescue.

```typescript
function identity<T>(arg: T): T {
	return arg;
}

const name = identity("Lisa");
// will infer that T = string
// identity<string>("Lisa");
```

You can think of a generic as a placeholder or a variable that TypeScript will fill with the correct type information later. In this example, when you invoke `identity`, TypeScript will fill the blanks and replace the generic `T` with a concrete type (`string` in the case of the example).

## A real-life example of generics
Let's imagine we want to build a helper function to get the difference between two arrays. Some criteria for our helper function:

* We want this function to be reusable with all arrays, no matter what elements they contain.
* We want to make sure that both arrays contain the same type of elements.
* We want to pass a function `filterFn` that we can use to filter the lists.

```typescript
function getArrayDifference<T>(
  prevList: T[],
  currList: T[],
  filterFn: (el: T, list: T[]) => boolean
): T[] {
    const removedElements = prevList.filter(el => filterFn(el, currList));
    const addedElements = currList.filter(el => filterFn(el, prevList));

    return [...removedElements, ...addedElements];
}

```

Let's try this function. Let's imagine we want to use it to get the difference between two lists of tags.

```typescript
interface Tag {
	id: number;
	name: string;
}

const prevTags = [
	{id: 1, name: 'TypeScript'},
	{id: 2, name: 'Svelte'}
]

const currTags = [
	{ id: 1, name: 'TypeScript'}
]

const tagFilterFn = (tag: Tag, listOfTags: Tag[]) => {
    return listOfTags.findIndex(el => el.id === tag.id) < 0;
};

const diff = getArrayDifference(prevTags, currTags, tagFilterFn);
// TypeScript replaces T with Tag
// getArrayDifference<Tag>
// we get back [{id: 2,  name: "Svelte"}]
```

* If you inspect the `getArrayDifference` in this example, you will see that TypeScript considers `T` to be `Tag`.
* It returns a list of Tag. `diff` will be of type `Tag[]`. If we had used `any` in our helper function definition, `diff` would have been of type `any` as well, and we would have lost all the advantages of using TypeScript.
* Thanks to generics, we also have some type safety for our `filterFn`. In the above example, its first argument must be of type `Tag`, and its second argument must be a list of tags.

Generics make our function type-safe and reusable with other types. We could use our helper with arrays of numbers.

```typescript
const otherDiff = getArrayDifference([1, 2, 3], [2, 3], (curr, list) => !list.includes(curr));
// T = number
// returns [1]
```

Now that we are well immersed in generics, let's explore generic constraints!

## Generic constraints or generics with limitations
The whole idea behind generic constraints is to limit the possibilities of the types a generic can represent.  Generics are like wildcards. However, we could already know that we want the type to have specific properties from the get-go. You can create a generic constraint with the `extends` keyword. Let's have a look at some typical use-cases for generic constraints.

### Usecase #1: you want to use a specific property on a generic type

Let's say we want to write a function that filters a list by id and pretty-prints the result. This function should be generic because we want it to be reusable with many different types.

At first, we might write something like:

```typescript
function findByIdAndPrint<T>(list: T[], id: string) {
	// The line below will cause a type error
	const itemToPrint = list.find(item => item.id === id);

	if (itemToPrint) {
		console.log(JSON.stringify(itemToPrint, null, 2));
	} else {
		console.log('No item found');
	}
}
```

This won't work. TypeScript will throw a type error `Property "id" does not exist on type "T"`. We have to tell TypeScript that `T` will have an `id` property no matter what.

```typescript
interface HasId {
	id: string
}

// we could also inline the constraint with T extends {id: string}
function findByIdAndPrint<T extends HasId> {
	const itemToPrint = list.find(item => item.id === id);

	if (itemToPrint) {
		console.log(JSON.stringify(itemToPrint, null, 2));
	} else {
		console.log('No item found');
	}
}
```

What does `extends` do?
* It tells TypeScript that `T` must have a property `id`.
* `extends` also means that our type `T` is not limited to having only a property `id` and can have many more.
* We constraint our generic so that this function won't work with any type without an `id` property.

### Usecase #2: Create a relationship between two generics
 You might have come across the keyword `keyof`. `keyof` is an operator that returns a union of all the keys of an interface or type.

```typescript
interface Person {
	name: string;
	age: number;
}

type PersonKeys = keyof Person // 'name' | 'age'
```

How does it relate to our generic constraint? Let's say we have a function that acts as a getter for a property on an object.

Our first approach might be to just write it without any generics:
```typescript
function getPropertyValue(obj: Record<string, unknown>, key: string) {
    return obj[key]
}
```

 `Record` is a utility type that creates an object type. The problem with this approach is that we can pass just any string as a second argument. And we might want only to allow the user to give a key that exists on the object.

Generics and generic constraints to the rescue!

```typescript
function getPropertyValue<T extends Record<string, unknown>, K extends keyof T>(obj: T, key: K) {
	return obj[key]
}
```

* We first constraint `T` to tell TypeScript that this will be an object. `unknown` is an excellent alternative to using `any`  as it is more restrictive.
* We then pass a second generic `K`. We directly limit what `K` can represent with `extends`. We use `keyof` to tell TypeScript that `K` will be a key of `T`.

```typescript
getPropertyValue({ name: 'Ryan', age: 26 }, 'name'); // 'Ryan'

// this code will throw a type error
getPropertyValue({ name: 'Lisa'}, 'country');
```

In this case, we use generic constraints to create a relationship between two generics that, otherwise, could stand for any type and be entirely independent of one another.

## Conclusion
In this post, we explored generics and generic constraints.  We saw a few examples of how much power generics give us as typescript developers to make our code more flexible, reusable, and type-safe.

Some useful resources to go deeper:
* [TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
* [An overview of computing with types by Axel Rauschmayer](https://exploringjs.com/tackling-ts/ch_computing-with-types-overview.html#generic-types-factories-for-types)

