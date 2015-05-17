# koa-snake-res

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david_img]][david_site]


> Snake case json response transform middleware for koa

## Install

```sh
$ npm install koa-snake-res
```

## Usage

```js
var koa = require('koa')
var app = koa()
var snakeRes = require('koa-snake-res')

app.use(snakeRes())

app.use(function *() {
  this.body = {
    camelCase: 'this is a camelCase'
  }
})

app.listen()

// GET /
//
// {
//    camel_case: 'this is a camelCase'
// }
```

## License
MIT © [C. T. Lin](https://github.com/chentsulin)

[npm-image]: https://img.shields.io/npm/v/koa-snake-res.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-snake-res
[travis-image]: https://travis-ci.org/chentsulin/koa-snake-res.svg
[travis-url]: https://travis-ci.org/chentsulin/koa-snake-res
[coveralls-image]: https://img.shields.io/coveralls/chentsulin/koa-snake-res.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/chentsulin/koa-snake-res
[david_img]: https://img.shields.io/david/chentsulin/koa-snake-res.svg
[david_site]: https://david-dm.org/chentsulin/koa-snake-res
