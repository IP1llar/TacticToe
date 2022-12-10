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
  allAi:any =[]
  
  constructor(public api : APIClientService) {}
  ngOnInit(): void {
    this.api.sharedAllAi.subscribe(data=>{
        this.allAi = data;
        if(this.allAi.length ===0){ 
          this.optionCreate = true;
        }else if(this.optionCreate===false){
            this.api.editAi(data[0].id)
        }
    });
    this.api.sharedEditAi.subscribe(data =>{
      if(data.id){
        if(data){
          this.optionCreate = false
        }else{ 
          this.optionCreate = true
        } 
      }
    })
  }

  switchAction(state:boolean){
    if(this.allAi.length !==0){
      this.api.editAi(this.allAi[0].id);
      this.optionCreate = state;
    }
  }
 
}
