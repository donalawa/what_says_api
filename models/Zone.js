/**
* Description of the file. Add link pointers with {@link link
    name}
    * @author Donacien
    * @date 08/12/2020
    * Contributors : contributor name,
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ZoneSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    region: {
        type: String
    },
    location_name: {
        type: String,
        required: true
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    current_status: {
        type: String
    },
    danger_count: [String],
    safe_count: [String],
    safe_num: {
        type: Number
    },
}, { timestamps: true });


module.exports = mongoose.model('Zone', ZoneSchema);