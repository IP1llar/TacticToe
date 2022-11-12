import { Component, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-create-an-ai',
  templateUrl: './create-an-ai.component.html',
  styleUrls: ['./create-an-ai.component.css']
})
export class CreateAnAiComponent implements OnInit {

  allAI: any[] = [];

  constructor(private auth : APIClientService) { }

  ngOnInit(): void {
    this.fetchAllAi();
  }

  fetchAllAi() {
    this.auth.getAllAi().subscribe(data => this.allAI = data);
  }

}
