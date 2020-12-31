var unirest = require('unirest');
require('dotenv');

let lat = 4.23088689976473;
let long = 9.19669293259536;
let lat2 = 4.428760992935495
let long2 =  8.93164778843946;
let lat3 = 5.952820252057717;
let long3 = 10.161120742850493;
let lat4 = 5.974470770135275;
let long4 = 10.089033022041646;
let fa1 = 4.078023625036354;
let fa2 =  9.64635861516722;

let firstValid = new RegExp("Southwest",'i');
let secondValid = new RegExp("Nord-Ouest",'i');
let thirdValid =  new RegExp("Nord Ouest",'i');
let fourthValid = new RegExp("North West",'i');
let fithValid = new RegExp("Northwest",'i');
let sixthValid = new RegExp("Sud-Ouest",'i');
let seventhValid = new RegExp("Sud Ouest",'i');
let eightValid = new RegExp("South-West",'i');
let ninethValid = new RegExp("South West",'i');
let lastValid = new RegExp("North-West",'i');

module.exports = (req, res, next) => {
    //LATITUDE AND LONGITUDE MUST BE PASS IN HEADERS
    // let lat = req.headers['lat'];
    // let long = req.headers['long'];
    console.log('User Body Bellow')
    let userlat = req.body.userlat;
    let userlong = req.body.userlong;

    if(! req.body.userlat) {
        return res.status(500).send({message: "Please make sure you pass the required parameters"})
    }

    if(!req.body.userlong) {
        return res.status(500).send({message: "Please make sure you pass the required parameters"})
    }

    
    let api_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.API_KEY}`;

    unirest.get(api_url).headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }).send().then((response) => {
        let info = response.body.results[0].address_components.length - 2;
        if(firstValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("South West")
            return next();
        }

        if(sixthValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("South West");
            return next();
        }

        if(seventhValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("South West");
            return next();
        }

        if(eightValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("South West");
            return next();
        }

        if(ninethValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("South West");
            return next();
        }

        if(secondValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("North West");
            return next();
        }

        if(thirdValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("Noth West");
            return next();
        }

        if(fourthValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("North West");
            return next();
        }

        if(fithValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("North West");
            return next();
        }

        if(lastValid.test(response.body.results[0].address_components[info].short_name)) {
            console.log("North West");
            return next();
        }
        // console.log(response.body.results[0].address_components[info]);
        res.status(401).send({message: "You are not in the right region to make this operation"})
    }).catch(err => {
        res.send("There was an error with the request")
    })
}
