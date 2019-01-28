# Jekyll + PWA + IndieWeb

A simple Jekyll starter with PWA functionality baked in. This includes a manifest.json file and a sw.js file that caches an app shell. Basic support for IndieWeb Blogging is included, including an RSS feed. Webmention support is included as well but requires a few extra steps to set up.

## Note ##
To get started with a clean version of the PWA Jekyll starter you can clone a clean branch:
```
git clone -b clean --single-branch https://github.com/dumaurier/pwa_jekyll.git
```

## Getting Started:
1. **Fork this repo.** If you're new to GitHub you can read about [forking repos](https://help.github.com/articles/fork-a-repo/#use-someone-elses-project-as-a-starting-point-for-your-own-idea) on GitHub's documentation.
2. **Edit your Information.**  Edit the contents of the `about.yml` file in `/_data/`. This will enable IndieWeb publishing on your site. You can read more about it in context of the this repo [here](#Indieweb).
3. **Create a Netlify account** Why Netlify? It's really nice. And they have a boss CMS available. This means you don't have to mess with code if you don't feel like it. You can either sign in or create your account using your existing GitHub account. Create your account at [Netlify Sign up](https://app.netlify.com/signup)
4. **Create your new site** Once you've signed up for Netlify, click the big `New site from Git` button.
    1. Select the `GitHub` option on the following screen.
    2. Select the repo you want to to deploy. Let's say you renamed this repo to `chowder` or something equally weird, click on that repo to select it for deployment.
    3. On the next screen, you can safely ignore all the other options and just hit `Depoy Site`. Netlify will assign a subdomain for your site and publish it. You either leave it as is, pick a more suitable subdomain or check Netlify's docs for instructions on [setting up a custom domain](https://www.netlify.com/docs/custom-domains/).

## Next Steps
**Using Netlify's CMS to write for your site**
Most of the configurations needed to use Netlify's CMS with your site are already included in this repo. However, some things most be handled through your Netlify account. Carefully follow the instructions for CMS authentication here: [authentication for Netlify](https://www.netlifycms.org/docs/add-to-your-site/#authentication).  Once you've followed the steps provided you should be able to access the CMS for your site at https://yourdomain.com/admin/

If things got weird or didn't work as expected please open an [issue](https://github.com/dumaurier/pwa_jekyll/issues) and I'll try to help.

## Changing the CSS
There isn't a lot of style here. Barely any at all. If you want to change things around you can run your site locally and make the changes you feel like. The SCSS file for the home page is in `src/sass/pages/home/home.scss` and the SCSS file for posts pages is in `src/sass/pages/posts/posts.scss`.

## What's Inside?
### Critical CSS
This Jekyll starter uses Filement Group's [LoadCSS](https://github.com/filamentgroup/loadCSS) to load the base CSS file after the inlined CSS has been parsed. The critical CSS is injected into generated pages on build. Pages will each have their own critical CSS files and posts have their own as well. These are inlined along with the core CSS file that containes basic default styles. The reference to critical CSS can found in `_includes/standard/new-head.html`.

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

The CSS for critical styles can be written in Sass and compiled to the `_includes/critical` folder using Gulp. It is also possible to create a `styles.css` file in the `_includes/critical` folder. Critcal CSS is included in the generated page when the documents front matter with the name of the critical CSS file matches an existing CSS file in `_includes/critical/:

```
---
layout: standard
pagestyle: home.css
---
```

### IndieWeb
This instance of Jekyll has support for the `h-card` microformat that is used by IndieWeb sites to identify content and authorship. You can read more about it on [IndieWeb.org](https://indieweb.org/h-card). Editing the contents in `_data/about.yml` will enable h-card microformats for IndieWeb publshing. 

***Note:*** The webmention entry in the `about.yml` file should match the domain *if* you set up an account on [webmention.io](https://webmention.io). 

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

### Webmentions
Webmentions allow other content creators to respond to your posts. The inital implementation is very basic. To get started with webmentions, go to [webmention.io](https://webmention.io) and sign in with your domain (this is assuming you've already edited the contents in `about.yml` and published your site on Netlify). 

The references required to use webmentions are already included in this starter project. However, you will need to add your domain name in the `about.yml` file under the `webmention` entry. When the site builds the endpoints for sending and receiving mentions will be updated with your information.

The `posts` layout includes a snippet of JavaScipt to fetch and render any webmentions after the static content has loaded. This layout also includes a simple form for visitors to manually send webmentions to your site. 

***Note:*** In order for a webmention to be successfully processed the submitted link must contain a link to the page accepting the mention. 


### Progressive Web App
The project includes a simple Service Worker to cache the application shell. To include additional resources to the App Shell they need to be added in the `sw.js` file. The service workers version will be updated each time Jekyll builds the site so the cache on the service worker will be automatically busted on each release.

If you don't want the service worker's cache busted remove this `const cacheName = 'sw-{{ site.time | date: '%s'}}';` from the top of the service worker file.  

```
var filesToCache = [
 '/manifest.json',
 '/static-assets/js/home.js',
 '/static-assets/css/new-base.css',
 '/static-assets/js/modernizr_grid.js',
 '/'
];
```

The service worker will also create a runtime cache when visitors to your site visit other pages on your site. Visited pages will also be available offline. 

***Note:*** When developing locally in Chrome the network tabbed should have `Disable cache` checked and in the Application tab the Service Worker section should have `Update on Reload` checked.

***Another Note:*** The runtime caching aspect of the service worker will fully lose its mind when you're developing locally with `BrowserSync` running. Run `bundle exec jekyll serve` if you want to test the runtime caching without `BrowserSync` flipping its lid. 

### BrowserSync
Running the site using the default `gulp` task will use BrowserSync. It's a fair bit slower on Windows when compared to a Mac.


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
