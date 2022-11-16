import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  currentMenace:any = {history: ['0', 0], results:{win:0, draw:0, lose:0}};
  board: string[] = Array(9).fill('');
  dimensions = [120, 120];
  winner: '' | 'TBD' | 'X' | 'O' | 'Draw' = '';
  toPlay: 'X' | 'O' = 'X';

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
  }


  handleClick (index: number) {
    if (this.board[index] === 'X' || this.board[index] === 'O') {
      console.log('You can not go there');
      return;
    };
    if (this.board[index] === 'X' || this.board[index] === 'O'|| this.winner !== 'TBD') return;
    this.board[index] = this.toPlay;
    if (this.checkWin()) {
      this.winner = this.toPlay;
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
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

  controls = this.fb.group({
    randomness: [100],
    firstGo: [true]
  })

}
