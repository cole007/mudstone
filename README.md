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
* Minify HTML
* Compile haml templates
* Optimise css with Combine Media queries, uncss and csso
* Critcal path css generator
* Build directory for deployments
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

All of the core html/haml, css, js is stored in the _assets directoy.  Changing the env value in config.js will change the output directory for all of the files to the _build folder. Change the var and run gulp build before deploying to live. 


