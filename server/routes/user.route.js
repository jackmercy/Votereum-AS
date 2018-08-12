import express from 'express';
import userController from '../controllers/user.controller';

var router = express.Router();

/* Route: [/user] */

router.route('/auth')
    .post(userController.postLogin);

export default router;