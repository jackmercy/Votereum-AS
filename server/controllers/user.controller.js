import User   from '../models/user.model';
import jwt    from 'jsonwebtoken';
import bcrypt from 'bcrypt';


/* const variable */
const saltRounds = 10;

/* POTS: [/auth] */
/* req JSON {
    "citizenId": "0432",
    "password": "123456"
}
- Response: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuSWQiOiIyMzIxIiwicm9sZSI6ImNpdGl6ZW4iLCJpc1ZvdGUiOmZhbHNlLCJpc0ZpcnN0VGltZUxvZ0luIjpmYWxzZSwiaGFzQmxvY2tjaGFpbkFjY291bnQiOmZhbHNlLCJpYXQiOjE1MzgzNjc1NzcsImV4cCI6MTUzODM3MTE3N30.2TMiGxGajwRT4yhJlRSf8PJAvAgZ3LbEnjAPeqP7-JU"
}

*/
function postLogin(req, res) {
    console.log(req.body.citizenId + req.body.password);

    if(!req.body.password) {
        res.status(400);
        return res.send('Password is required');
    } else if(!req.body.citizenId) {
        res.status(400);
        return res.send('Citizen ID is required');
    }

    // handle login request in mongodb - should move those lines into model method
    // see documentation at : http://mongoosejs.com/docs/guide.html
    User.findOne({citizenId: req.body.citizenId}, function(err, user) {
        if(err) {
            console.log('ERR');
        } else if(user) {

            bcrypt.compare(req.body.password, user.hashPassword, function(err, _result) {
                if (err) {
                    res.status(500).json({
                        error: true,
                        message: 'Internal server error'
                    });
                } else if (_result) {
                    // result == true
                    const payload = {
                        name: user.name, /* Username should get from citizen */
                        citizenId: user.citizenId,
                        role: user.role,
                        isVote: user.isVote,
                        isFirstTimeLogIn:  user.isFirstTimeLogIn,
                        hasBlockchainAccount: user.hasBlockchainAccount
                    }

                    var token = jwt.sign(payload, app.get('jwtSecret'), {
                        expiresIn: 3600 // expires in 1 hour
                    });

                    res.status(200);
                    return res.json({token: token});
                } else {
                    res.status(400);
                    return res.json({
                        error: true,
                        message: 'Invalid username or password'
                    });
                }
            });

        } else {
            res.status(400);
            return res.json({
                error: true,
                message: 'Invalid username or password'
            });
        }
    });

}


/* POTS: [/register] */
/* req JSON {
    "name": "JK Lo",
    "citizenId": "0432",
    "password": "123456"
} */
function postRegister(req, res) {
    const newUser = new User(req.body);

    if(!req.body.password) {
        res.status(400);
        res.send('Password is required');
    } else if(!req.body.citizenId) {
        res.status(400);
        res.send('Citizen ID is required');
    } else if(!req.body.name) {
        res.status(400);
        res.send('Name is required');
    }

    User.find({id: req.body.citizenId}, function(err, user) {
        if (err || user.length > 0) {
            const message = {
                message: 'Duplicate citizen ID'
            }
            res.json(message);
        } else if(user.length === 0) {
            bcrypt.hash(req.body.password, saltRounds, function(err, _hash) {
                if(err) {
                    throw (err);
                } else {
                    // Store hash in your password DB.
                    newUser.hashPassword = _hash;
                    newUser.role = 'citizen';
                    newUser.hash = '0x';
                    newUser.isVote = false;
                    newUser.isFirstTimeLogIn = false;
                    newUser.hasBlockchainAccount = false;
                    newUser.save();
                }
            });

            res.status(201);
            res.json({message: 'success'});
        }
    });

}

/* POTS: [/getUserInfo] */
/* req JSON {
    "citizenId": "0432"
} */
function postUserInfo(req, res) {
    const _user = new User(req.body);

    if(!req.body.citizenId) {
        res.status(400);
        return res.json({error: true, message: 'Citizen ID is required'});
    } else if (!CitizenGuard(req.token)) {
        res.json({error: true, message: 'Citizen ID is required'});
    } else if (!CitizenGuard(req.token) && !RaGuard(req.token)) {
        res.status(403);
        return res.json({error: true, message: 'You do not have permission to access this API'});
    }

    // handle login request in mongodb - should move those lines into model method
    // see documentation at : http://mongoosejs.com/docs/guide.html
    User.findOne({citizenId: req.body.citizenId}, function(err, user) {
        if(err) {
            console.log('ERR');
        } else if(user) {
            const payload = {
                name: user.name,
                citizenId: user.citizenId,
                role: user.role,
                isVote: user.isVote,
                isFirstTimeLogIn:  user.isFirstTimeLogIn,
                hasBlockchainAccount: user.hasBlockchainAccount
            };

            res.status(200);
            return res.json({data: payload});
        } else {
            res.status(400);
            return res.json({
                message: 'Invalid username or password'
            });
        }
    });
}

export default {
    postLogin,
    postRegister,
    postUserInfo
}

