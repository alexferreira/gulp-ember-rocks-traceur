# gulp-ember-rocks-traceur

> Preprocessor to compile ES6 JavaScript on the fly using [traceur-compiler] for [ember-rocks].


## Install

```sh
$ npm install --save-dev gulp-ember-rocks-traceur
```

## Usage

```js
var gulp = require('gulp');
var traceur = require('gulp-ember-rocks-traceur');

gulp.task('default', function () {
  return gulp.src('src/app.js')
    .pipe(traceur({modules: 'amd'}))
    .pipe(gulp.dest('dist'));
});
```

## API

### traceur(options)

[Options](https://github.com/google/traceur-compiler/issues/584) are passed through to Traceur, except for `options.filename` which is set for you.

#### options

##### modules

Type: `string`
Default: `amd`
Values: amd, commonjs, instantiate, inline, register

By default, gulp-ember-rocks-traceur treats all files as modules. This allows use of the `export`, `module` and `import` syntax. In this way the transformer can be used to compile ES6 for AMD or Node.js environments.


#### Source Maps

Use [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) like this:

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var emberRocksTraceur = require('gulp-ember-rocks-traceur');

gulp.task('default', function () {
  return gulp.src('src/*.js')
    .pipe(sourcemaps.init())
    .pipe(emberRocksTraceur())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
```

[traceur-compiler]: https://github.com/google/traceur-compiler
[ember-rocks]: https://github.com/mattma/ember-rocks