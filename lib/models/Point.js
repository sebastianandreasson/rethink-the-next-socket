const thinky = require('thinky')()

const Point = thinky.createModel('Point', {
  id: String,
  position: {
    x: Number,
    y: Number
  }
})

module.exports = Point
