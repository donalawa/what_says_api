const Answers = require('../models/Answers');
const db = require('../utils/intitFirebase').db;
const moment = require('moment');

const answerDb = db.collection('answers');

const { v4: uuidv4 } = require('uuid');

exports.addAnswerForQUestionFb = async(req, res) => {
    try {
        let userId = req.body.user_id;
        let id = uuidv4();
        let questionId = req.body.question_id;
        let date = moment().format();
        let data = { _id: id, user_id: userId, question_id: questionId, answer_text: req.body.answer_text, Created_At: date }
        let answer = await answerDb.doc(questionId).get();
        let allAnswers = [];
        if (!answer.exists) {
            await answerDb.doc(questionId).set({ answers: [data] });

        } else {
            let answer = await answerDb.doc(questionId).get();
            allAnswers = answer.data().answers;
            allAnswers.push(data);
            await answerDb.doc(questionId).update({ answers: allAnswers })
            console.log(allAnswers)
        }
        return res.status(201).send({ success: true, message: "Answer Added Successfuly" })
    } catch (error) {
        // console.log(error)
        res.status(500).send({ success: false, message: "There was an error with the request" })
    }
}