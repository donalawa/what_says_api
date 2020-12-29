const express = require('express');

const zoneRouter = express.Router();
const zoneController = require('../controllers/zoneController');
const verifyMidleWare = require('../midlewares/locationCheck');


//Bellow route is to get all danger zones in cameroon
zoneRouter.get('/danger/nw', zoneController.getAllNwDangerZones);

//Bellow route is to get all danger zones in cameroon
zoneRouter.get('/danger/sw', zoneController.getAllSwDangerZones);

//Bellow route is to get all the danger zones
zoneRouter.get('/danger', zoneController.getAllDangerZones);

//Bellow route is to add the danger count of a zone
zoneRouter.post('/danger', verifyMidleWare, zoneController.addDangerZoneCount);

//Bellow route is to add the safe count of a danger zone
zoneRouter.post('/safe', verifyMidleWare, zoneController.addSafeCount);

module.exports = zoneRouter;