import { EventEmitter, Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor() { }

  socket: any; // find typing
  connected = false;
  connectedObservable = new EventEmitter(this.connected);
  indexObservable = new EventEmitter();
  searching = false;
  turn = false;
  turnObservable = new EventEmitter(false);
  key : number = 0;
  opponent = 'Bruce';

  setupSocketConnection() {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      });
    this.socket.on('message', (msg:string) => {
      if (msg === 'failure') this.searching = this.connected = false;
      console.log(msg);
    });
    this.socket.on('allconnected', (key : number, socketId: string) => {
      console.log({key, socketId, socket:this.socket.id});
      this.key = key;
      this.connected = true;
      if (socketId === this.socket.id) {
        this.turnObservable.next(true);
        this.turn = true;
      }
      this.connectedObservable.emit(this.connected);
    })
    this.socket.on('turn', (index : number) => {
      console.log({index});
      this.indexObservable.next(index);
      this.turnObservable.next(true)
    })
    this.socket.on('opponent', (opponentName : string) => {
      this.opponent = opponentName;
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.connected = false;
      this.searching = false;
    }
  }

  sendName(name:string) {
    if (this.socket) {
      this.socket.emit('opponent', name, this.key)
    }
  }

  host() {
    if (this.socket && !this.searching && !this.connected) {
      this.searching = true;
      this.socket.emit('hosting', this.socket.id.slice(0,5));
    }
  }

  join(key:string) {
    if (this.socket && !this.searching && !this.connected) {
      this.searching = true;
      this.socket.emit('joining', key);
    }
  }

  emitTurn (index:number) {
    if (this.socket) {
      this.socket.emit('turn', index, this.key);
    }
  }

}
