import express from 'express'
const ai = require('../utils/menace');
const {db} = require('../models');
import {User} from '../models/users'
import {ai} from '../models/ais'


// TODO: Better error messages

async function move(req:express.Request, res:express.Response) {
  try {
    let { board, id } = req.body;
    const retrieved = await retrieveAI(req.user, id);
    const aiMove = ai.menacePlay(board, retrieved);
    res.status(200);
    res.json(aiMove);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function train(req:express.Request, res:express.Response) {
  try {
    let { match, id } = req.body;
    let retrieved = await retrieveAI(req.user, id);
    ai.trainMENACE(retrieved, match);
    await updateAi(retrieved);
    retrieved = await retrieveAI(req.user, id);
    res.status(201);
    res.send(retrieved)
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function updateAi(ai:ai) {
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
  }
}

async function editAi(req:express.Request, res:express.Response) {
  try {
    let { name, win, lose, draw, color, id } = req.body;
    const toUpdate = await db.Ais.update({
      name: name,
      incentives: {
        win, lose, draw
      },
      color: color
    }, {
      where: {
        id: id
      }
    })
    res.status(200);
    res.json('Edited');
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}


function random(req:express.Request, res:express.Response) {
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

function perfect(req:express.Request, res:express.Response) {
  try {
    let { board, toPlay } = req.body;
    const aiMove = ai.perfectMove(board, toPlay === 'X' ? 1 : 2);
    res.status(200);
    res.json(aiMove);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function create(req:express.Request, res:express.Response) {
  try {
    let { name, win, lose, draw, color } = req.body;
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


async function deleteAi(req:express.Request, res:express.Response) {
  try {
    let { id } = req.body;
    let row = await db.Ais.findOne({
      where: {
        id: id
      }
    })
    if(row){
      await row.destroy();
    }
    res.status(200);
    res.json('Edited');
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error');
  }
}

async function retrieveAI(UserId:User, aiId:number) {
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

async function getAllAi(req:express.Request, res:express.Response) {
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

async function get(req:express.Request, res:express.Response) {
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

export { move, train, random, perfect, create, getAllAi, get, editAi, deleteAi }