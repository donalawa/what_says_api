const express = require('express');
const answersRouter = express.Router();
const answerController = require('../controllers/answersController');

answersRouter.get('/answers/:quesId',answerController.getAnswersForQuestion);

answersRouter.post('/answers',answerController.addAnswerForQuestion);

answersRouter.post('/answer/like',answerController.likeAnswer);

answersRouter.post('/answer/dislike',answerController.dislikeAnswer);

module.exports = answersRouter;