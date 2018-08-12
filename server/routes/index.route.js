import express from 'express';
import jwt from 'jsonwebtoken';
import userRoutes from './user.route';
import candidateRoutes from './candidate.route';
import contractRoutes from './contract.route';
import citizenRoutes from './citizen.route';
// import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/* Base route: [/api] */

/** GET [/health-check]
*  - Check service health */
router.get('/check', (req, res) =>
  res.send('Hello hooman!')
);

router.use('/user', userRoutes);

// route middleware to verify a token
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
              // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

    }
});
// End of route middleware to verify a token
router.use('/candidate', candidateRoutes);
router.use('/contract', contractRoutes);
router.use('/citizen', citizenRoutes);

export default router;
