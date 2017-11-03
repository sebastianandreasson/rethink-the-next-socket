const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Point = require('./models/Point')

http.listen(1339)

let sockets = []
let feed
io.on('connection', socket => {

  socket.on('feed', async callback => {
    if (!feed) {
      feed = await Point.changes()
      feed.each((err, point) => sockets.forEach(s => s.emit('update', point)))
    }
    sockets.push(socket)
    callback()
  })

  socket.on('create', ({ x, y }) => {
    const point = new Point({ x, y })
    point.save()
  })

  socket.on('update', async ({ id, x, y }) => {
    const point = await Point.get(id).run()
    point.x = x
    point.y = y
    point.save()
  })

  socket.on('get', async callback => {
    const points = await Point.run()
    callback(points)
  })

  socket.on('disconnect', () => {
    sockets = sockets.filter(s => s !== socket)
  })
})
