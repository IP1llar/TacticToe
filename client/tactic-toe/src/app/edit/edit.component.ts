import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router} from '@angular/router';
import { APIClientService } from '../apiclient.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentMenace = {id: 1, name:'', color: '', incentives: {win: 3,draw: 1, lose: -1}, state: {}}
  id = 1;

  
  editForm = this.fb.group({
    name: [this.currentMenace.name, [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    color: [this.currentMenace.color, [Validators.required]],
    incentives: this.fb.group({
      win: [3, [Validators.required]],
      draw: [1, [Validators.required]],
      lose: [-1, [Validators.required]],
    }),
  });

  @Input() AiId:number = 0;

  @Output() optionCreate = new EventEmitter<any>;


  constructor(private fb: FormBuilder, private api: APIClientService, private router : Router) {}



  ngOnInit(): void {
    this.api.sharedEditAi.subscribe(data =>{
      if(data.id !== 0){
        this.AiId = data.id
        this.api.getAi(this.AiId)
          .subscribe(ai => {
            this.currentMenace = ai as any;
            this.editForm.controls.name.setValue(this.currentMenace.name);
            this.editForm.controls.color.setValue(this.currentMenace.color);
            this.editForm.controls.incentives.controls.win.setValue(this.currentMenace.incentives.win);
            this.editForm.controls.incentives.controls.draw.setValue(this.currentMenace.incentives.draw);
            this.editForm.controls.incentives.controls.lose.setValue(this.currentMenace.incentives.lose);
          });
      }
    })
  }

  handleSubmit() {
    const { name, color, incentives } = this.editForm.value;
    
    this.api
      .updateAi({
        name: name?.trim() as string, // TODO: Can we deal with this by defining ai type
        color: color as string,
        win: incentives?.win as number,
        draw: incentives?.draw as number,
        lose: incentives?.lose as number,
        id: this.currentMenace.id
      })
      .subscribe((data) => {
        this.api.getAllAi();
      });
  }
}
