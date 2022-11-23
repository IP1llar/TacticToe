import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SocketioService } from '../socketio.service';
@Component({
  selector: 'app-create-battle',
  templateUrl: './create-battle.component.html',
  styleUrls: ['./create-battle.component.css']
})
export class CreateBattleComponent implements OnInit {

  connect = this.fb.group({
    host: [true],
    key: ['', Validators.required]
  })


  @Input() socketService:SocketioService
  @Output() optionCreate = new EventEmitter<any>;
  constructor(
    private fb : FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  switchAction(){
    this.optionCreate.emit({data:false});
  }

  host () {
    this.socketService.host();
  }
  toggleCheckbox(name: string) {
    this.connect.controls.host.setValue(!this.connect.value.host);
  }
  joinMatch () {
    this.socketService.join(this.connect.value.key as string);
  }
}
