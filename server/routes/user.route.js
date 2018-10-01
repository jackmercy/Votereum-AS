import express        from 'express';
import userController from '../controllers/user.controller';

var router = express.Router();

/* Route: [/user] */
router.route('/getUserInfo')
    .post(userController.postUserInfo);

router.route('/change-password')
    .post(userController.postChangePassword);

export default router;
