const express = require('express');
const answersRouter = express.Router();
const answerController = require('../controllers/answersController');


answersRouter.post('/answers', answerController.addAnswerForQUestionFb);

module.exports = answersRouter;