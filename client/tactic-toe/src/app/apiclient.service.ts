import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  rootUrl = 'http://localhost:3000';

  constructor(private api: HttpClient) {}

  getAiMove(board: string[]) {
    return this.api.post<string>(`${this.rootUrl}/ai/move`, JSON.stringify(board), {
      headers: {'Content-Type': 'application/json'}
    })
  }

}
