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


  connect = this.fb.group({
    host: [true],
    key: ['', Validators.required]
  })

  chosen = 1;

  constructor(
    public socketService : SocketioService, 
    private fb : FormBuilder,
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
  }

  // ngOnDestroy() {
  //   this.socketService.disconnect();
  // }

  toggleCheckbox(name: string) {
    this.connect.controls.host.setValue(!this.connect.value.host);
  }

  host () {
    this.socketService.host();
    console.log(this.api.chosen);
  }

  joinMatch () {
    this.socketService.join(this.connect.value.key as string);
  }

}
