const express = require('express');
const questionController = require('../controllers/questionController');

const questionRouter = express.Router();

questionRouter.post('/questions', questionController.addQuestionFb);

module.exports = questionRouter;