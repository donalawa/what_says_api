const Question = require('../models/Question');

exports.getAllQuestions = async (req,res) => {
    try {
        let questions = await Question.find({});
        return res.status(200).send(questions)
    } catch (error) {
        return res.status(501).send({success: false, message: "There was an error with the request"})
    }

}

exports.getAllNwQuestions = async (req,res) => {
    try {
        let questions = await Question.find({region: "North West"});
        return res.status(200).send(questions)
    } catch (error) {
        return res.status(501).send({success: false, message: "There was an error with the request"})
    }
}


exports.getAllSwQuestions = async (req,res) => {

    try {
        let questions = await Question.find({region: "South West"});
        return res.status(200).send(questions);
    } catch (error) {
        return res.status(501).send({success: false, message: "There was an error with the request"});
    }
}


exports.addQuestion = async (req,res) => {
    console.log(req.body)
    try {
        const exist = await Question.findOne({question_title: req.body.question_title});
 
        if(exist) {
            return res.send({success: true, message: "This question already exist try to search"});
        }
        await Question.create(req.body);
        return res.status(200).send({success: true, message: "Question added successfully"});
    } catch (error) {
        res.status(501).send({success: false, message: "There was an error with the request"})
    }
}
