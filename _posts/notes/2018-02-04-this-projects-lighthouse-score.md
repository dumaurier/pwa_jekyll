---
title: This Projects Lighthouse Score
date: '2018-02-04 10:28pm'
layout: posts
categories: note
abstract: 'The Lighthouse score for this project is...really good. '
author: Josh Vogt
permalink: '/posts/:categories/:title/'
---
The scores for this project are: **Performance:** 98 / **PWA:** 91 / **Accessibility:** 100 / **Best Practices:** 100 / **SEO:** 100

When I ran this through Google Lighthouse I know there would be two things that would cause the score to drop: the site doesn't automatically re-direct to `https` and render blocking scripts.

The first happens because I'm using a sub-domain for the test site. If it runs under a custom domain this will be covered.

The second happens because of the Netlify identiy widget that's used to access Netlify's CMS.

[Gist with JSON Results](https://gist.github.com/dumaurier/8e3c56487685e7195853b5d82c230698)
