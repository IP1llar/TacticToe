import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIClientService } from '../apiclient.service';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  createFlag:boolean = true;
  

  chosen = 1;
  haveAI = true


  constructor(
    public socketService : SocketioService, 

    private api : APIClientService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
    this.socketService.connectedObservable.subscribe(data => {
      if (data) {
        this.router.navigate(['/battle', this.api.chosen])
      }
    });   
     
    this.api.sharedAllAi.subscribe(data => {
      console.log(data)
      if(data.length === 0) this.haveAI = false
      else this.haveAI = true
      console.log(this.haveAI)
    })
  }

  // ngOnDestroy() {
  //   this.socketService.disconnect();
  // }

  refreshCreate(eventData:{ data :any}){
    this.createFlag = eventData.data ; 
  }

}
