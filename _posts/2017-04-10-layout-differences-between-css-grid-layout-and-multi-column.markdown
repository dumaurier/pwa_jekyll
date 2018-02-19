---
layout: "posts"
title: "Layout Differences Between CSS Grid Layout and Multi-Column Layout"
date: "2017-04-18 22:17"
permalink: /blog/:title/
published: true
categories: [blog, css, css grid, layout]
tags: [css, css grid layout]
abstract: A rundown of the obvious and no so obvious differences between CSS Grid layout and Multi-Column layout.
---


CSS Grid Layout and Multi-Column Layout share one key feature: the ability to layout content in columns. The important difference is multi-column is best suited for laying out the content of an element while grid layout is best suited for layout a page.

## Refer to the spec.

Multi-column allows CSS authors to create a type of container called a `column box`. As the spec says, "The content of a multicol element is flowed into its column boxes." Neither grid nor flexbox containers allow content to flow because they lack the concept of the column box. Depending on how the grid is defined CSS Grid Layout will assign each element on the grid container to its own grid track.

**From the Multi-Column Layout Spec:**

<blockquote cite="https://drafts.csswg.org/static/css-multicol/#introduction">
<p>This module describes multi-column layout in CSS. By using functionality described in this document, style sheets can declare that the content of an element is to be laid out in multiple columns.</p>
  <cite><a href="https://drafts.csswg.org/static/css-multicol/#introduction">CSS Multi-column Layout Module Level 1</a></cite>
</blockquote>

**From the CSS Grid Layout Spec:**

<blockquote cite="https://drafts.csswg.org/css-grid/#intro">
<p>
Grid Layout is a new layout model for CSS that has powerful abilities to control the sizing and positioning of boxes and their contents. Unlike Flexible Box Layout, which is single-axis–oriented, Grid Layout is optimized for 2-dimensional layouts: those in which alignment of content is desired in both dimensions.</p>
<cite><a href="https://drafts.csswg.org/css-grid/#intro">CSS Grid Layout Module Level 1</a></cite>
</blockquote>

### Multicol example.

This multicol example show two sentences flowing between two column boxes. The height of each column will be filled with content before it flows into the next column box.

<p data-height="520" data-theme-id="0" data-slug-hash="028aa7c1e4c221332024b555aa8f4394" data-default-tab="result" data-user="josh_vogt" data-embed-version="2" data-pen-title="CSS Multicol Example" class="codepen">See the Pen <a href="https://codepen.io/josh_vogt/pen/028aa7c1e4c221332024b555aa8f4394/">CSS Multicol Example</a> by Josh Vogt (<a href="http://codepen.io/josh_vogt">@josh_vogt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### CSS grid layout example.

This grid layout example show the same two sentences laid out in a simple two column grid. Instead of politing flowing between the two columns grid layout assigns each element to its own grid track. While the columns will be equal height their content will not.

<p data-height="520" data-theme-id="0" data-slug-hash="20b289f291828106d28228358e27bbe5" data-default-tab="result" data-user="josh_vogt" data-embed-version="2" data-pen-title="Grid 2 Column" class="codepen">See the Pen <a href="https://codepen.io/josh_vogt/pen/20b289f291828106d28228358e27bbe5/">Grid 2 Column</a> by Josh Vogt (<a href="http://codepen.io/josh_vogt">@josh_vogt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

The grid example gets even less compelling if the available contents exist in a single element as the grid container with 2 columns will create an empty grid track. Multicols ability to gracefully flow content between column boxes isn't something that can achieved with other CSS layout techniques. I'm sure if someone felt so inclined they could write some JS that would do it - but if CSS already does it so nicely there's really no reason to.

## A case where CSS grid layout might be better than multicol.

Lists are one of the few examples where CSS Grid Layout might work over Multicol though it depends on how you want the items to be displayed. Remember that multicol will let the content flow from column box to column box so the list will flow down to the bottom of the first column box then move to the top of the second column box.

<p data-height="265" data-theme-id="0" data-slug-hash="fdce8ea3c4254615d41d1b16db84c852" data-default-tab="result" data-user="josh_vogt" data-embed-version="2" data-pen-title="Multicol list" class="codepen">See the Pen <a href="https://codepen.io/josh_vogt/pen/fdce8ea3c4254615d41d1b16db84c852/">Multicol list</a> by Josh Vogt (<a href="http://codepen.io/josh_vogt">@josh_vogt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

On the other hand a grid container, using a simple two column grid, will place the the grid items automatically along the column axis until there are no more available grid cells available. It will then move down along the row axis to find the next grid cell. In the case of my alphabetical list of mostly real food the items will be place left to right on a per row basis.

<p data-height="265" data-theme-id="0" data-slug-hash="d9beba89e279fc15f1cf506f73d7293b" data-default-tab="result" data-user="josh_vogt" data-embed-version="2" data-pen-title="Grid List" class="codepen">See the Pen <a href="https://codepen.io/josh_vogt/pen/d9beba89e279fc15f1cf506f73d7293b/">Grid List</a> by Josh Vogt (<a href="http://codepen.io/josh_vogt">@josh_vogt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Resources.

- [CSS Grid Layout Module - Level 1](https://drafts.csswg.org/css-grid/)
- [CSS Multi-column Layout Module Level 1](https://drafts.csswg.org/static/css-multicol/)

Corrections or comment can be directed to my twitter account [@jshvgt](https://twitter.com/jshvgt).
