# Jekyll PWA Starter

A simple Jekyll starter with PWA functionality baked in. This includes a manifest.json file and a sw.js file that caches an app shell.  

## What's Inside?
### Critical CSS
This Jekyll starter uses Filement Group's [LoadCSS](https://github.com/filamentgroup/loadCSS) to load the base CSS file after the inlined CSS has been parsed. The critical CSS is injected into the generated pages on build. Pages will each have their own critical CSS files and posts have their own as well. These are inlined along with the core CSS file that containes basic default styles. The critical CSS can found in `_includes/standard/new-head.html`.

```
  {% capture styles %}
    {% include critical/new-critical.css %}
  {% endcapture %}

  {% if page.layout == "posts" %}
  {% capture postsStyle %}
    {% include critical/posts.css %}
  {% endcapture %}
  {% endif %}

  {% if page.pagestyle %}
   {% capture critical %}
    {% include critical/{{ page.pagestyle }} %}
   {% endcapture %}
  {% endif %}
```

The CSS for critical styles can be written in Sass and compiled to the `_includes/critical` folder using Gulp. It is also possible to create a `styles.css` file in the `_includes/critical` folder. Critcal CSS is included in the generated page when the page front matter with the name of the critical CSS file:

```
---
layout: standard
pagestyle: home.css
---
```

### Progressive Web App
The project includes a simple Service Worker to cache the application shell. To include additional resources to the App Shell they need to be added in the `sw.js` file.

```
var filesToCache = [
 '/manifest.json',
 '/static-assets/js/home.js',
 '/static-assets/css/new-base.css',
 '/static-assets/js/modernizr_grid.js',
 '/'
];
```

To force the browser to update the Service Worker when the site has changed the `cacheName` variable needs to changed.

***Note:*** When developing locally in Chrome the network tabbed should have `Disable cache` checked and in the Application tab the Service Worker section should have `Update on Reload` checked.

### BrowserSync
Running the site using the default `gulp` task will use BrowserSync. It's a fair bit slower on Windows when compared to a Mac.

### Jekyll Admin
The [Jekyll Admin](https://github.com/jekyll/jekyll-admin) gem is included. The Jekyll admin GUI can be accessed from `localhost:3000/admin' when using `gulp` and 'localhost:4000/admin` when building the site using `jekyll serve`.

Default front matter for pages and posts can be configured in the `_config.yml` file. This will be visible in the admin UI when creating/editing pages or posts.

This is the defaults section from the `_config.yml` file:

```
# front matter defaults for pages and posts. These fields are also available for editing in the Jekyll Admin GUI. This is available at localhost:4000/admin
defaults:
  -
    scope:
      path: ""
    values:
      all: true
  - scope:
      path: ''
      type: pages
    values:
      page_only: true
      layout: standard
  - scope:
      path: ''
      type: posts
    values:
      layout: posts
      short-desc: short desciption of your post.
```
The site will need to be rebuilt if changes to the `_config.yml` are made before they will be available in the Admin UI.

### Internationalization Plugin
The [Jekyll Language Plugin](https://github.com/vwochnik/jekyll-language-plugin) is available but not configured on any of the existing pages. To add multi-lingual support add the desired language to the `_config.yml` file:

```
languages: ['en', 'fr']
language_data: data.i18n.lang.%%
language_includes_dir: _i18n
```

In the front matter of your page or post add the languages the page should support:

```
languages:
- en
- fr
subset: home
```

Translations should be added to the `lang.yml` file located at `_data/i18n/`. More information on the `jekyll-language-plugin` is availble on the repo's [Wiki](https://github.com/vwochnik/jekyll-language-plugin/wiki).



## Application Requirements

1. Ruby
2. Jekyll
3. Node.js
4. Gulp

## Running Jekyll Manually

1. Clone this repo
2. Open a Terminal/CMD window in the destination folder and run `bundle install`
2. Open a Terminal/CMD window in the destination folder and run `npm install`
3. Type `gulp` to build the Jekyll site


## Using Jekyll-Admin Extension

Info on the jekyll-admin extension is available here: https://github.com/jekyll/jekyll-admin

1. Open a Terminal/CMD window and run `bundle install`. This will install the jeykll-admin extension
2. To run an instance of Jekyll with the Admin interface run `gulp jekyll-build`
3. To run browser-sync with or without the Admin interface run `gulp` in a separate Terminal/CMD window

--end--
