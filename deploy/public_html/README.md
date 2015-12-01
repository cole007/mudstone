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
Autoprefixer used for... wait for it... prefixing

##Setup

Make sure you have Node.js and gulp installed 

######From the terminal run
```
 npm install
 gulp
 
```

See gulp/configs.js for paths and files

##Folder Structure

All of the source files (scss,javascript,js) are stored in the _assets directory.  

##Javascript

Vendor folder contains jquery and modernizer (touch test only)
Libs folder contains any plugins used
Behaviour folder contains any custom javascript
All of the files in libs/behaviours + jquery from the vendor folder get merged into one file (dist/app.js)
application.js based on http://www.creativebloq.com/javascript/get-your-javascript-order-4135704 