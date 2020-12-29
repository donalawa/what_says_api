const Zone = require('../models/Zone');
const getLangAngLong = require('../utils/getLatAndLong');
const db = require('../utils/intitFirebase').db;
const moment = require('moment');

const answerDb = db.collection('answers');

const { v4: uuidv4 } = require('uuid');

const dangerDb = db.collection('dangerzones');

exports.addDangerZoneCountFb = async(req, res) => {
    try {
        console.log('Got Here')
        let user_id = req.body.user_id;
        if (!user_id) {
            return res.send({ success: true, message: "There was an error with your request" });
        }
        let zone = await dangerDb.where({ location_name: req.body.location_name }).get();
        if (zone) {
            console.log('No Zone')
            console.log(zone)
        }

        console.log(zone)
        return res.send({ message: 'Test ok' });
    } catch (error) {
        console.log(error)
    }
}
exports.addDangerZoneCount = async(req, res) => {
    try {
        console.log('Got Here Into Danger Zone Controller')
        let user_id = req.body.user_id;
        if (!user_id) {
            return res.send({ success: true, message: "There was an error with your request" });
        }
        const zone = await Zone.findOne({ location_name: req.body.location_name });

        if (zone) {
            // Check if Lat And Long for zone already exist if not then add
            if (!zone.lat && !zone.lng) {
                await getLangAngLong(req.body.location_name).then((response) => {
                    zone.lat = response.body.results[0].geometry.location.lat;
                    zone.lng = response.body.results[0].geometry.location.lng;
                    // console.log(response.body.results[0].geometry.location)
                });
            }

            if (zone.danger_count.indexOf(user_id) >= 0) {
                console.log('User Has Already Added Zone')
                return res.send({ success: false, message: "User has already voted place as danger" });
            } else {
                zone.danger_count.push(user_id);
                if (zone.danger_count.length > 2) {
                    zone.current_status = "Danger";
                }
                await zone.save();
                return res.status(200).send({ success: true, message: 'Danger Count Added' })
            }

        }
        //Perform operation to create zone with the first zone count
        req.body.danger_count = [user_id];
        req.body.safe_count = [];
        req.body.lng = null;
        req.body.lat = null;
        req.body.current_status = "Pending";
        await Zone.create(req.body);
        console.log('Zone Added Successfully')
        return res.status(200).send({
            message: 'Danger Zone Added',
            success: true
        });

    } catch (err) {
        console.log(err)
        res.status(501).send({ success: false, message: "There was an error" })
    }
}

exports.addSafeCount = async(req, res) => {

    try {
        let name = req.body.location_name;
        let user_id = req.body.user_id;
        let region = req.body.region;

        let zone = await Zone.findOne({ location_name: name, Region: region });
        if (zone.safe_count.length > zone.danger_count.length) {
            await Zone.deleteOne({ location_name: req.body.location_name });
            return res.status(200).send({ success: true, message: "Zone Is Now Safe" })
        } else {
            //Bellow we check if users id already exist in the id's for those who has voted as safe
            if (zone.safe_count.indexOf(user_id) >= 0) {
                return res.send({ success: false, message: "User already voted place as safe" })
            } else {
                zone.safe_count.push(user_id);
                await zone.save();
                return res.status(200).send({ success: true, message: "Successfully Added The Safe Count" })

            }

        }

    } catch (error) {
        return res.status(501).send({ success: false, message: "There was an error with the request" })
    }
}