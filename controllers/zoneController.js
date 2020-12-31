const Zone = require('../models/Zone');
const getLangAngLong = require('../utils/getLatAndLong');
const db = require('../utils/intitFirebase').db;
const moment = require('moment');

const { v4: uuidv4 } = require('uuid');

const dangerDbNw = db.collection('dangerzonesnw');
const dangerDbSw = db.collection('dangerzonessw');

exports.addDangerZoneCountFb = async(req, res) => {
    try {
        console.log('Got Here')
        let user_id = req.body.user_id;
        let id = uuidv4();
        let date = moment().format();
        let region = req.body.region;
        let location_name = req.body.location_name;
        let danger_count = [];
        let safe_count = [];
        let lng = null;
        let lat = null;
        let current_status = 'Pending';
        if (!user_id) {
            return res.send({ success: true, message: "There was an error with your request" });
        }

        if(region == "North West"){
            console.log('Proceed With Operations')
            let zone = await dangerDbNw.doc(location_name).get();
            
            if (zone.exists) {
                console.log("Above Zone");
                console.log('Zone Exist')
                // console.log(zone.data())
                zone = zone.data();
                danger_count = zone.danger_count;
                lat = zone.lat;
                lng = zone.lng;
                
                // Check if Lat And Long for zone already exist if not then add
                if (!zone.lat && !zone.lng) {
                    console.log("No Lat And Long")
                    await getLangAngLong(req.body.location_name).then((response) => {
                        lat = response.body.results[0].geometry.location.lat;
                        lng = response.body.results[0].geometry.location.lng;
                        // console.log(response.body.results[0].geometry.location)
                    });
                }
    
                if (zone.danger_count.indexOf(user_id) >= 0) {
                    console.log('User Has Already Added Zone')
                    return res.send({ success: false, message: "User has already voted place as danger" });
                } else {
                    if(zone.current_status == "Danger"){
                        return res.send({success: false, message: "Zone Is Already In Danger"})
                    }
                    danger_count.push(user_id);
                    if (zone.danger_count.length > 2) {
                        current_status = "Danger";
                    }
                 
                    await dangerDbNw.doc(location_name).update({current_status: current_status,danger_count: danger_count, lat: lat, lng: lng})
                    return res.status(200).send({ success: true, message: 'Danger Count Added' })
                }
    
            }
            danger_count.push(user_id);
            let newZone = {_id: id, user_id: user_id, region: region, location_name: location_name, lat: lat, lng: lng, current_status: current_status, danger_count: danger_count, safe_count: safe_count, CreatedAt: date};
            await dangerDbNw.doc(location_name).set(newZone);
            return res.send({message:"Zone Added"})
        }else if(region == "South West"){
            console.log('Proceed With Operations')
            let zone = await dangerDbSw.doc(location_name).get();
           
            if (zone.exists) {
                console.log("Above Zone");
                console.log('Zone Exist')
                // console.log(zone.data())
                zone = zone.data();
                danger_count = zone.danger_count;
                lat = zone.lat;
                lng = zone.lng;
                
                // Check if Lat And Long for zone already exist if not then add
                if (!zone.lat && !zone.lng) {
                    console.log("No Lat And Long")
                    await getLangAngLong(req.body.location_name).then((response) => {
                        lat = response.body.results[0].geometry.location.lat;
                        lng = response.body.results[0].geometry.location.lng;
                        // console.log(response.body.results[0].geometry.location)
                    });
                }
    
                if (zone.danger_count.indexOf(user_id) >= 0) {
                    console.log('User Has Already Added Zone')
                    return res.send({ success: false, message: "User has already voted place as danger" });
                } else {
                    if(zone.current_status == "Danger"){
                        return res.send({success: false, message: "Zone Is Already In Danger"})
                    }

                    danger_count.push(user_id);
                    if (zone.danger_count.length > 2) {
                        current_status = "Danger";
                    }
                 
                    await dangerDbSw.doc(location_name).update({current_status: current_status,danger_count: danger_count, lat: lat, lng: lng})
                    return res.status(200).send({ success: true, message: 'Danger Count Added' })
                }
    
            }
            danger_count.push(user_id);
            let newZone = {_id: id, user_id: user_id, region: region, location_name: location_name, lat: lat, lng: lng, current_status: current_status, danger_count: danger_count, safe_count: safe_count, CreatedAt: date};
            await dangerDbSw.doc(location_name).set(newZone);
            return res.send({message:"Zone Added"})
        
        }

        return res.status(400).send({status: false, message: "There was an error with request"})
    } catch (error) {
        console.log(error)
    }
}

exports.addSafeCountFb = async(req,res) => {
    try {
        let name = req.body.location_name;
        let user_id = req.body.user_id;
        let region = req.body.region;
        let safe_count = [];
        if(region == "North West"){
            let zone = await dangerDbNw.doc(name).get();
            zone = zone.data();
            safe_count = zone.safe_count;
            if(zone.safe_count.length > zone.danger_count.length){
                await dangerDbNw.doc(name).delete();
                return res.status(200).send({ success: true, message: "Zone Is Now Safe" })
            }else {
                if (zone.safe_count.indexOf(user_id) >= 0) {
                    return res.send({ success: false, message: "User already voted place as safe" })
                } else {
                    safe_count.push(user_id);
                    await dangerDbNw.doc(name).update({safe_count: safe_count});
                    return res.status(200).send({ success: true, message: "Successfully Added The Safe Count" })
                }
            }
        }else if(region == "South West") {
            let zone = await dangerDbSw.doc(name).get();
            zone = zone.data();
            console.log(zone)
            safe_count = zone.safe_count;
            if(zone.safe_count.length > zone.danger_count.length){
                await dangerDbSw.doc(name).delete();
                return res.status(200).send({ success: true, message: "Zone Is Now Safe" })
            }else {
                if (zone.safe_count.indexOf(user_id) >= 0) {
                    return res.send({ success: false, message: "User already voted place as safe" })
                } else {
                    safe_count.push(user_id);
                    await dangerDbSw.doc(name).update({safe_count: safe_count});
                    return res.status(200).send({ success: true, message: "Successfully Added The Safe Count" })
                }
            }
        }

    return res.status(400).send({status: false, message: "There was an error with request"})
    } catch (error) {
        console.log(error)
        return res.status(501).send({ success: false, message: "There was an error with the request" })
    }
}
