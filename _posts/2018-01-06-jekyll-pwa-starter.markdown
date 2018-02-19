---
layout: "posts"
title: "Jekyll PWA Starter - early version"
date: "2018-01-06 09:27"
permalink: /blog/:title/
published: true
categories: [blog, pwa, jekyll]
tags: [pwa, jekyll]
abstract: I've started working on a Jekyll PWA starter. It's early but it works well. Update Jan 8, 2018 - I corrected the PWA errors. Everything is nice.
---



[Jekyll PWA Starter](https://github.com/dumaurier/pwa_jekyll)


This is an early version of a Jekyll + PWA starter I'm working on. It's still failing some basic Lighthouse tests because I haven't add all the correct icon sizes. The PWA just caches the app shell right now and does not do any runtime caching. I'm going to change this is an upcoming version.

An inexhaustive list of features:
- Simple service worker for caching app shell
- i18n ready to go courtesty of `jekyll-language-plugin`
- Built in support for critical CSS and LoadCSS
- Sass and Prefixer support
- Bundle and concat JS files
- Gulp tasks to help local development
- BrowserSync for um....syncing browsers.

An inexhaustive list of things left to add:
- Fix icons in `manifest.json`
- Create offline message
- Runtime caching of pages visited

A demo of the site is hosted on Netlify (which is super easy to use). [Visit Jekyll PWA demo](https://pwa-jekyll-starter.netlify.com/)
