import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { APIClientService } from '../apiclient.service';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-ai-info',
  templateUrl: './ai-info.component.html',
  styleUrls: ['./ai-info.component.css']
})
export class AiInfoComponent implements OnInit {
  flag:boolean = false;

  @Input() ai = {id: 1, name: 'Bruce', results: {win:1, draw: 2, lose: 700}, color:'black'};

  @Output() optionCreate = new EventEmitter(); editAi = new EventEmitter();
  constructor(private api: APIClientService, private location: Location,private route : Router) { }

  ngOnInit(): void {
    this.flag = (this.location.path() === '/yourai' || this.location.path() === '/create');
  }

  deleteAi(){
    this.api.deleteAi({id: this.ai.id as number}).subscribe((data) => {
      this.api.getAllAi();
    });
  }

  goEdit(){
    
    if(this.location.path() !== '/yourai'){
      this.route.navigateByUrl('/yourai');
      
    }
    this.api.editAi(this.ai.id);
  }
}


