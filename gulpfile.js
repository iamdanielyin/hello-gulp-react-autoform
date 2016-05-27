/**
 * Gulp构建脚本
 * @author yinfxs
 * @time 2016-05-26 11:08:16
 */

'use strict';

const gulp = require('gulp'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence');

// 前端样式处理任务
gulp.task('styles', function () {
    return gulp.src('src/public/styles/**/*.css')    //引入所有前端样式文件
        .pipe(concat('autoform.css'))           //合并样式文件
        .pipe(cleanCSS())                  //压缩合并文件
        .pipe(rename({suffix: '.min'}))   //重命名压缩文件
        .pipe(gulp.dest('./dist/'))      //输出压缩后的文件
    // .pipe(notify({message: '前端样式处理完成'}));
});

// 前端网页压缩处理任务
gulp.task('htmls', function () {
    return gulp.src('src/*.html')    //引入所有前端网页文件
        .pipe(htmlmin({collapseWhitespace: true}))           //压缩网页文件
        .pipe(gulp.dest('./dist/'))      //输出压缩后的文件
    // .pipe(notify({message: '前端网页压缩处理完成'}));
});
// 前端模块处理任务
gulp.task('scripts', function () {
    return gulp.src('src/**/*.+(js|jsx)')      //引入所有需处理的JS和JSX文件
        .pipe(babel({presets: ['es2015', 'react']}))
        .pipe(concat('autoform.js'))                  //合并所有文件
        .pipe(uglify())                           //压缩合并文件
        .pipe(rename({suffix: '.min'}))         //重命名压缩文件
        .pipe(gulp.dest('./dist/'))        //输出压缩后的文件
    // .pipe(notify({message: '前端模块处理完成'}));
});

// 前端图片处理任务
gulp.task('images', function () {
    return gulp.src('src/public/images/**/*')        //引入所有需处理的图片文件
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))      //压缩图片
        .pipe(gulp.dest('./dist/public/images/')) //输出压缩后的图片
    // .pipe(notify({message: '前端图片处理完成'}));
});

// 依赖模块复制任务
gulp.task('node_modules', function () {
    return gulp.src('node_modules/**/*')        //引入所有依赖模块
        .pipe(gulp.dest('./dist/node_modules/')); //输出到输出目录中
});

// 模块配置文件复制任务
gulp.task('pkgfile', function () {
    return gulp.src('./package.json')        //引入模块配置文件
        .pipe(gulp.dest('./dist/')) //输出到输出目录中
    // .pipe(notify({message: '模块配置文件复制完成'}));
});

// 输出目录清理任务
gulp.task('clean', function () {
    return gulp.src(['./dist'], {read: false})
        .pipe(clean());
});

// 文档临听任务
gulp.task('watch', ['build'], function () {
    gulp.watch('src/public/styles/**/*.css', ['styles']);//监听前端样式
    gulp.watch('src/**/*.+(js|jsx)', ['scripts']);//监听前端脚本
    gulp.watch('src/public/images/**/*', ['images']);//监听前端图片资源
    gulp.watch('src/*.html', ['htmls']);//监听前端网页资源
    gulp.watch('node_modules/**/*', ['node_modules']);//依赖模块
    gulp.watch('./package.json', ['pkgfile']);//模块配置文件
});

// 注册默认任务
gulp.task('build', ['styles', 'scripts', 'images', 'htmls',
    'node_modules', 'pkgfile'
]);

// 注册默认任务
gulp.task('default', function () {
    runSequence('clean', 'build');
});