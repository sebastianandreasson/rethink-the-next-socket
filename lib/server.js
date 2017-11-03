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
      feed.each((err, point) => {
        console.log('send feed update', point)
        sockets.forEach(s => s.emit('update', point))
      })
    }
    sockets.push(socket)
    callback()
  })

  socket.on('create', ({ x, y }) => {
    console.log('create')
    const point = new Point({ x, y })
    point.save()
  })

  socket.on('update', async ({ id, x, y }) => {
    console.log('UPDATE')
    const point = await Point.get(id).run()
    point.x = x
    point.y = y
    point.save()
  })

  socket.on('get', async callback => {
    console.log('get')
    const points = await Point.run()
    console.log('respond', points)
    callback(points)
  })

  socket.on('disconnect', () => {
    sockets = sockets.filter(s => s !== socket)
  })
})
