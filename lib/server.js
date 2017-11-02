const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Point = require('./models/Point')

http.listen(1339)

let sockets = []
io.on('connection', socket => {
  sockets.push(socket)

  socket.on('setupListener', async (_, callback) => {
    const feed = await Point.changes()
    feed.each((err, point) => callback(point))
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

  socket.on('get', async () => {
    const points = await Point.run()
    socket.emit('points', points)
  })

  socket.on('disconnect', () => {
    sockets = sockets.filter(s => s !== socket)
  })
})
