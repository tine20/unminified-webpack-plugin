unminified-webpack-plugin
=======================

[![NPM version][npm-image]][npm-url]
![][travis-url]
![][david-url]
![][dt-url]
![][license-url]


A `webpack` plugin for generating un-minified JavaScript files along with UglifyJsPlugin.

>This plugin should only be used while you are developing standalone library

## Why unminified-webpack-plugin ##

Maybe you are encountering the same issue as mine, once you are developing a standalone library via `webpack`, it's not possible to generate the uncompressed file along with the minified version at one time. [Here](http://stackoverflow.com/questions/25956937/how-to-build-minified-and-uncompressed-bundle-with-webpack) is the question i found at `stackoverflow`, it seems many people are suffering for this.

As a workaround, you may do something like `webpack && webpack --config webpack.config.prod.js`, but the solution is really ugly and inelegant.

That's why i am here! ^^

## Installation ##

```bash
npm install --save-dev unminified-webpack-plugin
```

## Usage ##

```javascript
var path = require('path');
var webpack = require('webpack');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new UnminifiedWebpackPlugin()
    ]
};
```

By doing as above, you will get two files `library.min.js` and `library.js`. No need execute `webpack` twice, it just works!^^

## Options ##
`noMinSuffix`
```javascript
  ...
        filename: 'library.js'
  ...
  new UnminifiedWebpackPlugin({
    noMinSuffix : '-debug.js'
  })
```
By doing as above, you will get two files `library.js` and `library-debug.js`.

## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/unminified-webpack-plugin/master/LICENSE)


[npm-url]: https://npmjs.org/package/unminified-webpack-plugin
[npm-image]: https://badge.fury.io/js/unminified-webpack-plugin.png
[travis-url]:https://api.travis-ci.org/leftstick/unminified-webpack-plugin.svg?branch=master
[david-url]: https://david-dm.org/leftstick/unminified-webpack-plugin.png
[dt-url]:https://img.shields.io/npm/dt/unminified-webpack-plugin.svg
[license-url]:https://img.shields.io/npm/l/unminified-webpack-plugin.svg
