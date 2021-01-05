const express = require('express');

const tipsRouter = express.Router();
const tipsController = require('../controllers/tipsController');


tipsRouter.post('/tips', tipsController.addTipsFb);

tipsRouter.post('/tip/favorite', tipsController.addTipsFavFb)

tipsRouter.post('/tips/like', tipsController.likeTipFb);

tipsRouter.post('/tips/dislike', tipsController.dislikeTipFb);

module.exports = tipsRouter;