"use strict";
function ioFunctions(io) {
    let joiningRoom = [];
    let keys = [];
    io.on('connection', (socket) => {
        //battle friends
        socket.on('hosting', (key) => {
            keys.push(key);
            socket.join(key);
            io.to(key).emit('message', `Hosting to room ${key}`);
        });
        socket.on('joining', (key) => {
            if (!keys.includes(key)) {
                socket.emit('message', 'failure');
            }
            else {
                socket.join(key);
                io.to(key).emit('message', `${socket.id} joined room ${key}`);
                io.to(key).emit('allconnected', key, socket.id);
                keys = keys.filter(el => el !== key);
            }
        });
        //search people
        socket.on('joiningwait', (key) => {
            console.log(key);
            if (joiningRoom.length === 0) {
                joiningRoom.push(key);
                socket.join(key);
            }
            else {
                let joinKey = joiningRoom.pop();
                socket.join(joinKey);
                io.to(joinKey).emit('message', `${socket.id} joined room ${joinKey}`);
                io.to(joinKey).emit('allconnected', joinKey, socket.id);
            }
            console.log(joiningRoom.length);
        });
        socket.on('turn', (index, key) => {
            socket.to(key).emit('turn', index);
        });
        socket.on('opponent', (opponentName, key) => {
            socket.to(key).emit('opponent', opponentName);
        });
        socket.on('play again', (key) => {
            io.to(key).emit('play again', socket.id);
        });
    });
}
module.exports = ioFunctions;
