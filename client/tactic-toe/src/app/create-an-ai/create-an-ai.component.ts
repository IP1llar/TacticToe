import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-an-ai',
  templateUrl: './create-an-ai.component.html',
  styleUrls: ['./create-an-ai.component.css']
})
export class CreateAnAiComponent implements OnInit {
  optionCreate:boolean = true;
  editAi:number;
  
  constructor() {}

  ngOnInit(): void {
    if(history.state.id === undefined){
      this.optionCreate = true;
    }else{
      this.optionCreate = false
      this.editAi = history.state.id;
    }
  }

  refreshCreate(eventData:{ data :any}){
    if(eventData.data===true){ 
      this.optionCreate = eventData.data
    }else{
      this.optionCreate = false;
      this.editAi = eventData.data
    }
    
  }
}
