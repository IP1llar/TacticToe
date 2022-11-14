// TODO: fix typing

export module transformations {
  export function transform (board:any, rotation:number[], flip:number[], beads = false) {
    const temp = [];
    for (let position of rotation) {
      temp.push(board[position]);
    }
    const out = [];
    for (let position of flip) {
      out.push(temp[position]);
    }
    if (beads) return out;
    return out.join('');
  }
  
  export function inverseTransform (board:any, oldRotation:number[], flip:number[], beads = false) {
    const temp = [];
    for (let position of flip) {
      temp.push(board[position]);
    }
    const out = [];
    const rotation = inverseRotation(oldRotation);
    for (let position of rotation) {
      out.push(temp[position]);
    }
    if (beads) return out;
    return out.join('');
  }
  
  function inverseRotation (rotation:number[]) {
    const inverses = {
      '012345678': [0,1,2,3,4,5,6,7,8],
      '630741852': [2,5,8,1,4,7,0,3,6],
      '876543210': [8,7,6,5,4,3,2,1,0],
      '258147036': [6,3,0,7,4,1,8,5,2]
    }
    return (inverses as any)[rotation.join('')];
  }
  export function transformBoard (board: any, show = false): any[] | number [] { // Each board state is given as a string '012120200' where 0 is empty, 1 is X and 2 is O
    let largest = [board, [0,1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7,8]];         // To store the state we rotate the board until we get the largest base 3 number
    const rotations = [
      [0,1,2,3,4,5,6,7,8],
      [6,3,0,7,4,1,8,5,2],
      [8,7,6,5,4,3,2,1,0],
      [2,5,8,1,4,7,0,3,6]
    ]
    const flips = [
      [0,1,2,3,4,5,6,7,8],
      [2,1,0,5,4,3,8,7,6]
    ]
  
    for (let flip of flips) {
      for (let rotation of rotations) {
        const boardTra = transform(board, rotation, flip)
        const boardTernary = Number(Number(boardTra).toString(3));
        if (boardTernary > Number(Number(largest[0]).toString(3))) largest = [boardTra, rotation, flip];
      }
    }
    if (show) return largest;
    return largest[0];
  };
}