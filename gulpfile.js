var gulp = require('gulp');
var $ = require('gulp-load-plugins')();//引入的是函数，调用以后返回的是对象

// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
// var less = require('gulp-less');
// var cssClean = require('gulp-clean-css');
// var htmlMin = require('gulp-htmlmin');
// var livereload = require('gulp-livereload');
// var connect = require('gulp-connect');
var open = require('open');
var ejs = require("gulp-ejs");

gulp.task('appjs', function () {
    //你的任务执行 具体过程
    return gulp.src('app.js')//找目标原文件 将原文件的数据读取到gulp的内存中
        .pipe($.uglify())//压缩js文件
        .pipe(gulp.dest('dist/'))//输出
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('modelsjs', function () {
    //你的任务执行 具体过程
    return gulp.src('models/*.js')//找目标原文件 将原文件的数据读取到gulp的内存中
        .pipe($.uglify())//压缩js文件
        .pipe(gulp.dest('dist/models'))//输出
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('router', function () {
    return gulp.src('router/*.js')
        .pipe($.uglify())//压缩js文件
        .pipe(gulp.dest('dist/router'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('html', function () {
    return gulp.src('views/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('ejs', function() {
    return gulp.src("views/*.ejs")
        .pipe(gulp.dest('dist/views'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('css', function() {
    return gulp.src("public/css/*.css")
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/public/css'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('fonts', function() {
    return gulp.src("public/fonts/*")
        .pipe(gulp.dest('dist/public/fonts'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('images', function () {
    return gulp.src('public/images/*')
        .pipe(gulp.dest('dist/public/images'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
//注册合并压缩js的任务
gulp.task('js', function () {
    //你的任务执行 具体过程
    return gulp.src('public/js/*.js')//找目标原文件 将原文件的数据读取到gulp的内存中
        .pipe($.uglify())//压缩js文件
        .pipe(gulp.dest('dist/public/js'))//输出
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('img', function () {
    return gulp.src('public/themes/Office/images/*')
        .pipe(gulp.dest('dist/public/themes/Office/images'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
gulp.task('pqcss', function() {
    return gulp.src("public/themes/Office/*.css")
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/public/themes/Office'))
        //.pipe(livereload())//实时加载
        .pipe($.connect.reload())
});
//注册监视的任务--->半自动
gulp.task('watch',['default'], function () {
    //开启监视
    livereload.listen();

    //确认监视的目标并且绑定相应的任务
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css', 'less']);
});

//注册一个全自动的任务
gulp.task('server',['default'], function () {
    //配置服务器选项
    $.connect.server({
        root : 'dist/',//监视的源目标文件路径
        livereload : true,//是否实时刷新
        port : 3000//开启端口号
    });
    open('http://localhost:3000/');

    //确认监视的目标并且绑定相应的任务
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css', 'less']);
});
//注册一个默认任务
gulp.task('default', ['appjs','modelsjs','router','html','ejs','css','fonts','images','js','img','pqcss']);