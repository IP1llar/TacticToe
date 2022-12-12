import { join } from "cypress/types/lodash";

function ioFunctions (io:any) {
  let joiningRoom:Array<any> = []
  let keys:Array<any> = [];
   io.on('connection', (socket:any) => {
    //battle friends
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
     //search people
     socket.on('joiningwait', (key:any) => {
      console.log(key)
      if(joiningRoom.length === 0) {
        joiningRoom.push(key);
        socket.join(key);
        io.to(key).emit('waiting', 'We are now searching')
      } else {
        let joinKey = joiningRoom.pop()
        socket.join(joinKey)
        io.to(joinKey).emit('message', `${socket.id} joined room ${joinKey}`)
        io.to(joinKey).emit('allconnected', joinKey, socket.id);
        
      }
      console.log(joiningRoom.length)
    });

    socket.on('disconnect', (data:any) => {
      console.log('someone disconnected')
      joiningRoom = joiningRoom.filter(el => el !== socket.id.slice(0,5));
      console.log(joiningRoom.length)
    })

    socket.on('clear', (data:string) => {
       joiningRoom.pop()
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