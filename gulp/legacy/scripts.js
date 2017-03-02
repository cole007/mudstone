/*

	yarn add gulp-uglify gulp-concat --dev

	TASK_CONFIG

*/



	// scripts: {
	// 	extensions: ['js'],
	// 	task: 'code',
	// 	watch: true,
	// 	output: 'bundle.js',
	// 	folder: 'js'
	// }


/*

	paths.config.dev
	
*/



	// "scripts": {
  //   "src": [
  //     "./_assets/js/libs/jquery-1.11.3.min.js",
  //     "./_assets/js/libs/underscore-min.js",
  //     "./_assets/js/plugins/*.js",
  //     "./_assets/js/application.js",
  //     "./_assets/js/tools.js",
  //     "./_assets/js/behaviours/*.js""
  //   ],
  //  	"dest": "dist/js",
  // },


/*

	tasks/scripts.js
*/

	// import gulp from 'gulp'
	// import uglify from 'gulp-uglify'
	// import concat from 'gulp-concat'
	// import gulpif from 'gulp-if'
	// import sourcemaps from 'gulp-sourcemaps'
	// import browserSync from 'browser-sync'
	// import path from 'path'
	// import { handleErrors } from '../libs/utils'

	// export function scriptsTask() {

	// 	const paths = {
	// 		src: PATH_CONFIG.scripts.src,
	// 		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.scripts.dest)
	// 	}

	// 	return gulp.src(paths.src)
	// 		.pipe(gulpif(!global.production, sourcemaps.init()))
	// 		.on('error', handleErrors)
	// 		.pipe(gulpif(global.production, uglify()))
	// 		.pipe(concat(TASK_CONFIG.scripts.output))
	// 		.pipe(gulpif(!global.production, sourcemaps.write('./')))
	// 		.pipe(gulpif(global.production, rename({
	//     	suffix: `.${TASK_CONFIG.stamp}`
	// 		})))
	// 		.on('error', handleErrors)
	// 		.pipe(gulp.dest(paths.dest))
	// 		.pipe(browserSync.stream())
	// }


	// gulp.task('scripts', scriptsTask)


/*
	tasks/index.js
*/

	// export { scriptsTask } from './scripts'


/*
	Replace the task config conditional in tasks/watch.js
*/

	// if(taskConfig) {
	// 	const srcPath = typeof taskConfig.folder !== 'undefined' ? path.resolve(process.env.PWD, PATH_CONFIG.src, taskConfig.folder) :
	// 		path.resolve(process.env.PWD, PATH_CONFIG.src, taskPath.src)
	// 	const globPattern = '**/*' + (taskConfig.extensions ? '.{' + taskConfig.extensions.join(',') + '}' : '')
	// 	watch(path.join(srcPath, globPattern), watchConfig, function () {
	// 		tasks[`${taskName}Task`]()
	// 	})
	// }
