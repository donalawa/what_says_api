const Question = require('../models/Question');
const db = require('../utils/intitFirebase').db;
const moment = require('moment');

const questionNwDb = db.collection('questionnw');
const questionSwDb = db.collection('questionsw');

const { v4: uuidv4 } = require('uuid');

console.log(uuidv4())


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
            return res.status(400).send({ success: false, message: "Error With Data" })
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