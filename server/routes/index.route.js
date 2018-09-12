import express         from 'express';
import jwt             from 'jsonwebtoken';
import userRoutes      from './user.route';
import candidateRoutes from './candidate.route';
import contractRoutes  from './contract.route';
import citizenRoutes   from './citizen.route';
import ballotRoutes    from './ballot.route';
import bcAccountRoutes from './blockchain-account.route';
import eaRoutes from './election-admin.route';
// import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/* Base route: [/api] */

router.use('/user', userRoutes);

/** GET [/health-check]
 *  - Check service health */
router.get('/check', (req, res) =>
    res.send('Hello hooman!')
);

// route middleware to verify a token
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token =/*  req.body.token || req.query.token ||  */req.headers['x-access-token'];
    /* console.log(`[x] token is ${token}`); */
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {
                console.error(err);
                return res.json({ error: true, message: 'Failed to authenticate token.' });
            } else if(!ExpirationGuard(decoded)) {
                return res.status(400).json({ error: true, message: 'Token is expired' });
            } else {
                // if everything is good, save to request for use in other routes (e.g check user's role)
                req.token = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            error: true,
            message: 'No token provided.'
        });

    }
});
// End of route middleware to verify a token
router.use('/candidate', candidateRoutes);
router.use('/citizen', citizenRoutes);
router.use('/ballot', ballotRoutes);
router.use('/blockchainAccount', bcAccountRoutes);
router.use('/ea', eaRoutes);
router.get('/checkToken', (req, res) => {
        var callback = function() { console.log('[x] ETA work') };
        StartRegPhase("election", callback);
        res.send('Hello hooman! with token');
    }  
);
export default router;
