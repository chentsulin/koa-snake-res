var changeCase = require('change-case')

module.exports = function *(next) {
  yield next

  if (!this.response.is('json')) return

  var body = this.body

  this.body = toSnakeCase(this.body)
};


function toSnakeCase(json) {
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      if (typeof json[key] === 'object') {
        json[key] = toSnakeCase(json[key])
      }
      var _value = json[key]
      delete json[key]
      json[ changeCase.snakeCase(key) ] = _value
    }
  }

  return json
}
