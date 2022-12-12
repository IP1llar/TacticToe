import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { SocketioService } from '../socketio.service';
@Component({
  selector: 'app-search-battle',
  templateUrl: './search-battle.component.html',
  styleUrls: ['./search-battle.component.css']
})
export class SearchBattleComponent implements OnInit {


  @Input() socketService:SocketioService
  @Output() optionCreate = new EventEmitter<any>;
  constructor() { }

  ngOnInit(): void {
  }

  switchAction(){
    this.optionCreate.emit({data:true});
  }

  cancelSearch() {
    this.socketService.searching = false
    this.socketService.clearSearchArray()
  }
  connectToRoom(){
    this.socketService.joinWaitingRoom()
  }
}
