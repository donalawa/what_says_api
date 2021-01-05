const Tips = require('../models/Tips');
const db = require('../utils/intitFirebase').db;
const moment = require('moment');

const tipsNwDb = db.collection('tipsnw');
const tipsSwDb = db.collection('tipssw');

const { v4: uuidv4 } = require('uuid');

exports.addTipsFb = async(req, res) => {
    try {
        let user_id = req.body.user_id;
        let region = req.body.region;
        let tip_text = req.body.tip_text;
        let likes = [];
        let dislikes = [];
        let favIds = [];
        let date = moment().format();
        let id = uuidv4();
        let tip = { _id: id, user_id: user_id, region: region, tip_text: tip_text, favIds: favIds, likes: likes, dislikes: dislikes, CreatedAt: date };
        if (region == "North West") {
            await tipsNwDb.doc(id).set(tip);
            return res.send({ success: true, message: "Tips Created Successfully" });
        } else if (region == "South West") {
            await tipsSwDb.doc(id).set(tip)
            return res.send({ success: true, message: "Tips Created Successfully" });
        } else {
            return res.status(400).send({ success: false, message: "Error With Data" })
        }
    } catch (error) {
        console.log(error)
        res.status(501).send({ success: false, message: "There was an error with the request" })
    }
}

exports.likeTipFb = async(req, res) => {
    try {
        let user_id = req.body.user_id;
        let tip_id = req.body.tipid;
        let tip_region = req.body.region;
        let allLikes = [];
        let allDislike = [];

        if (tip_region == "North West") {
            let tip = await tipsNwDb.doc(tip_id).get();
            // console.log(tip.data())
            allLikes = tip.data().likes;
            allDislike = tip.data().dislikes;
            if (allLikes.indexOf(user_id) >= 0) {
                console.log("USER ALREADY LIKED")
                let index = allLikes.indexOf(user_id);
                allLikes.splice(index, 1);
                await tipsNwDb.doc(tip_id).update({ likes: allLikes })
                console.log("LIked removed")
                return res.send({ success: true, message: "Like Removed" })
            } else {
                if (allDislike.indexOf(user_id) >= 0) {

                    console.log("Remove User Dislike")
                    let index = allDislike.indexOf(user_id);
                    allDislike.splice(index, 1);
                }

                allLikes.push(user_id);
                tipsNwDb.doc(tip_id).update({ likes: allLikes, dislikes: allDislike })
                return res.status(200).send({ success: true, message: "Like Added Successfuly" })
            }
        } else if (tip_region == "South West") {
            console.log('South West Tip')
            let tip = await tipsSwDb.doc(tip_id).get();
            // console.log(tip.data())
            allLikes = tip.data().likes;
            allDislike = tip.data().dislikes;
            if (allLikes.indexOf(user_id) >= 0) {
                console.log("USER ALREADY LIKED")
                let index = allLikes.indexOf(user_id);
                allLikes.splice(index, 1);
                await tipsSwDb.doc(tip_id).update({ likes: allLikes });
                console.log("LIked removed")
                return res.send({ success: true, message: "Like Removed" })
            } else {
                if (allDislike.indexOf(user_id) >= 0) {

                    console.log("Remove User Dislike")
                    let index = allDislike.indexOf(user_id);
                    allDislike.splice(index, 1);
                }

                allLikes.push(user_id);
                tipsSwDb.doc(tip_id).update({ likes: allLikes, dislikes: allDislike })
                return res.status(200).send({ success: true, message: "Like Added Successfuly" })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(501).send({ success: false, message: "There was an error with request" });
    }
}


exports.dislikeTipFb = async(req, res) => {
    console.log(req.body)
    try {
        let user_id = req.body.user_id;
        let tip_id = req.body.tipid;
        let tip_region = req.body.region;
        let allLikes = [];
        let allDislike = [];

        if (tip_region == "North West") {
            console.log('North West Tip')
            let tip = await tipsNwDb.doc(tip_id).get();
            // console.log(tip.data())
            allLikes = tip.data().likes;
            allDislike = tip.data().dislikes;
            if (allDislike.indexOf(user_id) >= 0) {
                console.log("USER ALREADY LIKED")
                let index = allDislike.indexOf(user_id);
                allDislike.splice(index, 1);
                await tipsNwDb.doc(tip_id).update({ dislikes: allDislike })
                console.log("Dislike removed")
                return res.send({ success: true, message: "Dislike Removed" })
            } else {
                if (allLikes.indexOf(user_id) >= 0) {

                    console.log("Remove User Like")
                    let index = allLikes.indexOf(user_id);
                    allLikes.splice(index, 1);
                }

                allDislike.push(user_id);
                await tipsNwDb.doc(tip_id).update({ likes: allLikes, dislikes: allDislike })
                return res.status(200).send({ success: true, message: "Dislike Added Successfuly" })
            }
        } else if (tip_region == "South West") {
            console.log('North West Tip')
            let tip = await tipsSwDb.doc(tip_id).get();
            // console.log(tip.data())
            allLikes = tip.data().likes;
            allDislike = tip.data().dislikes;
            if (allDislike.indexOf(user_id) >= 0) {
                console.log("USER ALREADY LIKED")
                let index = allDislike.indexOf(user_id);
                allDislike.splice(index, 1);
                await tipsSwDb.doc(tip_id).update({ dislikes: allDislike })
                console.log("Dislike removed")
                return res.send({ success: true, message: "Dislike Removed" })
            } else {
                if (allLikes.indexOf(user_id) >= 0) {

                    console.log("Remove User Like")
                    let index = allLikes.indexOf(user_id);
                    allLikes.splice(index, 1);
                }

                allDislike.push(user_id);
                await tipsSwDb.doc(tip_id).update({ likes: allLikes, dislikes: allDislike })
                return res.status(200).send({ success: true, message: "Dislike Added Successfuly" })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(501).send({ success: false, message: "There was an error with request" });
    }
}

exports.addTipsFavFb = async(req,res) => {
    try {
        console.log(req.body)
        let userId = req.body.userId;
        let tipId = req.body.tipId;
        let region = req.body.region;

        if(region == "North West") {
            let tip = await tipsNwDb.doc(tipId).get();
            let tipFav = tip.data().favIds;
            if(tipFav.indexOf(userId) >= 0) {
                let index = tipFav.indexOf(userId);
                tipFav.splice(index,1);
                await tipsNwDb.doc(tipId).update({favIds: tipFav});
                return res.send({message: "Removed From Favorite"})
            }

            tipFav.push(userId);
            await tipsNwDb.doc(tipId).update({favIds: tipFav});
            console.log("Added Tip SUcc")
            return res.status(200).send({ success: true, message: "Favorite Tip Added" })
        } else if(region == "South West") {
            let tip = await tipsSwDb.doc(tipId).get();
            let tipFav = tip.data().favIds;
            if(tipFav.indexOf(userId) >= 0) {
                let index = tipFav.indexOf(userId);
                tipFav.splice(index,1);
                await tipsSwDb.doc(tipId).update({favIds: tipFav});
                
                return res.send({message: "Removed From Favorite"})
            }

            tipFav.push(userId);
            await tipsSwDb.doc(tipId).update({favIds: tipFav});
            console.log("Added Tip SUcc")
            return res.status(200).send({ success: true, message: "Favorite Tip Added" })
        }

    } catch (error) {
        console.log(error)
        return res.status(501).send({ success: false, message: "There was an error with request" });
    }
}