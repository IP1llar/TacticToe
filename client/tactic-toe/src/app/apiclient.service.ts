import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  allAi: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public sharedAllAi: Observable<any[]> = this.allAi.asObservable();

  constructor(private api: HttpClient) {
    this.getAllAi();
  }


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

  getAllAi() {
    console.log('Getting all ai')
    this.api.get<object[]>('api/ai/getAllAi', {
      withCredentials: true
    }).subscribe({
      next: data => {
        this.allAi.next(data);
      },
      error: error => console.log(error)
    })
  }

  createAi(ai: {name:string, win:number, lose:number, draw:number, color:string}) {
    console.log('creating', ai)
    return this.api.post('api/ai/create', JSON.stringify(ai), {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }

}
