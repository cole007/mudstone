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
* Optimise css with Combine Media queries, uncss and csso
* Critcal path css generator
* Build task for deployment directory
* Watch with Browsersync for live reload and server
* Google page insights 

##Scss 

Boilerplate setup to use Bourbon (via node)

##Setup

Make sure you have Node.js and gulp installed 

######From the terminal run
```
 npm install
 gulp
 
```

See gulp/configs.js for paths and files

##Folder Structure

All of the source files (scss,javascript,js) are stored in the _assets directory.  Changing the env variable in gulp/config.js will change the root directory to '/_dist' rather than '/'.  Use the dist directory for deployments.  Only the compiled, minified and optimised files will be deployed from the dist directory.