---
title: How to use the HTML specification to write better HTML
date: 2025-05-14
topics:
  - html
description: This article explores how to use the HTML specification to write better and more semantic HTML.
keywords:
  - html
---

When writing HTML, I often ask myself all kinds of questions. For instance, when should I use an `<article>` element? Is it valid HTML to use a `<p>` tag inside an `<li>`? The HTML specification has been my go-to resource for answering these questions, particularly the fourth section, ["The elements of HTML"](https://html.spec.whatwg.org/multipage/semantics.html#semantics). It is an incredible resource, but navigating it can feel a little overwhelming at first.

This blog post is here to help you find your way through the HTML specification and get the information you need. By understanding how to navigate the specification, you'll be able to write more semantic HTML that better describes your content.

## A first taste of the HTML specification and some key terms

There are different sections in the  [HTML specification](https://html.spec.whatwg.org/multipage/). The section I want to focus on in this blog post is [section 4 "The elements of HTML"](https://html.spec.whatwg.org/multipage/semantics.html#semantics). This section lists each HTML element and explains how and when to use it. It is full of examples and explanations that are invaluable when trying to write semantic HTML.

When browsing the spec, you'll notice a few terms, such as "Category" or "Content Model". Let's quickly clarify what those are.

### Category

As mentioned in the [spec](https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content), each HTML element belongs to zero or more categories. **A category describes what an element is**. There are seven categories in the HTML spec:

- [Metadata content](https://html.spec.whatwg.org/multipage/dom.html#metadata-content-2)
- [Flow content](https://html.spec.whatwg.org/multipage/dom.html#flow-content-2)
- [Sectioning content](https://html.spec.whatwg.org/multipage/dom.html#sectioning-content-2)
- [Heading content](https://html.spec.whatwg.org/multipage/dom.html#heading-content-2)
- [Phrasing content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2)
- [Embedded content](https://html.spec.whatwg.org/multipage/dom.html#embedded-content-category)
- [Interactive content](https://html.spec.whatwg.org/multipage/dom.html#interactive-content-2)

To sum things up:

- Flow content is the most common category. Almost every HTML element you use falls inside that category.
- You can think of phrasing content as text. It is the text contained within a paragraph, for instance. 
- Heading content is all the elements to declare a heading (e.g., `h1`, `h2`, etc.)
- Sectioning content refers to the elements used to declare a new section in a document.

### Content model

Content model describes **what content an element can contain**. Each HTML element can contain specific categories. Some HTML elements, such as [the heading tag](https://html.spec.whatwg.org/multipage/sections.html#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements), can contain only phrasing content. Whenever you wonder what you can put inside of an HTML element, you should look at the element's content model. 

## How to read an HTML specification entry

In this section, we'll discuss how to read an HTML specification entry. Let's say you're looking at [the specification for the `<li>` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element). Each element in the specification is described using a consistent set of sections. Here's a quick breakdown of some key sections you'll find for most elements:

- **Content model**: This tells you what can go inside the element tags. In the case of the `<li>` tag, its content model is "flow content", meaning it can contain almost any HTML element.
- **Content attributes**: The section lists the possible attributes you can specify on the element.
- **Contexts in which the element can be used**: It indicates where the element can be used. For instance, some elements are only valid within specific parent elements. In the case of the `<li>`, this section explains that `<li>` should be used inside of `<ol>`, `<ul>` or `<menu>` elements.

The specification also includes many clickable links to help you explore further. For example, if you need a refresher on what "flow content" means, click on the link, and you'll be taken to a detailed overview of that term.

## Building a better mental image of the different elements and their purpose

Beyond the category and content model, the HTML specification groups HTML elements into different subsections based on their purpose.

Here are some of the key subsections in [section 4 of the specification](https://html.spec.whatwg.org/multipage/#toc-semantics):

- [**Document metadata**](https://html.spec.whatwg.org/multipage/semantics.html#document-metadata): It contains elements used to describe the document itself rather than its content. It includes elements like the `<head>` element and `<title>`.
- [**Sections**](https://html.spec.whatwg.org/multipage/sections.html#sections): It groups the different HTML elements that create a new section of the document. Sections are the building blocks of your page layout. It contains elements such as `<body>`, `<article>` , `<section>`, `<nav>`, etc.
- [**Grouping content**](https://html.spec.whatwg.org/multipage/grouping-content.html#grouping-content): It contains elements such as `<p>` or `<ul>` that serve to group content together. For example, a  `<p>`  groups related sentences, while a `<ul>` wraps a list of items.
- [**Text-level semantics**](https://html.spec.whatwg.org/multipage/text-level-semantics.html#text-level-semantics): It contains all the elements that give more meaning to inline text, such as `<strong>`, `<time>`, or `<em>`.  
- [**Forms**](https://html.spec.whatwg.org/multipage/forms.html#forms): It contains all the elements to create HTML forms. This is where you can find all the different input types that exist.

There are other subsections for [embedded content](https://html.spec.whatwg.org/multipage/embedded-content.html#embedded-content) (for HTML elements such as `<video>` or `<img>`) and a [separate subsection for tables](https://html.spec.whatwg.org/multipage/tables.html#tables).

The way the different HTML elements are grouped within each subsection is a good reminder that each element has a particular purpose. If you're unsure which element to use, start by asking what role the content plays in your document. For example, if you’re organizing your site’s layout, check the "Sections" subsection first.

## Beyond the `<div>` element: Understanding semantic sections in HTML

[The `<div>` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element), found in the **“Grouping content”** subsection of the HTML specification, is a generic container used to group elements without conveying any semantic meaning.

Despite this, many websites still use `<div>` to wrap entire sections of content. Although valid, there are often better alternatives. The specification provides a set of HTML elements that we can use to describe the different sections more effectively based on their content. Think of each section as a container with its own specific purpose.

Here are some of the key semantic sectioning elements: 

-  [`<article>`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element): A self-contained and independent section of the document.  
- [`<section>`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element):   A **thematic grouping of content** typically including a heading that describes its content.
-  [`<nav>`](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element): A container for navigation links to other pages or sections of the same page.
-  [`<header>`](https://html.spec.whatwg.org/multipage/sections.html#the-header-element): Introduces a section or a page. It typically contains a logo, a main heading, or a table of contents.

Using a `<nav>` indicates that this section contains essential navigation links. Assistive technologies can use this information to detect navigation blocks more easily. Using a `<section>` signals that the enclosed content is thematically related and part of the overall document structure (e.g., a section containing all the services your business offers).

## The importance of headings to give structure to your document

Heading elements (`<h1>`, `<h2>`, etc.) are part of the "Sections" subsection. They are a crucial way to add structure to a document. [As mentioned in the spec](https://html.spec.whatwg.org/multipage/sections.html#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements), 'they represent headings for their sections'. There are some critical takeaways to take from that section:

- Headings are a way to create sections within your document. 
- The different heading levels match the level of nested sections. When you use a `<h1>`, it means the top-level section. If you use a `<h3>` after a `<h2>`, it means a sub-subsection. The levels are a way to add some **hierarchy** to your content.


Headings form a [**document outline**](https://html.spec.whatwg.org/multipage/sections.html#headings-and-outlines-2). An outline is like a table of contents of your different headings in the order they appear on the page. I once read that headings can be thought of as chapters in a book. 
Getting your headings right is a crucial first step toward making your document **more semantic and accessible**. 

Let's look at a quick example:

```tsx
<main>
  <h1>Super cool business</h1>
  <section>
    <h2>About</h2>
    <h3>Services</h3>
  </section>
  <section>
    <h2>Guides</h2>
    <h3>How to use our new AI product</h3>
  </section>
</main>
```

The outline of the following code would be:
```plaintext
- Super cool business
	- About
		- Services
	- Guides
		- How to use our new AI product
```


Some general rules:

- Do not create headings to make some text bigger. A heading marks a section of your document. It should help you determine whether the text is a heading or not.
- Don't forget to check the hierarchy of your headings. If you have an `h3` after an `h2`, does that make sense as a sub-subsection?
- Think of headings as a table of contents. This will help determine whether any headings are missing on the page. You can use an extension to quickly view the outline of your document. I use [HTML5 Outliner](https://chromewebstore.google.com/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo). 


## Let's use the spec to answer some HTML questions

Let's see how the spec can help answer some HTML questions.

### Question 1: Is it valid HTML to use a `<p>` tag inside a `<button>` element?

Can I write code like this?

```html
<button>
	<svg>/* some cool svg content */</svg>
	<p>See offer details</p>
</button>
```

Let's answer that step by step!
1. First, let's [look for the `<button>` element in the spec](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element).
2. To check what the element can contain, we can look at its content model. It states that it expects [**phrasing content**](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2) and that you should not nest any interactive element inside of a button. For instance, even if an `anchor` link is considered phrasing content, you should not nest it inside of a button. 
3. If you [search for the `<p>` tag inside the spec](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element), you'll see it is not phrasing content.
4. Therefore, we cannot use a `<p>` tag inside a `<button>`.

There are different options to fix the HTML. If it's about making the text take up its own line, we can add some CSS to the button, for instance.

### Question 2: How to caption or annotate an image?

Let's imagine we have this piece of code:

```html
<img src="https://cute-dog-pic.png" alt="A golden retriever holding a tennis ball in its mouth" />
<p>Our dog Poppy right before its 2nd birthday</p>
```

With CSS, we can make the `<p>` tag appear next to or underneath the picture. However, in the HTML, how do we group those two elements? Let's look at the specs!

1. We are trying to create a relationship between 2 elements. So, the ["Grouping content" subsection](https://html.spec.whatwg.org/multipage/grouping-content.html#grouping-content) might be the best place to look. 
2. There are lots of different elements (`<p>`, `<ul>`, `<ol>`) in this subsection. However, for our image, [the `<figure>` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) is likely the most suitable choice in our case.
3. We see that the `<figure>` represents self-contained content, making sense on its own, optionally accompanied by a caption.
4. In this case, we can use it to group our image with the text underneath, which we can then turn into a `<figcaption>`.

```html
<figure>
	<img src="https://cute-dog-pic.png" alt="A golden retriever holding a tennis ball in its mouth" />
	<figcaption>Our dog Poppy right before its 2nd birthday</figcaption>
</figure>
```


## Conclusion and quick tips

This is a brief overview of how to get started with the HTML spec and start using it. It may appear daunting at first, as it contains a lot of information. However, I hope this blog post gives you a glimpse of how useful it is when trying to mark up a document and choose what element to use. 

Some last quick tips:

- You can use the [element index](https://html.spec.whatwg.org/multipage/indices.html#elements-3) if you want to check for a specific HTML element. It will link you back to the specific section in the spec.
- When reading the spec, if you wonder what an element can contain, look at the **content model**.
- Read the examples as they often complement or expand on how to use the element.
- Ask yourself how to describe the content best when you choose an HTML element.

## Resources

- [HTML Specification](https://html.spec.whatwg.org/multipage/)
- [Great article by WebAIM on headings](https://webaim.org/techniques/headings/)
- [HTML5 Outliner Extension](https://chromewebstore.google.com/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo)



