import { Component, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ai-list',
  templateUrl: './ai-list.component.html',
  styleUrls: ['./ai-list.component.css']
})
export class AiListComponent implements OnInit {

  allAI: any[] = [];

  constructor(private api : APIClientService) { }

  ngOnInit(): void {
    this.fetchAllAi();
  }

  fetchAllAi() {
    this.api.getAllAi().subscribe(data => {
      this.allAI = data;
      console.log(data);
    });
  }

}
