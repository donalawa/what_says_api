/**
* Description of the file. Add link pointers with {@link link
    name}
    * @author Donacien
    * @date 08/12/2020
    * Contributors : contributor name,
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuestionSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    region: {
        type: String
    },
    question_title: {
        type: String
    },
}, { timestamps: true });


module.exports = mongoose.model('Question', QuestionSchema );