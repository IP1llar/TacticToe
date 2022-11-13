import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-info',
  templateUrl: './ai-info.component.html',
  styleUrls: ['./ai-info.component.css']
})
export class AiInfoComponent implements OnInit {

  @Input() ai = {id: 1, name: 'Bruce', results: {win:1, draw: 2, lose: 700}, color:'black'};

  constructor() { }

  ngOnInit(): void {
  }

}
