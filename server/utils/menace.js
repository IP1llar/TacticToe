

function createMENACE () {

}

function checkWin (board) {
  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for (let win of wins) {
    if (board[win[0]] === '0') continue;
    if (board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]]) return true;
  }
  return false;
}

function generateStates () {
  const temp = ['000000000'];
  const out = ['000000000'];
  while (temp.length) {
    let current = temp.shift();
    let numbers = {0:[], 1:0, 2:0};
    for (let i = 0; i < current.length; i++) {
      if (current[i] === '1') numbers[1]++;
      else if (current[i] === '2') numbers[2]++;
      else numbers[0].push(i);
    }
    const toPlay = ((numbers[1] + numbers[2]) % 2) + 1;
    for (let place of numbers[0]) {
      let newState = current.split('');
      newState[place] = toPlay;
      newState = newState.join('');
      if (checkWin(newState)) continue;
      newState = transformBoard(newState);
      if (temp.includes(newState)) continue;
      if (numbers[0].length > 1) {
        temp.push(newState);
        out.push(newState);
      }
    }
  }
  return out;
}

function transformBoard (board) { // Each board state is given as a string '012120200' where 0 is empty, 1 is X and 2 is O
  let largest = board;         // To store the state we rotate the board until we get the largest base 3 number
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

  function transform (board, rotation, flip) {
    const temp = [];
    for (let position of rotation) {
      temp.push(board[position]);
    }
    const out = [];
    for (let position of flip) {
      out.push(temp[position]);
    }
    return out.join('');
  }

  for (let flip of flips) {
    for (let rotation of rotations) {
      const boardTra = transform(board, rotation, flip)
      const boardTernary = Number(Number(boardTra).toString(3));
      if (boardTernary > Number(Number(largest).toString(3))) largest = boardTra;
    }
  }
  return largest;
}