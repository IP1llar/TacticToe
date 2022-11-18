"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformation = void 0;
// TODO: set smallest instead of largest for memory? Wouldn't make a difference unless store as bare number and readd any 0s at the start
function transformBoard(board, show = false) {
    let largest = [board, [0, 1, 2, 3, 4, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]]; // An array so we can keep track of the used rotation and flip
    const rotations = [[0, 1, 2, 3, 4, 5, 6, 7, 8], [6, 3, 0, 7, 4, 1, 8, 5, 2], [8, 7, 6, 5, 4, 3, 2, 1, 0], [2, 5, 8, 1, 4, 7, 0, 3, 6]]; // Every possible matrix rotation
    const flips = [[0, 1, 2, 3, 4, 5, 6, 7, 8], [2, 1, 0, 5, 4, 3, 8, 7, 6]]; // Every matrix flip
    for (let flip of flips) { // Loop through flips and rotations to generate every symmetric board
        for (let rotation of rotations) {
            const boardTra = exports.transformation.transform(board, rotation, flip);
            const boardTernary = Number(Number(boardTra).toString(3));
            if (boardTernary > Number(Number(largest[0]).toString(3)))
                largest = [boardTra, rotation, flip]; // Compare board to largest and store the largest
        }
    }
    if (show)
        return largest; // board, rotation and flip
    return largest[0]; // Just the board
}
;
function inverseRotation(rotation) {
    const inverses = {
        '012345678': [0, 1, 2, 3, 4, 5, 6, 7, 8],
        '630741852': [2, 5, 8, 1, 4, 7, 0, 3, 6],
        '876543210': [8, 7, 6, 5, 4, 3, 2, 1, 0],
        '258147036': [6, 3, 0, 7, 4, 1, 8, 5, 2]
    };
    return inverses[rotation.join('')];
}
function transform(board, rotation, flip, notjoin = false) {
    const temp = [];
    for (let position of rotation) {
        temp.push(board[position]);
    }
    const out = [];
    for (let position of flip) {
        out.push(temp[position]);
    }
    if (notjoin)
        return out; // return as array 
    return out.join(''); // return as string
}
function inverseTransform(board, oldRotation, flip, beads = false) {
    const temp = [];
    for (let position of flip) {
        temp.push(board[position]);
    }
    const out = [];
    const rotation = inverseRotation(oldRotation);
    for (let position of rotation) {
        out.push(temp[position]);
    }
    if (beads)
        return out;
    return out.join('');
}
exports.transformation = {
    inverseRotation: inverseRotation,
    transform: transform,
    inverseTransform: inverseTransform,
    transformBoard: transformBoard
};
