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
      if ( ! ('camel_case' in res.body)) return 'camelCase to snake_case failed'
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
      if ( ! ('camel_case' in res.body)) return 'camelCase to snake_case failed'
      if ( ! ('camel_case_too' in res.body.camel_case)) return 'camelCase to snake_case recursively failed'
    })
    .end(done)
  })
})
