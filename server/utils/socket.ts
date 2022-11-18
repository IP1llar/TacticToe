function ioFunctions (io:any) {
  let keys:Array<any> = [];
   io.on('connection', (socket:any) => {
     socket.on('hosting', (key:any) => {
       keys.push(key);
       socket.join(key);
       io.to(key).emit('message', `Hosting to room ${key}`);
     });
 
     socket.on('joining', (key:any) => {
       if (!keys.includes(key)) {
         socket.emit('message', 'failure')
       } else {
         socket.join(key);
         io.to(key).emit('message', `${socket.id} joined room ${key}`)
         io.to(key).emit('allconnected', key, socket.id);
         keys = keys.filter(el => el !== key);
       }
     })
 
     socket.on('turn', (index:any, key:any) => {
       socket.to(key).emit('turn', index);
     })
 
     socket.on('opponent', (opponentName:any, key:any) => {
       socket.to(key).emit('opponent', opponentName);
     })
     socket.on('play again', (key:any) => {
       io.to(key).emit('play again', socket.id)
     })
   })
 }
 
 module.exports = ioFunctions;