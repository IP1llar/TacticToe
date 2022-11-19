import { Component, Input, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';
 
@Component({
  selector: 'app-ai-info',
  templateUrl: './ai-info.component.html',
  styleUrls: ['./ai-info.component.css']
})
export class AiInfoComponent implements OnInit {

  @Input() ai = {id: 1, name: 'Bruce', results: {win:1, draw: 2, lose: 700}, color:'black'};

  constructor(private api: APIClientService) { }

  ngOnInit(): void {
  }

  deleteAi(){
    this.api.deleteAi({id: this.ai.id as number}).subscribe((data) => {
      this.api.getAllAi();
    });

  }

}
