#Mudstone
![Mud](http://ournameismud.co.uk/css/images/maps-icon.png)

**Mudstone**, gulp based web framework

##Gulp 

* Compile sass (using libsass)
* Compile ES6 with babel/browserify
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

All of the source files (scss,javascript,js) are stored in the _assets directory.  Changing the env variable in gulp/config.js will change the root directory to '/_dist' rather than '/'.  Use the dist directory for deployments.  Only the compiled, minified and optimised files will be deployed from the dist directory.

##Javascript

Libs folder contains jquery and modernizer (touch test only)
plugsins folder contains any plugins used
behaviour folder contains any custom javascript
application.js includes boilerplate code for the js framework (http://www.creativebloq.com/javascript/get-your-javascript-order-4135704)
tools.js includes constructor functions for common ui patterns
All of the files in libs/behaviours + jquery from the vendor folder get merged into one file (dist/app.js)

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