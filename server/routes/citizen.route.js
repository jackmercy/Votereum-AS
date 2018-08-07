import express from 'express';
import citizenController from '../controllers/citizen.controller';

var router = express.Router();

/* Route: [/api/citizen] */

router.route('/').get(citizenController.check);
router.route('/').post(citizenController.postCitizenById);
router.route('/generatePassword').post(citizenController.postGeneratePassword);

export default router;