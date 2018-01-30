# Jekyll + PWA + IndieWeb

A simple Jekyll starter with PWA functionality baked in. This includes a manifest.json file and a sw.js file that caches an app shell. Basic support for IndieWeb Blogging is included, including an RSS feed. Displaying webmentions is included as well but requires a few extra steps to set up.

## Getting Started:
1. **Fork this repo.** If you're new to GitHub you can read about [forking repos](https://help.github.com/articles/fork-a-repo/#use-someone-elses-project-as-a-starting-point-for-your-own-idea) on GitHub's documentation.
2. **Rename the repo.**  This isn't 100% necessary but you should rename if you want to host it on [Netlify](https://netlify.com) without setting up a custom domain. Follow [these instructions](https://help.github.com/articles/renaming-a-repository/) to rename the forked repo.
3. **Edit your Information.**  Edit the contents of the `about.yml` file in `/_data/`. This will enable IndieWeb publishing on your site. You can read more about it in context of the this repo [here](#Indieweb).
4. **Create a Netlify account** Why Netlify? It's really nice. And they have a boss CMS available. This means you don't have to mess with code if you don't feel like it. You can either sign in or create your account using your existing GitHub account. Creating your account at [Netlify Sign up](https://app.netlify.com/signup)
5. **Create your new site** Once you've signed up for Netlify, click the big `New site from Git` button.
    1. Select the `GitHub` option on the following screen.
    2. Select the repo you want to to deploy. Let's say you renamed this repo to `chowder` or something equally weird, click on that repo to select it for deplayment.
    3. On the next screen, you can safely ignore all the other options and just hit `Depoy Site`. Netlify will assign a subdomain for your site and publish it. You either leave it as is, pick a more suitable subdomain or check Netlify's docs for instructions on [setting up a custom domain](https://www.netlify.com/docs/custom-domains/).

## Next Steps
**Using Netlify's CMS to write for your site**
Most of the configurations needed to use Netlify's CMS with your site are already included in this repo. However, some things most be handled through your Netlify account. Carefully follow the instructions for CMS authentication here: [authentication for Netlify](https://www.netlifycms.org/docs/add-to-your-site/#authentication).  Once you've followed the steps provided you should be able to access the CMS for your site at https://yourdomain.com/admin/

If things got weird or didn't work as expected please open an [issue](https://github.com/dumaurier/pwa_jekyll/issues) and I'll try to help.

## Changing the CSS
There isn't a lot of style here. Barely any at all. If you want to change things around you can run your site locally and make the changes you feel like. The SCSS file for the home page is in `src/sass/pages/home/home.scss` and the SCSS file for posts pages are in `src/sass/pages/posts/posts.scss`.

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

### IndieWeb
This instance of Jekyll has support for the `h-card` microformat that is used by IndieWeb sites to identify content and authorship. You can read more about it on [IndieWeb.org](https://indieweb.org/h-card). Editing the contents in `_data/about.yml` will enable h-card microformats for IndieWeb publshing.

The content of the file look like this:
```
me:
  name: Josh Vogt
  bio: >-
    This is a bio for use with microformats h-card. This helps other
    machines understand your content for IndieWeb publishing.
  webmention: pwa-jekyll.netlify.com
social:
  - name: twitter
    url: 'https://twitter.com/jshvgt'
    class: u-url;
  - name: github
    url: 'https://github.com/dumaurier'
    class: u-url;
  - name: email
    url: 'mailto:joshvogt@gmail.com'
    class: u-email
  - name: sms
    url: 'sms:+14169671111'
    class: u-tel
  - name: my site
    url: 'https://pwa-jekyll-starter.netlify.com/'
    class: u-url
```

Include your own details in this file. You don't need to include any social network information if you don't want to but you'll need at least one available if you want to be able to sign in to site using just you domain address. It's worth it.

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
      abstract: short desciption of your post.
      author: Josh Vogt
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
***Note:*** If you run the site through Netlify and use Netlify CMS you don't need a darn thing.

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
