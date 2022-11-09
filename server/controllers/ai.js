const ai = require('../utils/menace');
const nigel = ai.createMENACE('Nigel');

function move (req, res) {
  try {
    console.log('Move registered');
    let board = req.body;
    board = board.map(el => {
      if (el === '') return '0';
      if (el === 'X') return '1';
      if (el === 'O') return '2';
    }).join('');
    const aiMove = ai.menacePlay(board, nigel);
    res.status(200);
    res.send(JSON.stringify(aiMove));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

module.exports = { move }