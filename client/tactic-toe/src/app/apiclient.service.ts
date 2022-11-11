import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  constructor(private api: HttpClient) {}

  getAiMove(board: object) {
    return this.api.post<string>(`api/ai/move`, JSON.stringify(board), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  getRandomMove(board: string) {
    return this.api.post<string>(`api/random/move`, JSON.stringify({board}), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  getPerfectMove(board: string) {
    return this.api.post<string>(`api/perfect/move`, JSON.stringify({board}), {
      headers: {'Content-Type': 'application/json'}
    })
  }

  sendMatch(aiHistory: ((number | string)[])[], result: 'win'|'draw'|'lose') {
    return this.api.post<any>(`api/ai/train`, JSON.stringify({
      result,
      aiHistory
    }), {
      headers: {'Content-Type': 'application/json'}
    })
  }

}
