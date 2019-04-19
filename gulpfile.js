const gulp = require("gulp");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass");
const url = require("url");

gulp.task("mysass",()=>{
	return gulp.src("./public/**/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("./public/css"))
})

gulp.task("watchFile",()=>{
	return gulp.watch(["./public/**/*.scss"],gulp.series("mysass"))
})

gulp.task("server",()=>{
	return gulp.src("./public")
	.pipe(webserver({
		port:8000,
		open:true,
		livereload:true,
		proxies:[
			{source:"/getData",target:"http://localhost:3000/getData"}
		]
	}))
})

gulp.task("default",gulp.series("mysass","server","watchFile"))
