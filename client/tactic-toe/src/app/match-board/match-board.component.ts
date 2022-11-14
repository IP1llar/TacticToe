import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIClientService } from '../apiclient.service';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-match-board',
  templateUrl: './match-board.component.html',
  styleUrls: ['./match-board.component.css']
})
export class MatchBoardComponent implements OnInit {

  currentMenace:any = {history: ['0', 0], results:{win:0, draw:0, lose:0}};
  board: string[] = Array(9).fill('');
  dimensions = [120, 120];
  winner: '' | 'TBD' | 'X' | 'O' | 'Draw' = 'TBD';
  toPlay: 'X' | 'O' = 'X';
  aiHistory: ((number | string)[])[] = [];
  spacesLeft = 9;
  id = 1;
  playerMove = false;
  shortTimeOut = 200

  constructor(
    private fb : FormBuilder,
    private api : APIClientService,
    private route : ActivatedRoute,
    public socket : SocketioService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = data.get('id') as unknown as number;
      this.api.getAi(this.id)
        .subscribe(ai => {
          this.currentMenace = ai;
          this.socket.sendName((ai as any).name);
          console.log('getting ai using params', ai);
        });
    })
    this.socket.indexObservable.subscribe(data => {
      this.handleClick(data);
    })
  }

  handleClick (index: number) {
    console.log(index);
    console.log(this.winner);
    if (this.board[index] === 'X' || this.board[index] === 'O') {
      console.log('You can not go there');
      return;
    };
    if (this.board[index] === 'X' || this.board[index] === 'O'|| this.winner !== 'TBD') return;
    console.log('hi');
    console.log('clicked');
    this.board[index] = this.toPlay;
    if (this.checkWin()) {
      this.winner = this.toPlay;
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.socket.turnObservable.next(true);
    this.socket.turn = true;
  }

  checkWin () {
    const wins = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let win of wins) {
      if (this.board[win[0]] !== 'X' && this.board[win[0]] !== 'O') continue;
      if (this.board[win[1]] !== 'X' && this.board[win[1]] !== 'O') continue;
      if (this.board[win[2]] !== 'X' && this.board[win[2]] !== 'O') continue;
      if (this.board[win[0]] === this.board[win[1]] && this.board[win[0]] === this.board[win[2]]) return true;
    }
    return false;
  }

  resetBoard () {
    this.board = Array(9).fill('');
    this.toPlay = 'X';
    this.winner = 'TBD';
  }

  parseBoard(board: string[]) {
    return board.map(el => {
      if (el === '') return '0';
      if (el === 'X') return '1';
      else return '2';
    }).join('');
  }

  aiMove (index: number) {
    this.spacesLeft--;
    this.aiHistory.push([index, this.parseBoard(this.board)]);
    this.board[index] = this.toPlay;
    if (this.checkWin()) {
      this.winner = this.toPlay;
      this.api.sendMatch(this.aiHistory, 'win', this.id).subscribe(data => {
        this.api.getAllAi();
        this.currentMenace = data;
      });
      return;
    };
    if (this.spacesLeft === 0) {
      this.api.sendMatch(this.aiHistory, 'draw', this.id).subscribe(data => {
        this.api.getAllAi();
        this.currentMenace = data;
      });
      this.winner = 'Draw';
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.playerMove = !this.playerMove;
    this.socket.turnObservable.next(false);
    this.socket.turn = false;

  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  getAiMove() {
    const move = this.api.getAiMove(this.parseBoard(this.board), this.currentMenace.id).subscribe(data => {
      this.socket.emitTurn(Number(data));
      setTimeout(()=> {
        this.aiMove(Number(data)), this.shortTimeOut;
      });
    });
  }

  controls = this.fb.group({
    randomness: [100],
    firstGo: [true]
  })

}
