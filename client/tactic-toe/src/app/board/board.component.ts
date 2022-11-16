import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APIClientService } from '../apiclient.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: string[] = Array(9).fill('');
  spacesLeft = 9;
  winner: '' | 'TBD' | 'X' | 'O' | 'Draw' = '';
  toPlay: 'X' | 'O' = 'X';
  longTimeOut = 500;
  shortTimeOut = 0;
  randomAi = false;
  perfectAi = false;
  smartAi = false;
  aiHistory: ((number | string)[])[] = [];
  playerMove = false;
  currentMenace:any = {history: ['0', 0], results:{win:0, draw:0, lose:0}};
  id = 1;
  dimensions = [120, 120];
  controls = this.fb.group({
    randomness: [100],
    firstGo: [true]
  })

  parseBoard(board: string[]) {
    return board.map(el => {
      if (el === '') return '0';
      if (el === 'X') return '1';
      else return '2';
    }).join('');
  }

  handleClick (index: number) {
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
      this.smartAi = false;
      this.api.sendMatch(this.aiHistory, 'lose', this.id).subscribe(data => {
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
      this.randomAi = false;
      this.perfectAi = false;
      this.smartAi = false;
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.playerMove = !this.playerMove;
    this.getAiMove();
  }

  aiMove (index: number) {
    this.spacesLeft--;
    this.aiHistory.push([index, this.parseBoard(this.board)]);
    this.board[index] = this.toPlay;
    if (this.checkWin()) {
      this.winner = this.toPlay;
      this.randomAi = false;
      this.perfectAi = false;
      this.smartAi = false;
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
      this.randomAi = false;
      this.perfectAi = false;
      this.smartAi = false;
      return;
    };
    this.toPlay = this.toPlay === 'X' ? 'O' : 'X';
    this.playerMove = !this.playerMove;
    // if (this.randomAi) this.getRandomMove();
    // if (this.perfectAi) this.getPerfectMove();
    if (this.smartAi && this.playerMove) this.getSmartMove();

  }


  getAiMove() {
    const move = this.api.getAiMove(this.parseBoard(this.board), this.currentMenace.id).subscribe(data => {
      if (this.smartAi) setTimeout(()=> this.aiMove(Number(data)), this.shortTimeOut);
      else setTimeout(()=> this.aiMove(Number(data)), this.longTimeOut)
    });
  }

  getRandomMove() {
    const move = this.api.getRandomMove(this.parseBoard(this.board)).subscribe(data => this.handleClick(Number(data)));
  }

  getPerfectMove() {
    const move = this.api.getPerfectMove(this.parseBoard(this.board), this.toPlay).subscribe(data => this.handleClick(Number(data)));
  }

  getSmartMove() {
    const randomness = this.controls.value.randomness;
    setTimeout(()=> {
      if ((Math.random() * 100) < (randomness as number)) this.getRandomMove();
      else this.getPerfectMove();
    }, this.shortTimeOut)
    
  }

  

  resetBoard () {
    this.board = Array(9).fill('');
    this.playerMove = false;
    this.toPlay = 'X';
    this.winner = 'TBD';
    this.spacesLeft = 9;
    this.aiHistory = [];
    if (this.controls.value.firstGo) this.getAiMove();
    else {
      this.playerMove = true;
      if (this.smartAi) this.getSmartMove();
    }
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

  smartAiGo () {
    this.smartAi = true;
    if (this.winner !== 'TBD') this.resetBoard();
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

  toggleCheckbox(name: string) {
    this.controls.controls.firstGo.setValue(!this.controls.value.firstGo);
  }

  constructor(
    private api: APIClientService, 
    private authService : AuthService, 
    private router : Router,
    private route : ActivatedRoute,
    private fb : FormBuilder
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = data.get('id') as unknown as number;
      this.api.getAi(this.id)
        .subscribe(ai => {
          this.currentMenace = ai;
        });
    })

  }

}
