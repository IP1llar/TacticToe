const ai = require('../utils/menace');
const nigel = ai.createMENACE('Nigel');

function move (req, res) {
  try {
    let { board }= req.body;
    const aiMove = ai.menacePlay(board, nigel);
    res.status(200);
    res.send(JSON.stringify(aiMove));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

function train (req, res) {
  try {
    let match = req.body;
    ai.trainMENACE(nigel, match);
    res.status(201);
    res.send(nigel)
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

function random (req, res) {
  try {
    let { board }= req.body;
    const aiMove = ai.randomMove(board);
    res.status(200);
    res.send(JSON.stringify(aiMove));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

module.exports = { move, train, random }