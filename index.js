'use strict';

var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var resolve = path.resolve;
var ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');


var getFileName = function(name, options) {
    var minIndex = name.indexOf('min');
    if (minIndex > -1) {
        return name.substring(0, minIndex - 1) + name.substring(minIndex + 3);
    }
    var jsIndex = name.indexOf('js');
    if (jsIndex > -1) {
        return name.substring(0, jsIndex - 1) + options.noMinSuffix;
    }
    return name + 'nomin.js';
};

var UnminifiedWebpackPlugin = function(opts) {
    this.options = opts || {};
};

UnminifiedWebpackPlugin.prototype.apply = function(compiler) {
    var options = this.options;
    options.test = options.test || /\.js($|\?)/i;
    options.noMinSuffix = options.noMinSuffix || '.nomin.js';

    var containUgly = compiler.options.plugins.filter(function(plugin) {
        return plugin instanceof webpack.optimize.UglifyJsPlugin;
    });

    if (!containUgly.length) {
        return console.log('Ignore generating unminified version, since no UglifyJsPlugin provided');
    }

    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('additional-chunk-assets', function(chunks, cb) {
            var files = [];
            chunks.forEach(function(chunk) {
                chunk.files.forEach(function(file) {
                    files.push(file);
                });
            });
            compilation.additionalChunkAssets.forEach(function(file) {
                files.push(file);
            });
            files = files.filter(ModuleFilenameHelpers.matchObject.bind(null, options));
            files.forEach(function(file) {
                try {
                    mkdirp.sync(resolve(compiler.options.output.path));
                    var out = resolve(compiler.options.output.path, getFileName(file, options));
                    var asset = compilation.assets[file];
                    fs.writeFileSync(out, asset.source(), {
                        encoding: 'utf8'
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
    });
};

module.exports = UnminifiedWebpackPlugin;
