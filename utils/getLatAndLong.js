var unirest = require('unirest');

module.exports = async (location_name) => {
    var api_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location_name}&key=AIzaSyBiV-focHAlD37H0P29BnokRcU3PnOa1xk`;
   return await unirest.get(api_url).headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }).send();

}


