import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  createForm = this.fb.group({
    name: ['', [Validators.required]],
    color: ['red', [Validators.required]],
    incentives: this.fb.group({
      win: [3, [Validators.required]],
      draw: [1, [Validators.required]],
      lose: [-1, [Validators.required]]
    })
  })

  constructor(private fb : FormBuilder, private api:APIClientService) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    const {name, color, incentives} = this.createForm.value;
    console.log({
      name:name as string, 
      color: color as string, 
      win: incentives?.win as number,
      draw: incentives?.draw as number,
      lose: incentives?.lose as number
  });
    this.api.createAi({
      name:name as string, 
      color: color as string, 
      win: incentives?.win as number,
      draw: incentives?.draw as number,
      lose: incentives?.lose as number
    }).subscribe(data=>{
      this.api.getAllAi()
      console.log(this.api.allAi);
    });

  }

}
