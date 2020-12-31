const express = require('express');

const zoneRouter = express.Router();
const zoneController = require('../controllers/zoneController');
const verifyMidleWare = require('../midlewares/locationCheck');


//Bellow route is to add the danger count of a zone
zoneRouter.post('/danger',verifyMidleWare, zoneController.addDangerZoneCountFb);

//Bellow route is to add the safe count of a danger zone
zoneRouter.post('/safe',verifyMidleWare, zoneController.addSafeCountFb);

module.exports = zoneRouter;