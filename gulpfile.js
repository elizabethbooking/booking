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
    'client/bower_components/jquery/dist/jquery.js',
    'client/bower_components/angular/angular.js',
    'client/bower_components/angular-route/angular-route.js',
    'client/bower_components/angular-ui-router/release/angular-ui-router.js',
    'client/bower_components/moment/moment.js',
    'client/bower_components/underscore/underscore.js',
    'client/bower_components/pagination/pagination.js',   
    'client/bower_components/bootstrap/dist/js/bootstrap.js',
    'client/bower_components/dialog/ngDialog.min.js'
   
      ],
   login:[

      'client/app/js/modules/login.js',
      'client/app/js/factories/login.js',
      'client/app/js/directives/login.js',
      'client/app/js/controllers/login.js'
   
   ] ,  
  app   : [
    'client/app/js/modules/app.js',
    'client/app/js/factories/**/*.js',
    'client/app/js/directives/**/*.js',
    'client/app/js/controllers/**/*.js'
  ],
  admin : [
    'client/app/js/modules/admin.js',
    'client/app/js/factories/**/*.js',
    'client/app/js/directives/**/*.js',
    'client/app/js/controllers/**/*.js'
  ],
  app_lib_css   : [
    'client/bower_components/angular/angular-csp.css',
    'client/app/css/bootstrap/bootstrap.css'
  ],
  admin_lib_css   : [
    'client/bower_components/angular/angular-csp.css',
    'client/app/css/bootstrap/bootstrap.css',
    'client/app/css/libs/**/*.css',
    'client/app/css/compiled/*.css',
    'client/bower_components/dialog/css/ngDialog.min.css',
    'client/bower_components/dialog/css/ngDialog-theme-default.css'
  ],
  app_css : [
    'client/app/css/custom2.css'
  ],

  app_less  : [
    'client/app/less/app.less',
    'client/app/less/component/**/*.less',
    'client/app/less/app/**/*.less'
  ],
  admin_less: [
    'client/app/less/admin.less',
    'client/app/less/component/**/*.less',
    'client/app/less/admin/**/*.less'
  ]
};

gulp.task('login', function(){
  return gulp.src(files.login)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('login.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/public/js'))
});

gulp.task('libs', function(){
  return gulp.src(files.libs)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('libs.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/public/js'))
});

gulp.task('app', function(){
  return gulp.src(files.app)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/public/js'))
});

gulp.task('admin', function(){
  return gulp.src(files.admin)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('admin.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/public/js'))
});

gulp.task('app_lib_css', function(){
  return gulp.src(files.app_lib_css)
    .pipe(concat('app_lib.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('client/public/css'))
});

gulp.task('admin_lib_css', function(){
  return gulp.src(files.admin_lib_css)
    .pipe(concat('admin_lib.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('client/public/css'))
});
gulp.task('app_css', function(){
  return gulp.src(files.app_css)
    .pipe(concat('custom.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('client/public/css'))
});

gulp.task('app_less', function(){
  return  gulp.src(files.app_less)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('client/public/css'))
});

gulp.task('admin_less', function(){
  return  gulp.src(files.admin_less)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('client/public/css'))
});

gulp.task('browser-sync', function(){
  browserSync({
    proxy : "http://localhost:3000",
    port  : 3005
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
    [files.login,files.app, files.admin, files.app_less, files.admin_less,files.app_css , 'client/public/login.html','client/public/index.html', 'client/public/admin.html', 'client/public/templates/**/*'],
    ['login','app', 'admin', 'app_less', 'admin_less', reload]
  );
});

gulp.task('dev', ['login','libs', 'app', 'admin', 'app_css','app_lib_css', 'admin_lib_css', 'app_less', 'admin_less', 'server', 'browser-sync', 'watch']);
gulp.task('prod', ['login','libs', 'app', 'admin','app_css' ,'app_lib_css', 'admin_lib_css', 'app_less', 'admin_less', 'css', 'server']);

