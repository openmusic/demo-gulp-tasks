var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');

var buildDir = './build';
var demoDir = './demo';

module.exports = function(gulp) {

	gulp.task('build', ['build-js', 'build-html', 'build-data']);

	gulp.task('build-js', function() {

		// This is a "hack" to find if the top module is using browserify transforms as otherwise
		// we are not using them and things remain untransformed which is not cool at all.
		var transforms = [];
		
		try {
			var packageJSON = require( '../../package.json' );
			var hasTransforms = packageJSON.browserify !== undefined && packageJSON.browserify.transform !== undefined;

			if(hasTransforms) {
				transforms = packageJSON.browserify.transform;
			}
		} catch(e) {
			console.info('No browserify transforms found');
		}

		var b = browserify({
			entries: './demo/main.js',
			debug: true,
			transform: transforms
		});

		return b.bundle()
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(gulp.dest(buildDir));

	});


	gulp.task('build-html', function() {
		return gulp.src('demo/index.html')
			.pipe(gulp.dest(buildDir));
	});

	gulp.task('build-data', function() {
		return gulp.src(path.join(demoDir, 'data', '**'))
			.pipe(gulp.dest(path.join(buildDir, 'data')));
	});

	gulp.task('watch', function() {
		gulp.watch(['demo/**/*', 'index.js', 'src/**/*'], ['build']);
	});

	gulp.task('default', ['build', 'watch']);

};

