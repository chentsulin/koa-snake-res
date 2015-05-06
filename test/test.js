'use strict'

var snakeRes = require('../')
var request = require('supertest')
var koa = require('koa')
var app


describe('koa-snake-res', function() {
  beforeEach(function() {
    app = koa()

    app.use(snakeRes())
  })

  it('camelCase should be transform to snake_case', function(done) {

    app.use(function *() {
      this.body = {
        camelCase: 'this is a camelCase'
      }
    })

    request(app.listen())
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('camel_case' in res.body)) return 'camelCase to snake_case failed'
    })
    .end(done)
  })

  it('can exec recursively', function(done) {

    app.use(function *() {
      this.body = {
        camelCase: {
          camelCaseToo: 'this is a camelCase'
        }
      }
    })

    request(app.listen())
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('camel_case' in res.body)) return 'camelCase to snake_case failed'
      if (!('camel_case_too' in res.body.camel_case)) return 'camelCase to snake_case recursively failed'
    })
    .end(done)
  })

  it('can handle inner null', function(done) {

    app.use(function *() {
      this.body = {
        camelCase: {
          camelCaseToo: null
        }
      }
    })

    request(app.listen())
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('camel_case' in res.body)) return 'camelCase to snake_case failed'
      if (!('camel_case_too' in res.body.camel_case)) return 'camelCase to snake_case recursively failed'
    })
    .end(done)
  })

  it('can handle array', function(done) {

    app.use(function *() {
      this.body = {
        camelCase: [{
          camelCaseToo: 'this is a camelCase'
        }, {
          camelCaseSame: 'this is a camelCase'
        }, {
          camelCaseNest: {
            camelCaseAgain: 'this is a camelCase'
          }
        }]
      }
    })

    request(app.listen())
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('camel_case' in res.body)) return 'camelCase to snake_case failed'
      if (!(Array.isArray(res.body.camel_case))) return 'handle array failed'
      if (!('camel_case_too' in res.body.camel_case[0])) return 'handle array element failed'
      if (!('camel_case_same' in res.body.camel_case[1])) return 'handle array element failed'
      if (!('camel_case_nest' in res.body.camel_case[2])) return 'handle array element failed'
      if (!('camel_case_again' in res.body.camel_case[2].camel_case_nest)) return 'handle object in array failed'
    })
    .end(done)
  })
})
