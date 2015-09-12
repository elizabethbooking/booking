var gulp, path, less, files, minifyCss, rename,
    sourcemaps, server, uglify, reload, browserSync;

path        = require('path');
gulp        = require('gulp');
less        = require('gulp-less');
uglify      = require('gulp-uglify');
concat      = require('gulp-concat');
minifyCss   = require('gulp-minify-css');
rename      = require('gulp-rename');
sourcemaps  = require('gulp-sourcemaps');

server      = require('gulp-express');
browserSync = require('browser-sync');
reload      = browserSync.reload;

files = {
  libs  : [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/moment/moment.js',
    'bower_components/underscore/underscore.js'
  ],
  app   : [
    'app/js/modules/app.js',
    'app/js/factories/**/*.js',
    'app/js/directives/**/*.js',
    'app/js/controllers/**/*.js'
  ],
  admin : [
    'app/js/modules/admin.js',
    'app/js/factories/**/*.js',
    'app/js/directives/**/*.js',
    'app/js/controllers/**/*.js'
  ],
  app_lib_css   : [
    'bower_components/angular/angular-csp.css',
    'app/css/bootstrap/bootstrap.css',
  ],
  admin_lib_css   : [
    'bower_components/angular/angular-csp.css',
    'app/css/bootstrap/bootstrap.css',
    'app/css/libs/**/*.css',
    'app/css/compiled/*.css'
  ],
  app_less  : [
    'app/less/app.less',
    'app/less/component/**/*.less',
    'app/less/app/**/*.less'
  ],
  admin_less: [
    'app/less/admin.less',
    'app/less/component/**/*.less',
    'app/less/admin/**/*.less'
  ]
};

gulp.task('libs', function(){
  return gulp.src(files.libs)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('libs.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
});

gulp.task('app', function(){
  return gulp.src(files.app)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
});

gulp.task('admin', function(){
  return gulp.src(files.admin)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('admin.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
});

gulp.task('app_lib_css', function(){
  return gulp.src(files.app_lib_css)
    .pipe(concat('app_lib.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'))
});

gulp.task('admin_lib_css', function(){
  return gulp.src(files.admin_lib_css)
    .pipe(concat('admin_lib.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'))
});

gulp.task('app_less', function(){
  return  gulp.src(files.app_less)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'))
});

gulp.task('admin_less', function(){
  return  gulp.src(files.admin_less)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'))
});

gulp.task('browser-sync', function(){
  browserSync({
    proxy : "http://localhost:3000",
    port  : 3001
  });
});

gulp.task('server', function(){
  server.run(['app.js']);

  gulp.watch(['gulpfile.js', 'app.js'], function(event){
    server.run();
  });
});

gulp.task('watch', function(){
  gulp.watch(
    [files.app, files.admin, files.app_less, files.admin_less, 'public/index.html', 'public/admin.html', 'public/templates/**/*'],
    ['app', 'admin', 'app_less', 'admin_less', reload]
  );
});

gulp.task('dev', ['libs', 'app', 'admin', 'app_lib_css', 'admin_lib_css', 'app_less', 'admin_less', 'server', 'browser-sync', 'watch']);
gulp.task('prod', ['libs', 'app', 'admin', 'app_lib_css', 'admin_lib_css', 'app_less', 'admin_less', 'css', 'server']);

