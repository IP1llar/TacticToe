import { Component, Input, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: string[] = Array(9).fill('');

  winner: 'TBD' | 'X' | 'O' = 'TBD';

  toPlay: 'X' | 'O' = 'X';

  playerMove = true;

  handleClick (index: number) {
    if (this.board[index] || this.winner !== 'TBD' || !this.playerMove) return;
    this.board[index] = this.toPlay;
    if (this.checkWin()) {
      this.winner = this.toPlay;
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.playerMove = !this.playerMove;
    this.getAiMove();
  }

  aiMove (index: number) {
    this.board[index] = this.toPlay;
    if (this.checkWin()) this.winner = this.toPlay;
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.playerMove = !this.playerMove;
  }

  getAiMove() {
    const move = this.api.getAiMove(this.board).subscribe(data => this.aiMove(Number(data)));
  }

  resetBoard () {
    this.board = Array(9).fill('');
    this.toPlay = 'X';
    this.winner = 'TBD';
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

  constructor(private api: APIClientService) { }

  ngOnInit(): void {
  }

}
