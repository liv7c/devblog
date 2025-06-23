---
title: How to use jq with curl to explore an API’s JSON response
date: 2025-06-22
topics:
  - command-line
  - jq
description: This article explores how to use the command-line tool jq with curl to process, filter, and transform JSON responses from APIs.
keywords:
  - jq
  - curl
  - JSON
---

[jq](https://github.com/jqlang/jq) is a useful command-line tool to process a JSON payload quickly. I tend to use `jq` in conjunction with `curl` to explore third-party APIs. `jq` is a powerful tool for filtering or transforming JSON data. In this article, we’ll explore a couple of its functionalities while playing with two free third-party APIs. The goal is to become more comfortable with `jq` by the end of the blog post and to have started building a cheat sheet of our own.

## How to install `jq`

To install `jq`, you can download the binary on the [`jq` website](https://jqlang.org/). If you are on a Mac, you can install `jq` with [`homebrew`](https://brew.sh/):

```sh
brew install jq
```

For a complete set of installation instructions, check out the [Github repository section on that topic](https://github.com/jqlang/jq?tab=readme-ov-file#installation).

## What is jq and what can we do with it?

`jq` is described in [its official documentation](https://jqlang.org/) as a “lightweight and flexible command-line JSON processor”. `jq` is lightweight and quick (it is written in C). Its flexibility comes from the number of features and possibilities available when using it. You could use jq to:

- Pipe JSON data (`curl <URL> | jq .`) and get a formatted and colored output.
- Filter out keys and quickly extract the data you are interested in from a JSON output.
- Sort a JSON output based on a specific key.
- Limit the JSON output to `n` elements (for instance, you might want the first five elements from a JSON array).
- Retrieve all the keys of a JSON response (this might be handy when interacting with a third-party API).
- And much more!

In all the commands we’ll explore, we’ll _pipe_ JSON data to `jq` to process. Piping means taking the output of a command (such as curl returning API data) and directly passing it to another program for processing. In the shell, to pipe an output, we use the `|` symbol. For instance:

```sh
curl <URL> | jq .
```

The previous command uses `curl` to fetch the data available at a given URL. Then, it passes the data to `jq`.

You don’t need to pipe data to `jq` to use it. You can pass a JSON file to jq as an argument:

```sh
jq . <filepath_to_json_file>
```

## Processing JSON data with `jq`

Let’s get started working with JSON arrays. For this section, we will use the [JSON placeholder](https://jsonplaceholder.typicode.com/) that provides dummy To-Do API endpoints.

```sh
curl -s https://jsonplaceholder.typicode.com/todos
```

With this command, we obtain a JSON array of 200 elements.

### Extract the length of a JSON array with `jq`

If you are wondering how many items are in a JSON array, you can use the `length` helper in `jq`:

```sh
curl -s https://jsonplaceholder.typicode.com/todos | jq length
```

In your terminal, you should see a single number as an output (`200` in our case).

### Getting an item at a given index from a JSON array with `jq`

Getting the first item of a JSON array is as simple as typing `jq '.[0]'`:

```sh
curl -s https://jsonplaceholder.typicode.com/todos | jq '.[0]'
```

To get the last item of an array, you can use `jq '.[-1]'`:

```sh
curl -s https://jsonplaceholder.typicode.com/todos | jq '.[-1]'
```

### Getting `n` elements of an array with `jq`

To get the first five elements, you can use a similar notation to Go’s slices:

```sh
curl -s https://jsonplaceholder.typicode.com/todos | jq '.[:5]'
```

When you write down `[:5]`, it means all the indices (starting at 0) **excluding the index of 5**. You can provide the starting index if you have a range in mind:

```sh
curl -s https://jsonplaceholder.typicode.com/todos | jq '.[2:5]'
```

The above command `jq ‘[2:5]’` includes three elements (the elements at index 2, 3, and 4).

### Selecting specific properties

Let’s switch things up! Many APIs include a large amount of data that we may not be interested in. Let’s use the [swapi API](https://swapi.py4e.com/documentation) to explore a more complex dataset.

If we retrieve the Star Wars characters using [the API's people endpoint](https://swapi.py4e.com/api/people/), we’ll see that the output puts all the characters in a `results` key. The top-level keys in the output JSON object include pagination data.

To solely include the people, we can write:

```sh
curl -s https://swapi.py4e.com/api/people/ | jq ".results"
```

The `jq “.results”` will process the JSON data and output the result array.

Then, we can use the previous commands we have learned. We could get the first character from the people API using the following command:

```sh
curl -s https://swapi.py4e.com/api/people/ | jq ".results | .[0]"
```

We can go even further than that. We can extract the keys we are interested in from the results array.

### Using the map function to pick specific keys from array items

`map` in `jq` will do something similar to the `map` array function in JavaScript. It applies a given transformation to each item in the array.

In `jq`, we can build new JSON objects with the properties we want using a shorthand like `{name, url}`. This syntax is equivalent to writing `{“name”: .name, “url”: .url}`. In our case, we can pass this shorthand to `map`:

```sh
curl -s https://swapi.py4e.com/api/people/ | jq ".results | map({name, url})"
```

It extracts the `results` properties and maps each item in the results array to a smaller object containing only the `name` and `url` fields. In your terminal, you should see an output that looks like the following snippet:

```js
[
  {
    "name": "Luke Skywalker",
    "url": "https://swapi.py4e.com/api/people/1/"
  },
  {
    "name": "C-3PO",
    "url": "https://swapi.py4e.com/api/people/2/"
  }
  // more data...
]
```

Beyond picking the properties we are interested in, we can filter the data using `jq`. Let’s look at how next!

### Filtering data using the `select` function in `jq`

Let’s imagine we are looking for one character in particular in our Star Wars API. We can use the `select` function to filter by a specific property, such as `name` in our case.

We can do the following:

- Use `curl` to retrieve data from a specified URL.
- Combine the `map` and `select` functions to look for our character.

```sh
curl -s https://swapi.py4e.com/api/people/ | jq '.results | map(select(.name == "Obi-Wan Kenobi"))'
```

In the above command, we will select items with a name that matches the string “Obi-Wan Kenobi”.

If we want to be less restrictive, we can use a regex:

```sh
curl -s https://swapi.py4e.com/api/people/ | jq '.results | map(select(.name | test("Leia"; "i")))'
```

We pipe the `.name` property of each item to the `test` function. The second argument of `test` is to make the matching pattern case-insensitive.

There are other functions we can use with select, such as `startswith` or `endswith`. For instance, let’s say we want all the movies whose title starts with 'The'. We could write the following command:

```sh
curl -s https://swapi.py4e.com/api/films/ | jq '.results | map(select(.title | startswith("The")))'
```

- We first pick the `.results` property from the JSON object returned by the API.
- Then, we use `map` to indicate this is an operation on each list item. For each list item, we want to select the films with titles that start with “The”.

### Sorting an array of objects with `jq`

Another useful feature of `jq` is the ability to sort data using the `sort_by` function.

Let’s go back to our Star Wars API. Let’s imagine we want to sort the characters by their height.

```sh
curl -s https://swapi.py4e.com/api/people/ | jq ".results | sort_by(.height | tonumber) | reverse | map({name, height})"
```

Let’s dissect that command:

- We curl the `people` endpoint from the Star Wars API.
- We pick the `results` property as it contains the array of characters on the first page.
- We sort the array by each element’s height. Because the API returns each character height as a string, we must convert each height to a number to obtain a correct sorting result.
- We pass to `sort_by` the property we want to use to sort our array. We can convert the property if needed. In the example, we use `tonumber` to cast each string into a number.
- Then, we can pipe the results to `reverse` if we want to reverse the order of the results. In our case, it will return an array from the character with the largest height to the character with the smallest height.
- Finally, we use `map` to extract the name and height of each character.

The output looks like:

```js
[
  {
    "name": "Darth Vader",
    "height": "202",
  },
  {
    "name": "Biggs Darklighter",
    "height": "183",
  },
  {
    "name": "Obi-Wan Kenobi",
    "height": "182",
  },
  // some more sorted data...
];
```

### Inspecting the keys of a payload

To get a quick idea of what keys a given JSON payload contains, you can use the `keys` function.

```sh
curl -s https://swapi.py4e.com/api/people/ | jq "keys"
```

In a glimpse, we get back an array of all the keys from the API response:

```js
["count", "next", "previous", "results"]
```

If we wanted to get an idea of what type of data the API has for a character, we could do:

```sh
curl -s https://swapi.py4e.com/api/people/ | jq ".results[0] | keys"
```

In this command, we look at the first element of the result array and get back its keys:

```js
// output from the previous curl command
[
  "birth_year",
  "created",
  "edited",
  "eye_color",
  "films",
  "gender",
  "hair_color",
  "height",
  "homeworld",
  "mass",
  "name",
  "skin_color",
  "species",
  "starships",
  "url",
  "vehicles"
]
```

## Cheat sheet and recap

Here's a small list of the different commands we tried in this post:

- `curl <URL> | jq .`: to pretty-print JSON from an API.
- `jq . <file.json>`: to process JSON data from a local file.
- `curl -s <URL> | jq length`: to count the number of items in an array (it will only work with JSON arrays).
- `curl -s <URL> | jq '.[0]'`: to get the first element of an array.
- `curl -s <URL> | jq '.[-1]'`: to get the last element of an array.
- `curl -s <URL> | jq '[:5]'`: to get the first N elements of an array (in this case 5).
- `curl -s <URL> | jq '.[2:5]'`: to get a slice of an array (indices 2 to 4 in this example).
- `curl -s <URL> | jq '.results'`: to extract a specific key from a JSON object.
- `curl -s <URL> | jq '.results[0]'`: to get the first object in an array of objects.
- `curl -s <URL> | jq '.results | map({name, url})'`: to map array and extract specific keys from each array item.
- `curl -s <URL> | jq '.results | map(select(.name == "Obi-Wan Kenobi"))'`: to filter array items using an exact match.
- `curl -s <URL> | jq '.results | map(select(.name | test("Leia"; "i")))'`: to filter array items using a regular expression.
- `curl -s <URL> | jq '.results | map(select(.title | startswith("The")))'`: to filter array items where their title starts with a given string.
- `curl -s <URL> | jq '.results | sort_by(.height | tonumber) | reverse | map({name, height})'`: to sort by height (casting the height into a number), using a descending order.
- `curl -s <URL> | jq 'keys'`: to list the keys at the root level.
- `curl -s <URL> | jq '.results[0] | keys'`: to list the keys of the first item in the `results` array.

## Conclusion

In this article, we explored the `jq` command-line utility. It is a powerful tool for processing and transforming JSON data. We’ve only brushed the surface of what `jq` can do. I hope this post provides some ideas on how to use it. As always, if you have any questions or want to chat about `jq` or other command-line tools, reach out on [Bluesky](https://bsky.app/profile/oliviac.dev)!

## Resources

- [`jq` Manual](https://jqlang.org/manual/)
- [`jq` Github page](https://github.com/jqlang/jq)
