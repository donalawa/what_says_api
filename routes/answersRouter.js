const express = require('express');
const answersRouter = express.Router();
const answerController = require('../controllers/answersController');

// answersRouter.get('/answers', answerController.getAnswersForQuestion);

answersRouter.post('/answers', answerController.addAnswerForQUestionFb);

module.exports = answersRouter;