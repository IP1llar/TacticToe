const ai = require('../utils/menace');
const nigel = ai.createMENACE('Nigel');
const db = require('../models');

async function move (req, res) {
  try {
    let { board, id }= req.body;
    // const retrieved = await retrieveAI(req.user.id || 1, id); // TODO: Remove
    // const aiMove = ai.menacePlay(board, retrieved);
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

function perfect (req, res) {
  console.log('perfect')
  try {
    let { board }= req.body;
    const aiMove = ai.perfectMove2(board, 2, 2);
    res.status(200);
    res.send(JSON.stringify(aiMove));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

function create (req, res) {
  console.log(req.user);
  try {
    let { name }= req.body;
    const newAi = ai.createMENACE(name);
    db.Ais.create({...newAi, UserId: req.user.id})
    res.status(200);
    res.send(JSON.stringify('created'));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function retrieveAI (UserId, aiId) {
  try {
    const retrieved = await db.Ais.findOne({where:{
      UserId, id: aiId
    }})
    if (retrieved) return retrieved;
    throw new Error();
  } catch (error) {
    console.log('Error');
    return error;
  }
}

module.exports = { move, train, random, perfect, create }