var unirest = require('unirest');
require('dotenv');

module.exports = async (location_name) => {
    var api_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location_name}&key=${process.env.API_KEY}`;
   return await unirest.get(api_url).headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }).send();

}


