import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-battle-info',
  templateUrl: './ai-battle-info.component.html',
  styleUrls: ['./ai-battle-info.component.css']
})
export class AiBattleInfoComponent implements OnInit {

  @Input() ai = {id: 1, name: 'Bruce', results: {win:1, draw: 2, lose: 700}, color:'black'};
  @Input() chosen = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
