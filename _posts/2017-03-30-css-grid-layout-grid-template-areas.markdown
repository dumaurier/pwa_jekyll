---
layout: "posts"
title: "CSS Grid Layout - Understanding Grid Template Areas"
date: "2017-04-2 22:13"
permalink: /blog/:title/
published: true
categories: [blog, css, css grid, layout]
tags: [css, css grid layout]
abstract: An introduciton on the basics of grid-template-areas in CSS Grid layout. It's one the most powerful features in the spec.
---


This article references the new [CSS Grid Layout Module](https://drafts.csswg.org/css-grid/). More specifically, it covers the [grid-template-areas](https://drafts.csswg.org/css-grid/#grid-template-areas-property) property. It is a powerfuly property that lets you visualize your grid in your CSS and explictly place grid items in a named area.

## Defining a simple grid.

As simple grid layout could be a page with a sidebar and large content container surronded by a header and footer.The basic markup would consist of something like this:

{% highlight html %}
<main class="grid-container">
  <header class="header"></header>
    <nav class="nav"></nav>
    <section class="content"></section>
  <footer class="footer"></footer>
</main>
{% endhighlight %}

The `header` and `footer` will span the full width of the container while the sidebar will take up about a 25% of the container and the content will fill the rest. To express this with `grid-template-areas` I'll need to apply the following CSS the the `grid-container`:

{% highlight css %}
.grid-container{
  display: grid;                      /* 1 */
  grid-template-columns: 1fr 3fr;     /* 2 */
  grid-template-rows: 4rem auto 3rem; /* 3 */
  grid-gap: 20px;                     /* 4 */
  grid-template-areas:                /* 5 */
    " header header "
    " nav content "
    " footer footer "
  ;
}
{% endhighlight %}

1. Set the `display` property to `grid`.
2. Use the `grid-template-columns` property to set the number of coumns and define their width (in this exampe I'm using the new [fr unit](https://www.w3.org/TR/2011/WD-css3-values-20110906/#fr-unit) to set the width of the first column to 1/4 of the available width and content section to 3/4 of the available width.
3. The `grid-template-rows` property can be used to define the height of the rows. In this example the `header` and `footer` will take 4rem and 3rem respectivly and the body content will take up the remaining available space.
4. The `grid-gap` property defines the grid's gutters and is shorthand for `grid-column-gap` and `grid-row-gap`.
5. This is the fun part. `grid-template-areas` defines the areas available in the grid. The name given to grid areas are arbitrary but should be sensible. The `grid-template-areas` also provides a crude visual representation of the page layout.

Child elements of a grid are assigned to their location using the `grid-area` property on the child elements. This is a very simple example but it already demonstrates the power the CSS Grid Layout. Simply changing the name a classes `grid-area` can drastically change the layout.

{% highlight css %}
.header{
 grid-area: header;
}

.nav{
  grid-area: nav;
}

.content{
  grid-area: content;
}

.footer{
  grid-area: footer;
}
{% endhighlight %}

Changing the `grid-area` in the CodePen below can really mess with the layout. In a good way.

<p data-height="420" data-theme-id="0" data-slug-hash="NpozaQ" data-default-tab="result" data-user="josh_vogt" data-embed-version="2" data-pen-title="Basic CSS Grid Layout" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/josh_vogt/pen/NpozaQ/">Basic CSS Grid Layout</a> by Josh Vogt (<a href="http://codepen.io/josh_vogt">@josh_vogt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Creating a nested grid.

CSS Grid Layout Level 1 was initially meant to include subgrid layout as well but as Rachel Andrew has pointed out, this have been moved to [Level 2 of the CSS Grid specification](https://rachelandrew.co.uk/archives/2017/03/16/subgrid-moved-to-level-2-of-the-css-grid-specification/). However, creating a nested grid is a simple as applying `display: grid;` to an element whose parent is a grid container. In this example the simple layout above will have its `content` grid-area contain its own two-column grid.

{% highlight css %}
.content{
  grid-area: content; /* from the previous example */
  display: grid;
  grid-template-columns: 1fr 1fr; /* two columns of equal width */
  grid-gap: 10px;
}
{% endhighlight %}

The nested grid will now contain a two-column grid of items, each column will take 50% of available space.

<p data-height="420" data-theme-id="0" data-slug-hash="RpveZB" data-default-tab="result" data-user="josh_vogt" data-embed-version="2" data-pen-title="Basic CSS Grid Layout with nested grid" class="codepen">See the Pen <a href="http://codepen.io/josh_vogt/pen/RpveZB/">Basic CSS Grid Layout with nested grid</a> by Josh Vogt (<a href="http://codepen.io/josh_vogt">@josh_vogt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Learn more about CSS Grid Layout.

The two easiest things to do if you want to learn more about CSS Grid Layout is follow [Rachel Andrew](https://twitter.com/rachelandrew) and [Jen Simmons](https://twitter.com/jensimmons) on Twitter and read their blogs.

- [Rachel Andrew's blog](https://rachelandrew.co.uk/archives/)
- [Jen Simmons' blog](http://jensimmons.com/writing)

### Other Resources.

- [MDN - CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Grid Layout Module - Level 1](https://www.w3.org/TR/css3-grid-layout/)
- [Mozilla - Weird CSS Grid Demo](https://www.mozilla.org/en-US/developer/css-grid/)

Corrections or comment can be directed to my twitter account [@jshvgt](https://twitter.com/jshvgt).
