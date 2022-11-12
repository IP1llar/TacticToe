import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-info',
  templateUrl: './ai-info.component.html',
  styleUrls: ['./ai-info.component.css']
})
export class AiInfoComponent implements OnInit {

  @Input() ai = {name: 'Bruce', results: {wins:1, draws: 2, losses: 700}, color:'black'};

  constructor() { }

  ngOnInit(): void {
  }

}
