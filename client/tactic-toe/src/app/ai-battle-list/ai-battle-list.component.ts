import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-ai-battle-list',
  templateUrl: './ai-battle-list.component.html',
  styleUrls: ['./ai-battle-list.component.css']
})
export class AiBattleListComponent implements OnInit {

  allAi: any[] = [];

  chosen = 1;

  constructor(public api : APIClientService) { }

  ngOnInit(): void {
    this.api.sharedAllAi.subscribe(data => {
      this.allAi = data;
      this.chosen = data[0].id;
    })
  }

  handleClick(id:number) {
    this.chosen = id;
    this.api.chosen = this.chosen;
  }
}
