#Mudstone
![Mud](http://ournameismud.co.uk/css/images/maps-icon.png)

**Mudstone**, gulp based web framework

##Gulp 

* Compile sass (using libsass)
* Uglify and concatenate javascript assets
* JS Hint
* Sourcemaps
* Optimise Images
* Sprite generator
* SVG sprites, with png sprite fallback
* SVG to icon font
* SVG symbol sprites (svgstore)
* Compile jade templates
* Optimise css with uncss and clean css
* Critcal path css generator
* Build task for deployment directory
* Watch with Browsersync for live reload and server
* Google page insights 

##Scss 

Boilerplate setup to use Bourbon (via node)
Autoprefixer used for... wait for it... prefixing

##Setup

Make sure you have Node.js and gulp installed 

######From the terminal run
```
 npm install
 gulp build - this will move any fonts/scripts into the working directory (tmp or deploy)
 gulp - starts server, watches css,js,jade et al
 
```

See gulp/configs.js for paths and files

##Folder Structure

All of the site files are stored in the _assets directory

During development (see gulp/config.js) files are published to a tmp directory

For production everything is built in the deploy directory

##Javascript

-  /_assets/js/application.js contains boilerplate code (data-behaviour method, etc)
-  /_assets/js/tools.js useful utils functions/objects
-  /_assets/js/plugins/* third party plugins (please use unminified versions)
-  /_assets/js/libs/* third party libraries (jquery, modernizr, lodash)
-  /_assets/js/behaviours/* site specific functions

##Git methodology

At a core we should be working on four branches:

- master
- dev
- deploy/staging
- deploy/production

Dev work should be merged into master before going into deployment.

Any extra branches should be feature-specific and named accordingly, e.g. 

- feature/nav
- feature/add-on-x

Once completed a feature branch should be merged into master and removed. Ideally when logging time we should be adding comments related to the feature(s) we are working on.

###Tips
`git branch` - list branches in a repository  
`git branch feature/nav` - create new git branch  
`git branch -D feature/nav` - create new git branch  
`git checkout feature/nav` - moves branch and updates working directory  
`git merge feature/nav` - merge development branch into master (must checkout into master first)  