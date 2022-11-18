"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRouter = void 0;
const aiRouter = require('express').Router();
exports.aiRouter = aiRouter;
const ai = require('../controllers/ai');
aiRouter.post('/create', ai.create);
aiRouter.post('/move', ai.move);
aiRouter.post('/train', ai.train);
aiRouter.get('/getAllAi', ai.getAllAi);
aiRouter.post('/get', ai.get);
aiRouter.post('/edit', ai.editAi);
aiRouter.post('/randommove', ai.random);
aiRouter.post('/perfectmove', ai.perfect);