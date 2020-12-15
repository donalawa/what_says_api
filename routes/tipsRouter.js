const express = require('express');

const tipsRouter = express.Router();
const tipsController = require('../controllers/tipsController');


tipsRouter.get('/tips/nw',tipsController.getAllNwTips);

tipsRouter.get('/tips/sw',tipsController.getAllSwTips);

tipsRouter.get('/tips',tipsController.getAllTips);

tipsRouter.post('/tips', tipsController.addTips);

tipsRouter.post('/tips/like/:tipId',tipsController.likeTip);

tipsRouter.post('/tips/dislike/:tipId', tipsController.dislikeTip);

module.exports = tipsRouter; 