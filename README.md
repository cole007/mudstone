#Mudstone
![Mud](http://ournameismud.co.uk/css/images/maps-icon.png)

Frontend starter kit

######Requirements
- node >= 6.9.1
- npm >= 3.3.12
- gulp >= 3.91

######Installation

`npm install`

######Development mode

`npm start`

######Minify css and javascript
`npm run build`

##Gulp

* Compile sass (using libsass)
* Transpile es6 to es5 with rollup-babel-plugin
* Javascript linting with eslint
* Lossless image compression
* SVG symbol generater
* Compile pug templates (formerly jade)
* Compile scss (with postcss autoprefixer)
* SCSS linting with gulp-sass-lint
* Livereload and server with BrowserSync

###Workflow

To begin development run `npm start`, this will rebuild all of the assets, start browsersync and watch all of the assets for changes. The css and javascript is unminified during development. Before deploying code to a production environment run `npm run build` to compress scss/js and remove any source maps.

###NPM modules

For any npm modules that will be used in production use `npm install bla --save`, all other scripts (like gulp tasks) should be saved as dev dependencies (npm install bla --save-dev)

###NPM scripts

`npm start` - fresh build and server
`npm run compile` - does just that
`npm run yup` - aka `gulp`
`npm run server` - starts a server
`npm run images` - runs all of the image tasks (svgs, images etc)
`npm run etc` - build fonts, videos, misc tasks
`npm run scripts` - compile the scripts
`npm run build` - minifies css/js

###CSS
postcss plugins:
https://github.com/arccoza/postcss-aspect-ratio
https://github.com/peterramsing/lost
https://github.com/jonathantneal/postcss-write-svg
https://github.com/zhouwenbin/postcss-animation

node includes
https://github.com/modularscale/modularscale-sass

##Git methodology

At a core we should be working on four branches:

- master
- dev / backend
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
