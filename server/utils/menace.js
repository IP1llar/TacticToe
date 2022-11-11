

// TODO: deal with forfeiting properly
function createMENACE (name, win = 3, lose = -1, draw = 1, history = [[0, 0]], results = {wins: 0, draws: 0, losses: 0}) {
  const states = generateStates();
  return {name, states, history, incentives: {
    win,
    lose,
    draw
  }, 
    results
  };
}

function trainMENACE (menace, {result, aiHistory}) {
  const value = menace.incentives[result];
  const lastResult = menace.history[menace.history.length - 1]
  menace.history.push([lastResult[0] + 1, lastResult[1] + value]);
  for (let move of aiHistory) {
    const index = move[0];
    const transformed = transformBoard(move[1], true);
    const transformedBeads = menace.states[transformed[0]];
    const beads = inverseTransform(transformedBeads, transformed[1], transformed[2], true);
    beads[index] += value;
    let updatedBeads = transform(beads, transformed[1], transformed[2], true);
    if (updatedBeads.every(el => el === '0') || updatedBeads.length !== 9) {
      updatedBeads = addBeads(transformed[0]);
    }
    menace.states[transformed[0]] = updatedBeads;
  }
  return menace;
}

function menacePlay (board, menace) {
  const transformed = transformBoard(board, true);
  // console.log(transformed)
  const transformedBeads = menace.states[transformed[0]];
  const beads = inverseTransform(transformedBeads, transformed[1], transformed[2], true);
  const totals = beads.map(str => Number(str));
  let total = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < totals[i]; j++) {
      total.push(i);
    }
  }

  let randomChoice = total[Math.floor(Math.random()*total.length)];
  let chosenIndex = Number(randomChoice);
  return chosenIndex;
}

function checkWin (board) {
  // console.log('Checking win for ', board)
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
    if (`${board[win[0]]}` === '0') continue;
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
  const dict = {
    9:8,
    8:6,
    7:4,
    6:2,
    5:2,
    4:1,
    3:1,
    2:1,
    1:1

  }
  for (let index of zeros) {
    let newState = state.split('');
    newState[index] = toPlay;
    newState = transformBoard(newState.join(''));
    if (symmetries.includes(newState)) continue;
    out[index] = dict[zeros.length];
    symmetries.push(newState);

  }
  return out;
}
function transform (board, rotation, flip, beads = false) {
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

function inverseTransform (board, oldRotation, flip, beads = false) {
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

function inverseRotation (rotation) {
  const inverses = {
    '012345678': [0,1,2,3,4,5,6,7,8],
    '630741852': [2,5,8,1,4,7,0,3,6],
    '876543210': [8,7,6,5,4,3,2,1,0],
    '258147036': [6,3,0,7,4,1,8,5,2]
  }
  return inverses[rotation.join('')];
}

// TODO: set smallest instead of largest for memory?
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

function randomMove (board) {
  const zeros = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === '0') zeros.push(i);
  }
  return zeros[Math.floor(Math.random()*zeros.length)]
}

function perfectMove (board, firstTurn, currentTurn = 1, depth = 0) {
  if(typeof board === 'string') board = board.split('').map(el => Number(el));
  // console.log({board, firstTurn, currentTurn})
  const res = [];
  const possibleMoves = [];
  const state = [...board];
  for (let i = 0; i < 9; i++) {
    if (state[i] === 0) possibleMoves.push(i);
  }
  for (let move of possibleMoves) {
    let total = 0;
    let newBoard = [...board];
    newBoard[move] = currentTurn;
    const win = checkWin(newBoard);
    if (win) {
      // console.log('win', currentTurn === firstTurn)
      if (currentTurn === firstTurn) total = 1;
      else total = -1;
    } else {
      total = perfectMove(newBoard, firstTurn, currentTurn === 1 ? 2 : 1, depth + 1);
      // if (total < toAdd) total += toAdd;
    }
    // console.log({newBoard, depth, total, currentTurn});
    res.push([total, move]);
  }
  // console.log({res})
  if (depth === 0) return res;
  if (res.length === 0) return 0;
  let val = 0;
  if (firstTurn === currentTurn) val = res.reduce((acc, prev) => prev[0] > acc ? prev[0]: acc, res[0][0]);
  else val = res.reduce((acc, prev) => prev[0] < acc ? prev[0]: acc, res[0][0]);
  // console.log({val});
  return val;
}

function perfectMove2 (board, firstTurn, currentTurn = firstTurn, depth = 0) {
  if(typeof board === 'string') board = board.split('').map(el => Number(el));
  // console.log({board, firstTurn, currentTurn})
  let res = [];
  res.push(currentTurn === firstTurn ? -Infinity : Infinity);
  const possibleMoves = [];
  const state = [...board];
  for (let i = 0; i < 9; i++) {
    if (state[i] === 0) possibleMoves.push(i);
  }
  for (let move of possibleMoves) {
    let total = 0;
    let newBoard = [...board];
    newBoard[move] = currentTurn;
    const win = checkWin(newBoard);
    if (win) {
      if (currentTurn === firstTurn) total = 1;
      else total = -1;
    } else {
      total = perfectMove2(newBoard, firstTurn, currentTurn === 1 ? 2 : 1, depth + 1)
    }
    // console.log([total, move], newBoard)
    if (currentTurn === firstTurn) {
      if (res[0] < total) res = [total, move] 
    } else {
      if (res[0] > total) res = [total, move] 
    }
  }
  // console.log(res);
  if (depth === 0) return res[1];
  if (res[0] === Infinity || res[0] === -Infinity) return 0;
  return res[0];
}

// console.log(perfectMove2('210010000', 2, 2));


module.exports = {createMENACE, menacePlay, trainMENACE, randomMove, perfectMove2};