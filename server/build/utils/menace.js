"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformation_1 = require("./transformation");
//?josepcomments 
function createMENACE(name, win = 3, lose = -1, draw = 1, color = 'red', history = [[0, 0]], results = { win: 0, draw: 0, lose: 0 }) {
    const states = generateStates(); // Generate every board state taking into account symmetries
    return { name, states, history, results, color, incentives: { win, lose, draw } };
}
function generateStates() {
    const temp = ['000000000']; // queue to generate every possible state -   3^9 = 19.683 states
    const out = { '000000000': addBeads('000000000') };
    while (temp.length) {
        let current = temp.shift();
        let numbers = { 0: [], 1: 0, 2: 0 }; // Determine who goes next by counting up the 1s and 2s 
        for (let i = 0; i < current.length; i++) { // TODO: can be calculated with just counting the zeros
            if (current[i] === '1')
                numbers[1]++;
            else if (current[i] === '2')
                numbers[2]++;
            else
                numbers[0].push(i); // Compile a list of all open spaces
        }
        const toPlay = String(((numbers[1] + numbers[2]) % 2) + 1); // This gives who is to go next (1 or 2)
        for (let place of numbers[0]) { // Cycle through open spaces and place 1 (or 2) there
            let boardArr = current.split('');
            boardArr[place] = toPlay;
            let newState = boardArr.join('');
            if (checkWin(newState))
                continue; // If it's a win then the AI doesn't need to know where to go next as the game is over
            newState = transformation_1.transformation.transformBoard(newState); // To deal with symmetries, we need to normalise which state is stored
            if (temp.includes(newState))
                continue;
            if (numbers[0].length === 0)
                continue; // TODO: Check if necessary
            temp.push(newState);
            out[newState] = addBeads(newState); // Add the relevant probabilities taking into account symmetries
        }
    }
    return out; // An object with board states as keys, and probabilities as values
}
function checkWin(board) {
    const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let win of wins) {
        if (`${board[win[0]]}` === '0')
            continue;
        if (board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]])
            return true;
    }
    return false;
}
function addBeads(state) {
    const zeros = []; // Check where possible moves are
    for (let i = 0; i < 9; i++) {
        if (state[i] === '0')
            zeros.push(i);
    }
    const symmetries = [];
    const toPlay = zeros.length % 2 ? '1' : '2'; // Calculate who's to play next
    const out = Array(9).fill(0);
    const dict = { 9: 8, 8: 6, 7: 4, 6: 2, 5: 2, 4: 1, 3: 1, 2: 1, 1: 1 }; // States with more moves on require fewer beads to aid training speed
    for (let index of zeros) { // Loop through each possible move and add the right number of beads
        let boardArr = state.split(''); // Create a new board as if you'd just played there
        boardArr[index] = toPlay;
        let newState = transformation_1.transformation.transformBoard(boardArr.join('')); // Get the normalised version
        if (symmetries.includes(newState))
            continue; // If true, we've already accounted for a symmetry of this position and don't need to add more beads
        out[index] = dict[zeros.length]; // Otherwise add beads and add state to symmetry array
        symmetries.push(newState);
    }
    return out; // Returns an array of beads
}
function trainMENACE(menace, { result, matchMoves }) {
    const value = menace.incentives[result]; // Check how to reward (or punish) the ai
    const lastResult = menace.history[menace.history.length - 1];
    menace.results[result]++;
    menace.history.push([lastResult[0] + 1, lastResult[1] + value]); // Update the ai history
    for (let move of matchMoves) { // Loop through the moves made in the match and update the bead count
        const index = move[0];
        // The match state may be a different transformation to that which is stored in the ai
        // - We need to find out this transformation so we can update the correct beads
        const transformed = transformation_1.transformation.transformBoard(move[1], true); // TODO: array destructure: 0 is board, 1 is rotation, 2 is flip
        const transformedBeads = menace.states[transformed[0]]; // Get the beads as they are stored
        const beads = transformation_1.transformation.inverseTransform(transformedBeads, transformed[1], transformed[2], true); // Inverse transform the beads to match the current match state
        beads[index] = ((beads[index] + value >= 0) ? (beads[index] + value) : 0); // Update the beads with the incentive
        let updatedBeads = transformation_1.transformation.transform(beads, transformed[1], transformed[2], true); // transform the beads back to be stored
        // Check for some edge cases
        if (updatedBeads.every(el => el === 0) || updatedBeads.length !== 9 || updatedBeads.some(el => Number(el) < 0)) { // TODO: review these conditions
            updatedBeads = addBeads(transformed[0]);
        }
        menace.states[transformed[0]] = updatedBeads; // store the beads
    }
    return menace;
}
function menacePlay(board, menace) {
    const transformed = transformation_1.transformation.transformBoard(board, true); // Normalise board
    const transformedBeads = menace.states[transformed[0]]; // Get beads using normalised board
    const beads = transformation_1.transformation.inverseTransform(transformedBeads, transformed[1], transformed[2], true); // Inverse transform to match the current match state
    // Pick a place to go using the numbers of beads a weighted probabilities
    const totals = beads.map((str) => Number(str)); // TODO: Check if 'Number' still necessary
    let total = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < totals[i]; j++) {
            total.push(i); // Given a possible position i and a number of beads (weight) j, add that position to total j times
        }
    }
    // Select random position
    let randomChoice = total[Math.floor(Math.random() * total.length)];
    let chosenIndex = Number(randomChoice);
    return chosenIndex;
}
function randomMove(board) {
    const zeros = []; // Calculate possible moves
    for (let i = 0; i < 9; i++) {
        if (board[i] === '0')
            zeros.push(i);
    }
    return zeros[Math.floor(Math.random() * zeros.length)]; // Pick a random move
}
function perfectMove(board, firstTurn, currentTurn = firstTurn, depth = 0) {
    // Calculate the best move assuming your opponent will play the best move by rating a win by +1, a draw as +0 and a loss as -1
    // When summing up at the end, on our turn pick the best move for us, on the opponent's turn pick the best move for the,
    if (typeof board === 'string')
        board = board.split('').map(el => Number(el)); // TODO: Check if still needed
    let res = [];
    res.push(currentTurn === firstTurn ? -Infinity : Infinity); // We'll either look for largest or smallest number given whose turn it is
    const possibleMoves = [];
    const state = [...board];
    for (let i = 0; i < 9; i++) { // Calculate all places we can go
        if (state[i] === 0)
            possibleMoves.push(i);
    }
    for (let move of possibleMoves) { // Loop through those moves (a draw will have no possible moves so we don't loop)
        let total = 0;
        let newBoard = [...board];
        newBoard[move] = currentTurn;
        const win = checkWin(newBoard);
        if (win) { // Recursive end case
            if (currentTurn === firstTurn)
                total = 1; // we win
            else
                total = -1; // we lose
        }
        else {
            total = perfectMove(newBoard, firstTurn, currentTurn === 1 ? 2 : 1, depth + 1); // Recursively check the next move until there's a win or a draw
        }
        if (currentTurn === firstTurn) { // We only get here if there's been a win so we need to update res 
            if (res[0] < total)
                res = [total, move]; // It's our go so update res if we get a better result for us
        }
        else {
            if (res[0] > total)
                res = [total, move]; // It's their go so update res if it's a worse result for us
        }
    }
    if (depth === 0)
        return res[1]; // Return index if on surface level
    if (res[0] === Infinity || res[0] === -Infinity)
        return 0; // Account for draws
    return res[0]; // Otherwise return total from this level
}
module.exports = { createMENACE, menacePlay, trainMENACE, randomMove, perfectMove };
