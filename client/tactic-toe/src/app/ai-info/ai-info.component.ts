import { Component, Input, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ai-info',
  templateUrl: './ai-info.component.html',
  styleUrls: ['./ai-info.component.css']
})
export class AiInfoComponent implements OnInit {
  flag:boolean = false;
  @Input() ai = {id: 1, name: 'Bruce', results: {win:1, draw: 2, lose: 700}, color:'black'};

  constructor(private api: APIClientService, private location: Location) { }

  ngOnInit(): void {
    this.flag = this.location.path() === '/yourai';
  }

  deleteAi(){
    this.api.deleteAi({id: this.ai.id as number}).subscribe((data) => {
      this.api.getAllAi();
    });

  }

}
