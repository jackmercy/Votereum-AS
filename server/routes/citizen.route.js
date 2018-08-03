import express from 'express';
import citizenController from '../controllers/citizen.controller';

var router = express.Router();

/* Route: [/api/citizen] */

router.route('/check').get(citizenController.check);

export default router;