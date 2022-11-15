import { Component, Input, OnInit } from '@angular/core';
import {transformations} from '../utils/transformations';

@Component({
  selector: 'app-statboard',
  templateUrl: './statboard.component.html',
  styleUrls: ['./statboard.component.css']
})
export class StatboardComponent implements OnInit {

  dimensions = [50, 50];

  toPlay: 'X' | 'O' = 'X';

  board: (string | number)[] = Array(9).fill('');

  history: number[] = [];

  @Input() currentMenace = {states: {'000000000':[0,0,0,0,0,0,0,0,0], '100000000':[0, 9, 8, 0, 0, 0, 0, 0, 0]}};

  winner = 'TBD';

  constructor() { 
    this.getBeads();
  }


  ngOnInit(): void {
    this.getBeads();
    
  }

  ngOnChanges () {
    this.getBeads();
  }

  checkWin () { // TODO: make modular
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

  handleCellClick (index: number) {
    console.log(this.winner);
    if (this.board[index] === 'X' || this.board[index] === 'O') {
      console.log('You can not go there');
      return;
    };
    if (this.board[index] === 'X' || this.board[index] === 'O'|| this.winner !== 'TBD') return;
    console.log('clicked');
    this.board[index] = this.toPlay;
    this.history.push(index);
    if (this.checkWin()) {
      this.winner = this.toPlay;
      return;
    };
    this.getBeads();
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
  }

  handleUndo () {
    this.winner = 'TBD';
    if (this.history.length === 0) return;
    const index = this.history.pop();
    this.board[index as number] = '';
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.getBeads();
  }

  reset () {
    this.board = Array(9).fill('');
    this.toPlay = 'X';
    this.winner = 'TBD';
    this.history = [];
    this.getBeads();
  }

  getBeads () {
    if (this.winner === 'X' || this.winner === 'O') return;
    const transformed = transformations.transformBoard(this.parseBoard(this.board.map(el => (el !== 'X' && el !== 'O') ? '' : el)), true);
    const transformedBeads = (this.currentMenace.states as any)[transformed[0]];
    const beads = transformations.inverseTransform(transformedBeads, transformed[1], transformed[2], true);
    for (let i = 0; i < 9; i++) {
      if (this.board[i] !== 'X' && this.board[i] !== 'O') this.board[i] = beads[i];
    }
  }

  parseBoard(board: string[]) {
    return board.map(el => {
      if (el === '') return '0';
      if (el === 'X') return '1';
      else return '2';
    }).join('');
  }

}
