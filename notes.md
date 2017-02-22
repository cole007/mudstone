#Mudstone Documentation


####TLDR;
`npm start` and you're good to go! 

**The only change you will need to make to the config is the browsersync proxy url.**
`gulp/paths.config.cms`

- To deploy a **static build** run `npm run build`.  This will compile the assets to deploy/public
- To deploy to **craft** use `npm run build:cms`, this will do the same but the nunjucks assets will not be moved to deploy/public


##Folder Structure

####Code assets
- _assets/scss/*.scss 
- _assets/html/nunjucks/*.njk
- _assets/js/*.js
 
####Static assets
- _assets/images/site/*.[.jpg, .png]
- _assets/images/svg-symbols/*.svg
- _assets/images/svg-assets/*.svg
- _assets/favicons/
- _assets/fonts/


####Files
- `.babelrc` Babel settings for gulp tasks only
- `.eslintrc` Eslint settings
- `.jsbeautifyrc` Beautify settings
- `gulp.babel.js` The gulps tasks entry point
- `package.json` Dependencies
- `yarn.lock` The yarn lock file!

##Tasks

In the following instructions we use the images task as an example. The same steps and requirements apply to all of the gulp tasks, except for bundling the javascript, which is handled by webpack.

Each task is comprised of four components.

####Paths

`gulp/paths.config.dev.json`

```
  "images": {
    "src": "images/site",
    "dest": "dist/images"
  },
```

A json object with a src and dest key/value pair. The source path is relative from the assets directory, and the dest path is relative from public

####Task config

`gulp/task.config.js`

```
	images: {
		task: 'asset',
		watch: true,
		extensions: ['jpg', 'png', 'svg', 'gif']
	},
```
- task: *String*, type of task, `'code'` or `'asset'` (asset tasks run before code tasks)  **required** 
- watch: *Boolean*, should gulp watch for changes 
- extensions: *Array* of file extensions **required** 

####Gulp task
`gulp/tasks/images.js`

```
/*
	import required modules
*/
import changed from 'gulp-changed'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import browserSync from 'browser-sync'
import { getPaths } from '../libs/utils'

/*
	export named function
*/
export function imagesTask() {
	/* see comment below about paths */
	const paths = getPaths('images')
	
	return gulp.src(paths.src)
		.pipe(changed(paths.dest))
		.pipe(imagemin())
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

/*
	expose gulp task
*/
gulp.task('images', imagesTask)
```

*Note:* Sometimes you only want to pass in a single level of files into the `gulp.src()` function.  For example the scss task:

```
/// other scss dependencies
import path from 'path'


// paths object
const paths = {
	src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.scss.src, '*.scss'),
	dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.scss.dest)
}

```


####Export Gulp task
`gulp/tasks/index.js`

```
export { images } from './images'
```



And that's it! 

##Javascript
https://webpack.js.org/configuration/

##Environments

There are three possible environments, each configured with a paths.config.*env*.json file.  When they are merged together it is a shallow merge, so all of the settings for a given object will be required. 

- `paths.config.dev.json` This is the main one, most of the paths don't change so everything must go in this file

```
{
  "baseDir": "./deploy/public",
  "dest": "./deploy/tmp",
  "dist": "./deploy/tmp/dist",
  ...etc etc
}
```

- `paths.config.production.json` Here we can overwrite some paths, and server settings

```
{
  "baseDir": "./deploy/public",
  "dest": "./deploy/public",
  "dist": "./deploy/public/dist",

  
	"browserSync": {
		"server": {
			"baseDir": "deploy/public",
      "index": "index.html"
		}
	}
}

```

- `paths.config.cms.json`A few more settings need to be changed for cms mode

```
{
  "baseDir": "./deploy/public",
  "dest": "./deploy/public",
  "dist": "./deploy/public/dist",
  
	"browserSync": {
		"server": {
			"baseDir": "deploy/public",
      "index": "index.php"
		},
    "proxy": "http://local.ournameismud.co.uk"
	},

  "symbols": {
    "src": "images/svg-symbols",
    "dest": "dist/images",
    "fileName": "_symbols.twig",
    "fileDest": "../deploy/craft/templates/includes"
  },

  "tags": {
    "src": "./deploy/craft/templates/wrapper/_layout.twig",
    "dest": "./deploy/craft/templates/wrapper/",
    "css": "/dist/css/",
    "js": "/dist/js/"
  }
}
```

##NPM Scripts

All of the standard gulp tasks are available, i.e. `gulp images`. The following npm scripts are just pointers to gulp tasks (npm start === gulp), rather pointless when you think about it, but hey ho! 

- `npm start` Empty build folder, rebuild and watch everything
- `npm run dev` Same as above, without rebuilding everything
- `npm run cms` Same as start but with the environment set to cms
- `npm run build` Build all the things in production mode
- `npm run build:cms` As above but in production cms mode  

Any task can be run independantly in any of the enviroments.

`gulp images --cms`

`gulp images --production`

`gulp images --cms --production`