const gulp = require('gulp');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');

gulp.task('deploy', () => {
  const conn = ftp.create({
    host: '192.168.10.104',
    user: 'wjj',
    password: 'zywlwj',
    log: gutil.log
  })
  const globs = [
    'static/**',
    'src/**',
    'css/**',
    'js/**',
    'fonts/**',
    'index.html'
  ];
  return gulp.src(globs, {
      base: './dist',
      buffer: false
    })
    .pipe(conn.newer('/zywl_zr/ZY/ZY/src/main/webapp'))
    .pipe(conn.dest('/zywl_zr/ZY/ZY/src/main/webapp'));
})
