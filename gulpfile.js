'use strict';

const	gulp					= require('gulp');
const	plumber				= require('gulp-plumber');
const	debug					= require('gulp-debug');
const	newer					= require('gulp-newer');
const gIf 					= require('gulp-if');
const	sourcemaps		= require('gulp-sourcemaps');
const	rename				= require('gulp-rename');
const	concat				= require('gulp-concat');
const	imgMin				= require('gulp-image');
const stylus				= require('gulp-stylus');
const	pug						= require('gulp-pug');
const csso					= require('gulp-csso');
const uglify				= require('gulp-uglify');
const remember			= require('gulp-remember');
const notify				= require('gulp-notify');
const cached 				= require('gulp-cached');
const autoprefixer 	= require('autoprefixer-stylus');
const del						= require('del');
const path					= require('path');
const browserSync 	= require('browser-sync').create();
const combiner			= require('stream-combiner2').obj;

//========================================
//================MODES===================
//========================================

let dev_mode = true;

//========================================
//==============CONFIGS===================
//========================================
const config = {
	stylus: {
		imports: [
			process.cwd() + '/src/stylus/_core/includes/vars.styl',
			process.cwd() + '/src/stylus/_core/includes/mixins.styl',
			process.cwd() + '/src/stylus/_includes/vars.styl',
			process.cwd() + '/src/stylus/_includes/mixins.styl'
		]
	}
}

const paths = {
	src: {
		assets: 	'assets/**/*',
		images:		'src/images/**/*.{png,jpeg,jpg,svg,gif}',
		styl: [
							'src/stylus/_settings/fonts.styl',
							'src/stylus/_core/settings/settings.styl',
							'src/stylus/_core/components/**/*.styl',
							'src/stylus/_core/blocks/**/*.styl',
							'src/stylus/_settings/settings.styl',
							'src/stylus/project_blocks/**/*.styl',
							'!src/stylus/**/__*.styl'
					],
		js: 	[
							'src/javascript/_core/head.js',
							'src/javascript/_core/scripts/**/*.js',
							'src/javascript/project_scripts/**/*.js',
							'src/javascript/_core/foot.js',
							'!src/javascript/**/__*.js'
					],
		pug:	[
							'src/pug/*.pug',
							'!src/pug/__*.pug'
					]
	},
	dest: {
		build: 			'./build',
		assets: 		'./build',
		pug: 				'./build',
		css: 				'./build/css',
		js: 				'./build/js',
		images: 		'./build/images',

	},
	watch: {
		assets: 	'./assets/**/*.*',
		styl: 		'./src/stylus/**/*.styl',
		js: 			'./src/javascript/**/*.js',
		pug: 			'./src/pug/**/*.pug',
		images: 	'./src/images/**/*.{png,jpeg,jpg,svg,gif}',
	}
};

//========================================
//==============TASKS=====================
//========================================

gulp.task('clean', () => {
	return del(paths.dest.build);
});

gulp.task('assets', () => {
	return gulp.src(paths.src.assets)
	// return gulp.src(paths.src.assets, {since: gulp.lastRun('assets')})
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(newer(paths.dest.assets))
			.pipe(debug({title:'assets'}))
			.pipe(gulp.dest(paths.dest.assets));
});

gulp.task('images', () => {
	return gulp.src(paths.src.images)
	// return gulp.src(paths.src.images, {since: gulp.lastRun('images')})
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(newer(paths.dest.images))
			.pipe(imgMin({
				pngquant: true,
				optipng: true,
				zopflipng: false,
			}))
			.pipe(gulp.dest(paths.dest.images));
});


gulp.task('css', () => {
	return gulp.src(paths.src.styl)
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(gIf(dev_mode, sourcemaps.init()))
			.pipe(cached('styl'))
			.pipe(stylus({
							import: config.stylus.imports,
							use: [autoprefixer({browsers: ['last 4 versions']	})]
						}))
			.pipe(remember('css'))
			.pipe(concat('styles.css'))
			.pipe(gIf(dev_mode, sourcemaps.write('.')))
			.pipe(gIf(!dev_mode, combiner(
				gulp.dest(paths.dest.css),
				csso(),
				rename({suffix: '.min'})
			)))
			.pipe(gulp.dest(paths.dest.css));
});


gulp.task('js', () => {
	return gulp.src(paths.src.js)
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(gIf(dev_mode, sourcemaps.init()))
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest(paths.dest.js))
			.pipe(gIf(!dev_mode, uglify()))
			.pipe(gIf(!dev_mode, rename({suffix: '.min'})))
			.pipe(gIf(dev_mode, sourcemaps.write('.')))
			.pipe(gulp.dest(paths.dest.js));
});

gulp.task('html', () => {
  return gulp.src(paths.src.pug)
		  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		  .pipe(pug({pretty: true}))
		  .pipe(gulp.dest(paths.dest.pug));
});

gulp.task('build:dev', gulp.series('assets', 'images', 'css', 'js', 'html'));

gulp.task('build:prod', cb => {
	dev_mode = false;
	// return gulp.series('clean', 'build:dev')(cb);
	return gulp.series('build:dev')(cb);
});

gulp.task('watch', () => {
	gulp.watch(paths.watch.assets, gulp.series('assets'));

	gulp.watch(paths.watch.styl, gulp.series('css'))
		.on('unlink', filepath => {
			let resolvedPath = path.resolve(filepath);
			let fPath = resolvedPath.slice(0, resolvedPath.length - 5) + '.css';
			remember.forget('css', fPath);
			delete cached.caches.styl[resolvedPath];
			console.log(`${path.resolve(filepath)} has been removed`);
		});

	gulp.watch(paths.watch.js, gulp.series('js'));
	gulp.watch(paths.watch.pug, gulp.series('html'));

	gulp.watch(paths.watch.images, gulp.series('images'));
});


gulp.task('serve', () => {
	browserSync.init({
			server: 'build'
	});

	browserSync.watch('build/**/*.*')
		.on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build:dev', gulp.parallel('serve', 'watch')));
gulp.task('default', gulp.series('build:prod', gulp.parallel('serve', 'watch')));
