const Tips = require('../models/Tips');

exports.getAllTips = async (req, res) => {
    
    try {
        let tips =  await Tips.find({});
        return res.status(200).send(tips);
    } catch (error) {
        return res.status(501).send({success: false, message: "There was an error with request"});
    }

}


exports.addTips = async(req, res) => {
    try {
        
        let exist = await Tips.findOne({tip_text: req.body.tip_text, region: req.body.region});
        if(exist) {
            return res.status(200).send({success: false,message: "Tip already exist"})
        }
        req.body.likes = [];
        req.body.dislikes = [];
        await Tips.create(req.body);
        return res.send({success: true, message: "Tips Created Successfully"});
    } catch (error) {
        return res.status(501).send({success: false, message: "There was an error with the request"});
    }
}

exports.getAllNwTips = async (req,res) => {

    try {
        let nwTips = await Tips.find({Region: "North West"});
        return res.status(200).send(nwTips)
    } catch (error) {
        return res.status(501).send({success: false, message: "There was an error with the request"})
    }
}

exports.getAllSwTips = async (req,res) => {

    try {
        let swTips = await Tips.find({region: "South West"});
        return res.status(200).send(swTips)
    } catch (error) {
        return res.status(501).send({success: false, message: "There was an error with the request"})
    }
}

exports.likeTip = async (req,res) => {    
    console.log('like Tip Body Bellow');
    console.log(req.body)
    try {
    
        let user_id = req.body.user_id;
        let tip_id = req.body.tipid;

        let tip = await Tips.findOne({_id: tip_id});
        if(tip.likes.indexOf(user_id) >= 0) {
            let index = tip.likes.indexOf(user_id);
            tip.likes.splice(index,1);
            await tip.save();
            return res.send({success: true, message: "Like Removed"})
        }else {
            if(tip.dislikes.indexOf(userid) >= 0) {
                let index = tip.dislikes.indexOf(user_id);
                tip.dislikes.splice(index,1);
            }
            tip.likes.push(user_id);
            let total_like = tip.likes.length;
            await tip.save();
            return res.status(200).send({success: true, message: "Like Added Successfuly", likes: total_like})
        }
    } catch (error) {
        console.log(error)
        return res.status(501).send({success: false, message: "There was an error with request"});
    }
}

exports.dislikeTip = async (req,res) => {
    console.log('Dislike Tip Body Bellow');
    console.log(req.body)
    try {
        let user_id = req.body.user_id;
        let tip_id = req.body.tipid;
        let tip = await Tips.findOne({_id: tip_id});
        if(tip.dislikes.indexOf(user_id) >= 0) {
            let index = tip.dislikes.indexOf(user_id);
            tip.dislikes.splice(index,1);
            await tip.save();
            return res.send({success: true, message: "Dislike Removed"});
        }else {

            if(tip.likes.indexOf(user_id) >= 0) {
                let index = tip.likes.indexOf(user_id);
                tip.likes.splice(index,1);
            }
            tip.dislikes.push(user_id);
            let total_dislike = tip.dislikes.length;
            await tip.save();
            return res.send({success: true, message: "Dislike Added", total: total_dislike});
        }
    } catch (error) {
        console.log(error)
        return res.status(501).send({success: false, message: "There was an error with the request"});
    }
}