function ioFunctions (io) {
  keys = [];
  console.log({io})
  io.on('connection', socket => {
    console.log(`Socket ${socket.id} connected`)
    socket.on('hosting', key => {
      keys.push(key);
      socket.join(key);
      io.to(key).emit('message', `Hosting to room ${key}`);
    });

    socket.on('joining', key => {
      if (!keys.includes(key)) {
        socket.emit('message', 'failure')
      } else {
        socket.join(key);
        io.to(key).emit('message', `${socket.id} joined room ${key}`)
        io.to(key).emit('allconnected', key, socket.id);
        keys = keys.filter(el => el !== key);
      }
    })

    socket.on('turn', (index, key) => {
      console.log('turn');
      socket.to(key).emit('turn', index);
    })

    socket.on('opponent', (opponentName, key) => {
      socket.to(key).emit('opponent', opponentName);
    })
  })
}

module.exports = ioFunctions;