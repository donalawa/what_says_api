const Answers = require('../models/Answers');

exports.getAnswersForQuestion = async (req,res) => {
    try {
        let questionId = req.params.quesId;
        let answers = await Answers.find({question_id: questionId});
        return res.status(200).send({success: true, message: "All Answers For Question", answers: answers})
    } catch (error) {
        return res.status(500).send({success: false, message: "There was an error in the request"})
    }
}


exports.addAnswerForQuestion = async (req,res) => {
    try {
        let userId = req.body.user_id;
        let questionId = req.body.question_id;
        let answerAllReadyAdded = await Answers.findOne({user_id: userId, question_id: questionId});
        if(answerAllReadyAdded) {
            return res.send({success: false, message: "You have already answerd this question"})
        }else {
            req.body.like_count = [];
            req.body.dislike_count = [];
            await Answers.create(req.body);
            res.status(201).send({success: true, message: "Answer Added Successfuly"})
        }
    } catch (error) {
        res.status(500).send({success: false, message: "There was an error with the request"})
    }
}


exports.likeAnswer = async (req,res) => {
    try {
        let answer = await Answers.findOne({_id: req.body.answer_id});
        let user_id  = req.body.user_id;
        if(answer.like_count.indexOf(user_id) >= 0) {
            return res.send({success: false, message: "User Has Already Liked This Answer"})
        }else {
            if(answer.dislike_count.indexOf(user_id) >= 0) {
                let index = answer.dislike_count.indexOf(user_id);
                answer.dislike_count.splice(index,1);
            }
            answer.like_count.push(user_id);
            await answer.save();
            return res.send({success: true, message: "Like Added"});
        }
    } catch (error) {
        return res.status(500).send({success: false, message: "There was an error with the request"})
    }
}

exports.dislikeAnswer = async (req,res) => {
    try {
        let answer = await Answers.findOne({_id: req.body.answer_id});
        let user_id  = req.body.user_id;
        if(answer.dislike_count.indexOf(user_id) >= 0) {
            return res.send({success: false, message: "User Has Already Disliked This Answer"})
        }else {
            if(answer.like_count.indexOf(user_id) >= 0) {
                let index = answer.like_count.indexOf(user_id);
                answer.like_count.splice(index,1);
            }
            answer.dislike_count.push(user_id);
            await answer.save();
            return res.send({success: true, message: "Dislike Added"});
        }
    } catch (error) {
        return res.status(500).send({success: false, message: "There was an error with the request"})
    }
}
