const ai = require('../utils/menace');
const nigel = ai.createMENACE('Nigel');

function move (req, res) {
  try {
    console.log('Move registered');
    const { board } = req.body;
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