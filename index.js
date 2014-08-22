'use strict';
var _ = require('lodash')
  , gutil = require('gulp-util')
  , traceur = require('traceur')
  , through = require('through2');

module.exports = function (options) {
  options = options || {};
  var prefix, result;

  if(options.prefix) {
    prefix = options.prefix;
    delete options.prefix;
  }
  
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      cb();
      return;
    }

    var fileOptions = _.defaults({modules: 'amd'}, options);
    fileOptions.filename = file.relative;
    fileOptions.moduleName = prefix+'/'+file.relative.substr(0, file.relative.length-3);

    try {
      result = traceur.compile(file.contents.toString(), fileOptions);
      result.js = result.js.replace(/\$__(\w).__esModule/g, '$__$1.__esModule && !$__$1.default');
      if (result.js) file.contents = new Buffer(result.js);

      if (result.errors.length > 0) {
        this.emit('error', new gutil.PluginError('gulp-ember-rocks-traceur', '\n' + result.errors.join('\n'), { fileName: file.path, showStack: false }));
      } else {
        this.push(file);
      }
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-ember-rocks-traceur', err, { fileName: file.path }));
    }

    cb();
  });
};

module.exports.RUNTIME_PATH = traceur.RUNTIME_PATH;
