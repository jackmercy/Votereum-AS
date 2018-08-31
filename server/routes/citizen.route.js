import express           from 'express';
import citizenController from '../controllers/citizen.controller';

var router = express.Router();

/* Route: [/api/citizen] */

router.route('/').get(citizenController.check);
router.route('/').post(citizenController.postCitizenById);
router.route('/postGenerateNewPassword').post(citizenController.postGenerateNewPassword);
router.route('/getUserHash').post(citizenController.postGetCitizenHash);
router.route('/generateUserAccount').post(citizenController.postGenerateUserAccount);
export default router;