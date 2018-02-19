---
layout: "posts"
title: "CSS Grid Layout: Off-canvas Navigation"
date: "2017-05-02 23:27"
permalink: /blog/:title/
published: true
categories: [blog, css, css grid, layout, a11y]
tags: [css, css grid layout]
abstract: How to create a responsive layout with off-canvas navigation using CSS Grid Layout. Also covers accessibility and hot dogs.
---


Off-canvas navigation is a popular UI interaction in repsonsive design. CSS Grid Layout makes adjusting the interaction for different device widths easy thanks to its ability to overlay items.

The final [CSS Grid Layout: Off-canvas demo](/CSS-Grid-Layout-Examples/off-canvas) can be accessed by clicking the link.

A stripped down version of this demo is available on [CodePen](https://codepen.io/josh_vogt/pen/GmMWgK/).

## The base HTML and CSS.

The basic structure of the page is fairly simple.

{% highlight html %}
<main class="grid">
  <header class="main-header">
  </header>
  <nav class="main-nav js-nav" id="main-nav">
  </nav>
  <div class="main-content">
  </div>
  <footer class="main-footer">
  </footer>
</main>
{% endhighlight %}

When the grid is defined, We'll want to assign the `main-nav` and `main-content` to the same `grid-row` regardless of viewport size. Whether or not the `main-nav` is visible and how wide it is will depend on the viewport.

{% highlight css %}
.grid{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px minmax(calc(100vh - 200px), auto) 120px;
  overflow: hidden;
}
{% endhighlight %}

The grid will have a simple structure of three rows; an 80px tall header, a fluid content area and a footer with a fixed height of 120px. The content area's height uses `min-max` and `calc` to set the minimum height to 100vh minus the combined height of the header and footer. This applies to all viewports. The grid's `overflow` property is set to `hidden` for large viewports that have the `main-content` area restricted to 90vw and centered in the viewport. This prevents the `main-nav` from leaking outside the container.

The simplified placement of the grid items is as follows:

{% highlight css %}
.main-header{
  grid-row: 1;
  grid-column: 1;
}

.main-nav{
  grid-row: 2;
  grid-column: 1;
  z-index: 200; /* sets the stacking order of this grid item above the .main-content */
}

.main-content{
  grid-row: 2; /* sets the placement of the grid-item to same row as .main-nav */
  grid-column: 1 / -1;
}

.main-footer{
  grid-row: 3;
  grid-column: 1 / -1;
}
{% endhighlight %}

Now that the basic grid is defined, some CSS is needed on the `main-nav` to push it off the viewport and a rule to trigger the animation when the class `is-active` is present.

{% highlight css %}
.main-nav{
  grid-row: 2;
  grid-column: 1;
  z-index: 200;

  /* new rules for off-canvas action */

  transform: translateX(-100%); /* 1 */
  transition: transform .2s linear; /* 2 */
  will-change: transform; /* 3 */
}

.main-nav.is-active{
  transform: translateX(0); /* 4 */
}
{% endhighlight %}

1. Moves the `main-nav` out of the viewport. When animating an element it's best to use `transforms` over offset properties like `top`, or `left` if you want a smooth animation.
2. Defines the transition on the animation, using a cubic-bezier for the timing function is probably going to feel nicer than one of the standard keyword based timing functions.
3. The `will-change` property allows CSS authors to provide a hint to the browser that a property will change which allows it to start optimzation before the change occurs. It's a potential antidote to a bad case of the Janks. [Read more on MDN](https://developer.mozilla.org/en/docs/Web/CSS/will-change).
4. When the `is-active` class is added to the element it will animate from the left across the `main-content` area.

### Bigger Screens

We'll need to adjust the grid layout from its mobile first version to support an unknown number of device widths.

Once the viewport gets too wide that it would be weird to have the off-canvas menu take up the full width so we'll want to adjust the grid. I've set it at 45em/720px. This only requires a change to the `grid` container:

{% highlight css %}
@media screen and (min-width: 45em){
.grid{
    grid-template-columns: 240px repeat(4, 1fr);
  }
}
{% endhighlight %}

That's it.

The `grid-row` and `grid-column` properties that defined the grid index placement in the mobile version still work in the 720px and wider version. By adjusting the values of the `grid-template-columns` property on the `.grid` class it just works on larger screens. The difference is the grid's first column is now set to 240px and the rest of the content can span across 4 equal units plus the 240px reserved for the nav. All of the rules that were applied to the `main-nav` class above are all still valid here as well.

### Bigger(er) Screens

For users with really, really wide screens (or about 118em/1900px) there will be enough screen real estate to have the menu always visible. Only two rules needs to be changed to do this:

{% highlight css%}
@media screen and (min_width: 118em){
  .main-nav{
    transform: translateX(0);
  }

  .main-content{
    grid-column: 2 / -1;
  }
}
{% endhighlight %}

This adjusts the positioning of the `main-content` area to start at the second line of the grid column axis. The previously defined position of the `main-nav` is still set to `1` which is where we want it to be. The only other CSS you need to apply is to hide the `<button>` used to toggle the visibility of the menu. The rule on `main-nav` resets the transform on the menu so it's always visible on the page.


## Accessibility, Interactions and JavaScript.

**Note (May 11, 2017):** Heydon Pickering has a very thorough article on his Inclusive Components site on [Menus and Menu Buttons](https://inclusive-components.design/menus-menu-buttons/) that you should read when implementing this pattern. I will update this post to add things I missed in the next few days.

Now that the basic grid is set up and the `main-nav` has been booted off to the side we need to provide the user with a button to display it. While it's possible to handle the visibility of an element with some clever CSS hacks is rarely a good idea. Unless you're using elements with baked in interaction like `<details>` and `<summary>` you'll need some JavaScript for the interactions and to properly handle accessibility.

To start, I need an element to toggle the visibility of the menu. The only option for that is the humble `<button>` element. For this demo, I'm going to place the `<button>` in the `main-header`.

{% highlight html %}
<header class="main-header">
  <button class="js-navigation btn" aria-haspopup="true" aria-owns="main-nav" aria-expanded="false">
  Menu
  </button>
</header>
{% endhighlight %}

[Marcy Sutton](https://marcysutton.com/links-vs-buttons-in-modern-web-applications/) and [Heydon Pickering](https://github.com/Heydon/inclusive-menu-button) have talked and written extensively about how a11y is negatively impacted when authors use an element other than `<button>` for this type of interaction.

- The `js-navigation` class exists as a hook for the JS function that will show the off-canvas navigation
- The `aria-haspopup` attribute indicates that the element has a hiddent context menu. More information on this attribute is available [here](https://www.w3.org/TR/wai-aria/states_and_properties#aria-haspopup)
- The `aria-owns` attribute accepts an ID and "define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship." More information on this attribute is available [here](https://www.w3.org/TR/wai-aria/states_and_properties#aria-owns)
- The `aria-expanded` attribute, "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.". More information on this attribute is available [here](https://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded)

**Note:** _If there's something incorrect or harmful in this approach to a11y please let me know._

### The `<nav>` element and visibility

On smaller viewports, that navigation menu is only visible when the user clicks on the Menu button. We have to go back and add an attribute to the `<nav>` to indicate it's visibility:

{% highlight html %}
<nav class="main-nav" id="main-nav" aria-hidden="true">
</nav>
{% endhighlight %}

On really wide viewports (say something like 1600px or wider) the navigation will always be visible. To make sure the aria role is acurate include a titch of JS to change the attribute on larger screens using `matchMedia`:

{% highlight javascript %}
var navCont = document.querySelector('.js-nav');

if (window.matchMedia("(min-width: 1600px)").matches) {
    navCont.setAttribute("aria-hidden", "false");
}
{% endhighlight %}

The value of the `aria-hidden` attribute will also need to be toggled when the visibility of the menu is toggled. The JavaScript will also handle the toggling of a class on `<nav>` that triggers the animation.

{% highlight javascript %}
var navTrigger = document.querySelector('.js-navigation');
var navCont = document.querySelector('.js-nav');

navTrigger.addEventListener('click', function(){
  navCont.classList.toggle('is-active');
  mainContent.classList.toggle('nav-active');

  if(navCont.classList.contains('is-active')){
      navCont.setAttribute("aria-hidden", "false")
      navTrigger.setAttribute("aria-expanded", "true")
    }
    else{
      navCont.setAttribute("aria-hidden", "true")
      navTrigger.setAttribute("aria-expanded", "false")
    }
})
{% endhighlight %}

As I mentioned earlier, Heydon Pickering released a small library to help with accessibility and buttons called [Inclusive Menu Button](https://github.com/Heydon/inclusive-menu-button). I'd strongly recommend following that project.

### The Animation

The layout for various screen sizes has been defined by the CSS Grid including the positioning of the off-canvas menu. Once the `is-active` class is added to the menu will animate in from the left.

## End

CSS Grid Layout makes creating the base layout for this pattern very easy. This is a simple layout that demonstrates how much you can accomplish with CSS Grid with a little code. The layout of each grid area isn't defined. Other elements within the grid can be layed out using nested grids, flexbox or any other layout method you feel like. You can see a page using this basic layout [here](http://joshvogt.co/CSS-Grid-Layout-Examples/off-canvas/). I'm not a designer as should be evident the second you click the link.

[Tuber: Uber for Hot Dogs](http://joshvogt.co/CSS-Grid-Layout-Examples/off-canvas/) (Using CSS Grid Layout)



---

#### Learn more about CSS Grid Layout.

The two easiest things to do if you want to learn more about CSS Grid Layout is follow [Rachel Andrew](https://twitter.com/rachelandrew) and [Jen Simmons](https://twitter.com/jensimmons) on Twitter and read their blogs.

- [Rachel Andrew's blog](https://rachelandrew.co.uk/archives/)
- [Jen Simmons' blog](http://jensimmons.com/writing)

#### Other Resources.

- [MDN - CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Grid Layout Module - Level 1](https://www.w3.org/TR/css3-grid-layout/)
- [Mozilla - Weird CSS Grid Demo](https://www.mozilla.org/en-US/developer/css-grid/)

Corrections or comments can be directed to my twitter account [@jshvgt](https://twitter.com/jshvgt).
