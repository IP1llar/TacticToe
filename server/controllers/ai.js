const ai = require('../utils/menace');
const nigel = ai.createMENACE('Nigel');
const db = require('../models');

async function move(req, res) {
  try {
    let { board, id } = req.body;
    const retrieved = await retrieveAI(req.user, id);
    // console.log({ retrieved, body: { board, id } })
    const aiMove = ai.menacePlay(board, retrieved);
    // const aiMove = ai.menacePlay(board, nigel);
    res.status(200);
    res.send(JSON.stringify(aiMove));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function train(req, res) {
  try {
    // console.log(req.body);
    let { match, id } = req.body;
    let retrieved = await retrieveAI(req.user, id);
    ai.trainMENACE(retrieved, match);
    await updateAi(retrieved);
    // console.log(retrieved, 'menace to be sent back')
    retrieved = await retrieveAI(req.user, id);
    res.status(201);
    res.send(retrieved)
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function updateAi(ai) {
  // console.log(ai, 'to update');
  try {
    const toUpdate = await db.Ais.update({
      states: ai.states,
      history: ai.history,
      name: ai.name,
      incentives: ai.incentives,
      results: ai.results,
      color: ai.color
    }, {
      where: {
        id: ai.id
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
}

function random(req, res) {
  try {
    let { board } = req.body;
    const aiMove = ai.randomMove(board);
    res.status(200);
    res.json(aiMove);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

function perfect(req, res) {
  // console.log('perfect')
  try {
    let { board, toPlay } = req.body;
    const aiMove = ai.perfectMove2(board, toPlay === 'X' ? 1 : 2);
    res.status(200);
    res.json(aiMove);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function create(req, res) {
  // console.log(req.user);
  try {
    // console.log(req.body)
    let { name, win, lose, draw, color } = req.body;
    // console.log({ name, win, lose, draw, color })
    const newAi = ai.createMENACE(name, win, lose, draw, color);
    await db.Ais.create({ ...newAi, UserId: req.user })
    res.status(200);
    res.json('created');
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function retrieveAI(UserId, aiId) {
  try {
    const retrieved = await db.Ais.findOne({
      where: {
        UserId, id: aiId
      }
    })
    if (retrieved) return retrieved;
    throw new Error();
  } catch (error) {
    console.log('Error');
    return error;
  }
}

async function getAllAi(req, res) {
  try {
    const retrieved = await db.Ais.findAll({
      where: {
        UserId: req.user
      },
      attributes: ['id', 'name', 'results', 'color']
    })
    res.status(200);
    res.send(JSON.stringify(retrieved));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function get(req, res) {
  // console.log(req.body);
  try {
    const retrieved = await db.Ais.findOne({
      where: {
        UserId: req.user,
        id: req.body.id
      },
    })
    res.status(200);
    res.send(JSON.stringify(retrieved));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

module.exports = { move, train, random, perfect, create, getAllAi, get }