import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentMenace = {id: 1, name:'Bruce', color: 'black', incentives: {win: 3,draw: 1, lose: -1}, state: {}}
  id = 1;


  editForm = this.fb.group({
    name: [this.currentMenace.name, [Validators.required]],
    color: [this.currentMenace.color, [Validators.required]],
    incentives: this.fb.group({
      win: [3, [Validators.required]],
      draw: [1, [Validators.required]],
      lose: [-1, [Validators.required]],
    }),
  });


  constructor(private fb: FormBuilder, private api: APIClientService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.id = data.get('id') as unknown as number;
      this.api.getAi(this.id)
        .subscribe(ai => {
          this.currentMenace = ai as any;
          this.editForm.controls.name.setValue(this.currentMenace.name);
          this.editForm.controls.color.setValue(this.currentMenace.color);
          this.editForm.controls.incentives.controls.win.setValue(this.currentMenace.incentives.win);
          this.editForm.controls.incentives.controls.draw.setValue(this.currentMenace.incentives.draw);
          this.editForm.controls.incentives.controls.lose.setValue(this.currentMenace.incentives.lose);
          console.log('getting ai using params', ai);
        });
    })
  }

  handleSubmit() {
    const { name, color, incentives } = this.editForm.value;
    console.log({
      name: name as string,
      color: color as string,
      win: incentives?.win as number,
      draw: incentives?.draw as number,
      lose: incentives?.lose as number,
    });
    this.api
      .edit({
        name: name as string,
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
