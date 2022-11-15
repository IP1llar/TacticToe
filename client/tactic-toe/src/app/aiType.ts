interface succinctAi {
  name: string,
  color: string,
  id: number,
  results: {
    win: number,
    draw: number, 
    lose: number
  }
}

interface Ai extends succinctAi {
  states : {[boardState:string] : number[]},
  history : number[][]
}

export {Ai, succinctAi}