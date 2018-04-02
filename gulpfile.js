// npm i --save gulp gulp-mocha gulp-nodemon
// npm i --save-dev gulp-dev
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    env = require('gulp-env');
    //supertest = require('supertest');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 5000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('on restart');
    });
});

/* gulp.task('test', function() {
    env({vars: {ENV: 'Test'}});
    gulp.src('Test/*js', {read:false})
        .pipe(gulpMocha({reporter: 'nyan'}));
}); */