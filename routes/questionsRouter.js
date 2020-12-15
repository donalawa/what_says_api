const express = require('express');
const questionController = require('../controllers/questionController');

const questionRouter = express.Router();

questionRouter.get('/questions',questionController.getAllQuestions);

questionRouter.get('/questions/nw',questionController.getAllNwQuestions);

questionRouter.get('/questions/sw',questionController.getAllSwQuestions);

questionRouter.post('/questions',questionController.addQuestion);

module.exports = questionRouter;