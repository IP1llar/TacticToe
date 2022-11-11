import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  rootUrl = 'http://localhost:3000';

  constructor(private api: HttpClient) {}

  getAiMove(board: object) {
    return this.api.post<string>(`${this.rootUrl}/ai/move`, JSON.stringify(board), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  getRandomMove(board: string) {
    return this.api.post<string>(`${this.rootUrl}/random/move`, JSON.stringify({board}), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  getPerfectMove(board: string) {
    return this.api.post<string>(`${this.rootUrl}/perfect/move`, JSON.stringify({board}), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  sendMatch(aiHistory: ((number | string)[])[], result: 'win'|'draw'|'lose') {
    return this.api.post<any>(`${this.rootUrl}/ai/train`, JSON.stringify({
      result,
      aiHistory
    }), {
      headers: {'Content-Type': 'application/json'}
    })
  }

}
