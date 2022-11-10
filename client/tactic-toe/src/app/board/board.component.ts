import { Component, Input, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: string[] = Array(9).fill('');

  spacesLeft = 9;

  winner: 'TBD' | 'X' | 'O' | 'Draw' = 'TBD';

  toPlay: 'X' | 'O' = 'X';

  randomAi = false;

  perfectAi = false;

  aiHistory: ((number | string)[])[] = [];

  playerMove = false;

  currentMenace:any = {history: ['0', 0]};

  parseBoard(board: string[]) {
    return board.map(el => {
      if (el === '') return '0';
      if (el === 'X') return '1';
      else return '2';
    }).join('');
  }

  handleClick (index: number) {
    console.log(this.currentMenace.history)
    console.log(this.board);
    if (!this.playerMove || this.board[index] !== '') {
      console.log('You can not go there');
      return;
    };
    this.spacesLeft--;
    if (this.board[index] || this.winner !== 'TBD' || !this.playerMove) return;
    this.board[index] = this.toPlay;
    if (this.checkWin()) {
      this.winner = this.toPlay;
      this.randomAi = false;
      this.perfectAi = false;
      this.api.sendMatch(this.aiHistory, 'lose').subscribe(data => this.currentMenace = data);
      return;
    };
    if (this.spacesLeft === 0) {
      this.api.sendMatch(this.aiHistory, 'draw').subscribe(data => this.currentMenace = data);
      this.winner = 'Draw';
      this.randomAi = false;
      this.perfectAi = false;
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.playerMove = !this.playerMove;
    this.getAiMove();
  }

  aiMove (index: number) {
    console.log(this.board);
    // if (this.currentMenace.states) console.log(this.currentMenace.states['000000000'])
    this.spacesLeft--;
    this.aiHistory.push([index, this.parseBoard(this.board)]);
    this.board[index] = this.toPlay;
    if (this.checkWin()) {
      this.winner = this.toPlay;
      this.randomAi = false;
      this.perfectAi = false;
      this.api.sendMatch(this.aiHistory, 'win').subscribe(data => this.currentMenace = data);
      return;
    };
    if (this.spacesLeft === 0) {
      this.api.sendMatch(this.aiHistory, 'draw').subscribe(data => this.currentMenace = data);
      this.winner = 'Draw';
      this.randomAi = false;
      this.perfectAi = false;
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.playerMove = !this.playerMove;
    if (this.randomAi) this.getRandomMove();
    if (this.perfectAi) this.getPerfectMove();
  }


  getAiMove() {
    const move = this.api.getAiMove(this.parseBoard(this.board)).subscribe(data => this.aiMove(Number(data)));
  }

  getRandomMove() {
    const move = this.api.getRandomMove(this.parseBoard(this.board)).subscribe(data => this.handleClick(Number(data)));
  }

  getPerfectMove() {
    const move = this.api.getPerfectMove(this.parseBoard(this.board)).subscribe(data => this.handleClick(Number(data)));
  }

  

  resetBoard () {
    this.board = Array(9).fill('');
    this.playerMove = false;
    this.toPlay = 'X';
    this.winner = 'TBD';
    this.spacesLeft = 9;
    this.aiHistory = [];
    this.getAiMove()
  }

  randomAiGo () {
    this.randomAi = true;
    if (this.winner !== 'TBD') this.resetBoard();
    this.getRandomMove();
  }

  perfectAiGo () {
    this.perfectAi = true;
    if (this.winner !== 'TBD') this.resetBoard();
    this.getPerfectMove();
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
      if (this.board[win[0]] === '') continue;
      if (this.board[win[0]] === this.board[win[1]] && this.board[win[0]] === this.board[win[2]]) return true;
    }
    return false;
  }

  constructor(private api: APIClientService) { this.getAiMove() }

  ngOnInit(): void {
  }

}
