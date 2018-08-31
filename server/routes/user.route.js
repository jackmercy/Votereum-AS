import express        from 'express';
import userController from '../controllers/user.controller';

var router = express.Router();

/* Route: [/user] */

router.route('/auth')
    .post(userController.postLogin);

router.route('/register')
    .post(userController.postRegister);

router.route('/chainAccount')
    .post(userController.postChainAccount);

export default router;
