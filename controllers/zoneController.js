const Zone = require('../models/Zone');
const getLangAngLong = require('../utils/getLatAndLong');


exports.getAllDangerZones = async (req, res) => {
    try {
        let zones = await Zone.find({ current_status: "Danger" });
        res.status(200).json(zones)
    } catch (error) {
        res.status(501).json({ success: false, message: "No Danger Zone Available" })
    }
}

exports.getAllNwDangerZones = async (req, res) => {
    try {
        let zones = await Zone.find({ current_status: "Danger", region: "North West" });
        res.status(200).json(zones)
    } catch (error) {
        res.status(501).json({ success: false, message: "No Danger Zone Available In The North West" })
    }
}

exports.getAllSwDangerZones = async (req, res) => {
    try {
        let zones = await Zone.find({ current_status: "Danger", region: "South West" });
        res.status(200).json(zones)
    } catch (error) {
        res.status(501).json({ success: false, message: "No Danger Zone Available In The South West" })
    }
}

exports.addDangerZoneCount = async (req, res) => {
    try {
        console.log('Got Here Into Danger Zone Controller')
        let user_id = req.body.user_id;
        if (!user_id) {
            return res.send({ success: true, message: "There was an error with your request" });
        }
        const zone = await Zone.findOne({ location_name: req.body.location_name });

        if (zone) {
            // Check if Lat And Long for zone already exist if not then add
            if(!zone.lat && !zone.lng) {
                await getLangAngLong(req.body.location_name).then((response) => {
                    zone.lat = response.body.results[0].geometry.location.lat;
                    zone.lng = response.body.results[0].geometry.location.lng;
                    // console.log(response.body.results[0].geometry.location)
                });
            }

            if (zone.danger_count.indexOf(user_id) >= 0) {
                console.log('User Has Already Added Zone')
                return res.status(401).send({ success: false, message: "User has already voted place as danger" });
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

exports.addSafeCount = async (req, res) => {

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
                zone.save();
                return res.status(200).send({ success: true, message: "Successfully Added The Safe Count" })

            }

        }

    } catch (error) {
        return res.status(501).send({ success: false, message: "There was an error with the request" })
    }
}
