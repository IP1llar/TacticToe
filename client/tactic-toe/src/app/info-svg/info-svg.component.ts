import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-info-svg',
  templateUrl: './info-svg.component.html',
  styleUrls: ['./info-svg.component.css']
})
export class InfoSvgComponent implements OnInit {



  dict:any ={
    "Complexity" : "The randomness slider will determine what kind of bot your AI will play against during a Fast Game. At 0%, your AI will play against the perfect Bot, whereas at 100%, your AI plays against a Bot that always makes random choices. Anywhere in between, the bot will make a random move X% of the time. ",
    "Incentives" : "After each game, your AI receives a reward/punishment depending whether they have won/lost/drawn. This can encourage the AI to play certain positions, and vice versa. You can change how drastically the AI is affected after each round. Note: AI states are reset if all positions reach a probability of 0.",
    "Battle" : "Battle with your friends! Join a room using a Game ID, or host one yourself (Don’t forget to press the Host Button). "
  }

  @Input() description = 'test'

  constructor() { }

  ngOnInit(): void {
  }

}
