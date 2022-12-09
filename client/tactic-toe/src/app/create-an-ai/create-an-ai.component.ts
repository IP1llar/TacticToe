import { Component, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-create-an-ai',
  templateUrl: './create-an-ai.component.html',
  styleUrls: ['./create-an-ai.component.css']
})
export class CreateAnAiComponent implements OnInit {
  
  optionCreate:boolean = true;
  editAi:number;

  
  constructor(public api : APIClientService) {}
  ngOnInit(): void {
    this.api.sharedEditAi.subscribe(data =>{
      if(data.length!==0){
        if(data.id!==0){
          this.editAi = data.id;
          this.optionCreate = false
        }else{ 
          this.optionCreate = true}
        }
      })
    
    
  }

  switchAction(state:boolean){
    this.optionCreate = state;
  }
 
}
