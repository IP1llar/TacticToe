"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAi = exports.get = exports.getAllAi = exports.create = exports.perfect = exports.random = exports.train = exports.move = void 0;
const ai = require('../utils/menace');
const { db } = require('../models');
// TODO: Better error messages
async function move(req, res) {
    try {
        let { board, id } = req.body;
        const retrieved = await retrieveAI(req.user, id);
        const aiMove = ai.menacePlay(board, retrieved);
        res.status(200);
        res.json(aiMove);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.move = move;
async function train(req, res) {
    try {
        let { match, id } = req.body;
        let retrieved = await retrieveAI(req.user, id);
        ai.trainMENACE(retrieved, match);
        await updateAi(retrieved);
        retrieved = await retrieveAI(req.user, id);
        res.status(201);
        res.send(retrieved);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.train = train;
async function updateAi(ai) {
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
        });
    }
    catch (error) {
        console.log(error);
    }
}
async function editAi(req, res) {
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
        });
        res.status(200);
        res.json('Edited');
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.editAi = editAi;
function random(req, res) {
    try {
        let { board } = req.body;
        const aiMove = ai.randomMove(board);
        res.status(200);
        res.json(aiMove);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.random = random;
function perfect(req, res) {
    try {
        let { board, toPlay } = req.body;
        const aiMove = ai.perfectMove(board, toPlay === 'X' ? 1 : 2);
        res.status(200);
        res.json(aiMove);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.perfect = perfect;
async function create(req, res) {
    try {
        let { name, win, lose, draw, color } = req.body;
        const newAi = ai.createMENACE(name, win, lose, draw, color);
        await db.Ais.create({ ...newAi, UserId: req.user });
        res.status(200);
        res.json('created');
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.create = create;
async function retrieveAI(UserId, aiId) {
    try {
        const retrieved = await db.Ais.findOne({
            where: {
                UserId, id: aiId
            }
        });
        if (retrieved)
            return retrieved;
        throw new Error();
    }
    catch (error) {
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
        });
        res.status(200);
        res.send(JSON.stringify(retrieved));
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.getAllAi = getAllAi;
async function get(req, res) {
    try {
        const retrieved = await db.Ais.findOne({
            where: {
                UserId: req.user,
                id: req.body.id
            },
        });
        res.status(200);
        res.send(JSON.stringify(retrieved));
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.send('Error');
    }
}
exports.get = get;
