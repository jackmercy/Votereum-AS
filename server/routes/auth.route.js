import express        from 'express';
import userController from '../controllers/user.controller';

var router = express.Router();

/* Route: [/auth] */

router.route('/login')
    .post(userController.postLogin);

router.route('/register')
    .post(userController.postRegister);

router.route('/getUserInfo')
    .post(userController.postUserInfo);

router.route('/change-password')
    .post(userController.postChangePassword);

export default router;
