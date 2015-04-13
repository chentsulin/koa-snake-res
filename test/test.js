var koaSnakeRes = require('../')
var request = require('supertest')
var koa = require('koa')
var app = koa()

app.use(koaSnakeRes())

describe('koa-snake-res', function() {
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
      console.log(res.body);
      if ( ! ('camel_case' in res.body)) return 'camelCase to snake_case failed'
    })
    .end(done)
  })
})
