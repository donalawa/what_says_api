/**
* Description of the file. Add link pointers with {@link link
    name}
    * @author Donacien
    * @date 08/12/2020
    * Contributors : contributor name,
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TipsSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    tip_text: {
        type: String,
        required: true
    },
    likes: [String], 
    dislikes: [String],
}, { timestamps: true });


module.exports = mongoose.model('Tips', TipsSchema );