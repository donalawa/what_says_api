/**
* Description of the file. Add link pointers with {@link link
    name}
    * @author Donacien
    * @date 08/12/2020
    * Contributors : contributor name,
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AnswersSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    question_id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    answer_text: {
        type: String
    },
    like_count: [String],
    dislike_count: [String]
}, { timestamps: true });


module.exports = mongoose.model('Answers', AnswersSchema);