const Tips = require('../models/Tips');

exports.getAllTips = async (req, res) => {
    
    try {
        let tips =  await Tips.find({});
        return res.status(200).send({success: true, message: "All Tips", data: tips});
    } catch (error) {
        return res.send({success: false, message: "There was an error with request"});
    }

}


exports.addTips = async(req, res) => {
    try {
        req.body.likes = [];
        req.body.dislikes = [];
        let exist = await Tips.findOne({tip_text: req.body.tip_text});
        if(exist) {
            return res.status(200).send({success: false,message: "Tip already exist"})
        }
        await Tips.create(req.body);
        return res.send({success: true, message: "Tips Created Successfully"});
    } catch (error) {
        return res.send({success: false, message: "There was an error with the request"});
    }
}

exports.getAllNwTips = async (req,res) => {

    try {
        let nwTips = await Tips.find({Region: "North West"});
        return res.status(200).send({success: true, message: "North West Tips", data: nwTips})
    } catch (error) {
        return res.send({success: false, message: "There was an error with the request"})
    }
}

exports.getAllSwTips = async (req,res) => {

    try {
        let nwTips = await Tips.find({region: "South West"});
        return res.status(200).send({success: true, message: "South West Tips", data: nwTips})
    } catch (error) {
        return res.send({success: false, message: "There was an error with the request"})
    }
}

exports.likeTip = async (req,res) => {    

    try {
    
        let user_id = req.body.user_id;
        let tip_id = req.params.tipId;

        let tip = await Tips.findOne({_id: tip_id});
        if(tip.likes.indexOf(user_id) >= 0) {
            return res.send({success: false, message: "User Has Already Liked This Tip"})
        }else {
            tip.likes.push(user_id);
            let total_like = tip.likes.length;
            await tip.save();
            return res.status(200).send({success: true, message: "Like Added Successfuly", likes: total_like})
        }
    } catch (error) {
        return res.status(500).send({success: false, message: "There was an error with request"});
    }
}

exports.dislikeTip = async (req,res) => {
    try {
        let user_id = req.body.user_id;
        let tip_id = req.params.tipId;
        let tip = await Tips.findOne({_id: tip_id});
        if(tip.dislikes.indexOf(user_id) >= 0) {
            return res.send({success: false, message: "User Has Already Disliked This Tip"});
        }else {
            tip.dislikes.push(user_id);
            let total_dislike = tip.dislikes.length;
            await tip.save();
            return res.send({success: true, message: "Dislike Added", total: total_dislike});
        }
    } catch (error) {
        return res.send({success: false, message: "There was an error with the request"});
    }
}