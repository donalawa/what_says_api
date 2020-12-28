const admin = require('firebase-admin');
var serviceAccount = require(".././what-says-firebase-adminsdk-npy50-18d3ae756b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

module.exports.db = db;