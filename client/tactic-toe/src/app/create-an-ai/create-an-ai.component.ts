import { Component, OnInit } from '@angular/core';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-create-an-ai',
  templateUrl: './create-an-ai.component.html',
  styleUrls: ['./create-an-ai.component.css']
})
export class CreateAnAiComponent implements OnInit {

  constructor(private auth : APIClientService) { }

  ngOnInit(): void {
  }

}
