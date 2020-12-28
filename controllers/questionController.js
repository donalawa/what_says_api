const Question = require('../models/Question');
const db = require('../utils/intitFirebase').db;
const moment = require('moment');

const questionNwDb = db.collection('questionnw');
const questionSwDb = db.collection('questionsw');

const { v4: uuidv4 } = require('uuid');

console.log(uuidv4())
let date = new Date();
// console.log(moment().format())

// console.log(date.getFul);

exports.getAllQuestions = async(req, res) => {
    try {
        let questions = await Question.find({});
        return res.status(200).send(questions)
    } catch (error) {
        return res.status(501).send({ success: false, message: "There was an error with the request" })
    }

}

exports.getAllNwQuestions = async(req, res) => {
    try {
        let questions = await Question.find({ region: "North West" });
        return res.status(200).send(questions)
    } catch (error) {
        return res.status(501).send({ success: false, message: "There was an error with the request" })
    }
}


exports.getAllSwQuestions = async(req, res) => {

    try {
        let questions = await Question.find({ region: "South West" });
        return res.status(200).send(questions);
    } catch (error) {
        return res.status(501).send({ success: false, message: "There was an error with the request" });
    }
}


exports.addQuestion = async(req, res) => {
    console.log('#########Request BOdy Bellow')
    console.log(req.body)
    try {
        const exist = await Question.findOne({ question_title: req.body.question_title });

        if (exist) {
            return res.send({ success: true, message: "This question already exist try to search" });
        }
        await Question.create(req.body);
        return res.status(200).send({ success: true, message: "Question added successfully" });
    } catch (error) {
        res.status(501).send({ success: false, message: "There was an error with the request" })
    }
}


exports.addQuestionFb = async(req, res) => {
    let date = moment().format();
    let id = uuidv4();
    let questionTitle = req.body.question_title;
    let userId = req.body.user_id;
    let region = req.body.region;

    console.log(req.body)
    let data = {
        _id: id,
        user_id: userId,
        region: region,
        question_title: questionTitle,
        CreatedAt: date,
    }

    try {
        if (req.body.region == "North West") {
            await questionNwDb.doc(id).set(data)
            return res.status(200).send({ success: true, message: "Question added successfully" });
        } else if (req.body.region == "South West") {
            await questionSwDb.doc(id).set(data)
            return res.status(200).send({ success: true, message: "Question added successfully" });
        } else {
            res.status(400).send({ success: false, message: "Error With Data" })
        }
    } catch (error) {
        console.log(error)
        res.status(501).send({ success: false, message: "There was an error with the request" })
    }
}


// exports.getQuestionFb = async(req, res) => {
//     let question = await questionSwDb.get();
//     console.log(question.forEach((doc) => {
//         console.log(doc.data())
//     }));
//     res.send('Good Work');
// }