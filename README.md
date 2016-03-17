#Mudstone
![Mud](http://ournameismud.co.uk/css/images/maps-icon.png)

**Mudstone**, gulp based web framework

##Gulp 

* Compile sass (using libsass)
* Compile ES6 with babel/browserify
* Uglify and concatenate javascript assets
* Sourcemaps
* Optimise Images
* Sprite generator
* SVG sprites, with png sprite fallback
* SVG to icon font
* SVG symbol sprites (svgstore)
* Compile jade templates
* Optimise css with uncss and clean css
* Html validator
* Critcal path css generator
* Build task for deployment directory
* Watch with Browsersync for live reload and server

##SCSS 

Boilerplate setup to use Bourbon (via node)
Autoprefixer used for... wait for it... prefixing

##Setup

Make sure you have Node.js and gulp installed 

######From the terminal run
```
 npm install
 gulp build - this will run all of the tasks (sass, jade, scripts, sprites, icons, fonts, images)
 gulp - starts server, watches css,js,jade et al
 
```

See gulp/configs.js for paths and files

##Folder Structure

All of the site files are stored in the _assets directory

During development (see gulp/config.js) files are published to a tmp directory

For production every is built in the deploy directory

##Javascript

-  /_assets/js/app.js is the main entry point
-  /_assets/js/dependencies/* contains the namespace function the data-behaviour method
-  /_assets/js/helpers/* small utility functions
-  /_assets/js/modules/* UI modules and page functionality

## NPM packages included:

- jQuery (https://github.com/jquery/jquery)
- lodash (https://www.npmjs.com/package/lodash)
- tweezer (https://github.com/jaxgeller/tweezer.js) 
- local-links (https://www.npmjs.com/package/local-links)
- lory-js (http://meandmax.github.io/lory/)
- verge (https://www.npmjs.com/package/verge)
- webfontloader (https://www.npmjs.com/package/webfontloader)
- layzr.js (https://github.com/callmecavs/layzr.js/tree/master)

To use a NPM module use the es6 import syntax

`import $ from 'jquery';`

`import _ from 'lodash';`


## Non es6/common js plugins

If you need to use any old school plugins, you now can.  Any files in 'js/libs' will be merged together and concatenated to the start of the final output js file.

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