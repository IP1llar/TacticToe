import { Component, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ai-list',
  templateUrl: './ai-list.component.html',
  styleUrls: ['./ai-list.component.css']
})
export class AiListComponent implements OnInit {

  allAi: any[] = [];

  constructor(public api : APIClientService) { }

  ngOnInit(): void {
    this.api.sharedAllAi.subscribe(data => this.allAi = data)
  }


}
