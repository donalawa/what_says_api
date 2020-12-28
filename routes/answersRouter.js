const express = require('express');
const answersRouter = express.Router();
const answerController = require('../controllers/answersController');

answersRouter.get('/answers', answerController.getAnswersForQuestion);

answersRouter.post('/answers', answerController.addAnswerForQUestionFb);

answersRouter.post('/answer/like', answerController.likeAnswer);

answersRouter.post('/answer/dislike', answerController.dislikeAnswer);

module.exports = answersRouter;