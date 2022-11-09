

function createMENACE (name, win = 3, lose = -1, draw = 1) {
  const states = generateStates();
  return {name, states, incentives: {
    win,
    lose,
    draw
  }};
}

function menacePlay (board, menace) {
  const transformed = transformBoard(board, true);
  const transformedBeads = menace.states[transformed[0]];
  const beads = inverseTransform(transformedBeads, transformed[1], transformed[2]);
  const totals = beads.split('').map(str => Number(str));
  let total = 0;
  for (let i = 0; i < 9; i++) {
    total += Number(beads[i]);
  }
  let randomChoice = Math.floor(Math.random()*total);
  let chosenIndex = 0;
  while (randomChoice > 0) {
    if (totals[chosenIndex] === 0) chosenIndex++;
    else {
      totals[chosenIndex]--;
      randomChoice--;
    }
  }
  return chosenIndex;
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
  const out = {'000000000': addBeads('000000000')};
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
      if (numbers[0].length === 0) continue;
      temp.push(newState);
      out[newState] = addBeads(newState);
    }
  }
  return out;
}

function addBeads(state) {
  const zeros = [];
  const symmetries = [];
  for (let i = 0; i < 9; i++) {
    if (state[i] === '0') zeros.push(i);
  }
  const toPlay = zeros.length % 2 ? '1' : '2';
  const out = Array(9).fill(0);
  for (let index of zeros) {
    let newState = state.split('');
    newState[index] = toPlay;
    newState = transformBoard(newState.join(''));
    if (symmetries.includes(newState)) continue;
    out[index] = zeros.length;
    symmetries.push(newState);

  }
  return out;
}
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

function inverseTransform (board, oldRotation, flip) {
  const temp = [];
  for (let position of flip) {
    temp.push(board[position]);
  }
  const out = [];
  const rotation = inverseRotation(oldRotation);
  for (let position of rotation) {
    out.push(temp[position]);
  }
  return out.join('');
}

function inverseRotation (rotation) {
  const inverses = {
    '012345678': [0,1,2,3,4,5,6,7,8],
    '630741852': [2,5,8,1,4,7,0,3,6],
    '876543210': [8,7,6,5,4,3,2,1,0],
    '258147036': [6,3,0,7,4,1,8,5,2]
  }
  return inverses[rotation.join('')];
}

function transformBoard (board, show = false) { // Each board state is given as a string '012120200' where 0 is empty, 1 is X and 2 is O
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

module.exports = {createMENACE, menacePlay};