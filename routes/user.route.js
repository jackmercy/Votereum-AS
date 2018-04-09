import express from 'express';
import userController from '../controllers/user.controller';

var router = express.Router();

router.route('/login')
    .post(userController.postLogin);

export default router;