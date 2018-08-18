import User   from '../models/user.model';
import jwt    from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/* const variable */
const saltRounds = 10;

/* POTS: [/auth] */
/* req JSON {
    "citizenId": "0432",
    "password": "123456"
} */
function postLogin(req, res) {
    const _user = new User(req.body);

    if(!req.body.password) {
        res.status(400);
        res.send('Password is required');
    } else if(!req.body.citizenId) {
        res.status(400);
        res.send('Citizen ID is required');
    }

    // handle login request in mongodb - should move those lines into model method
    // see documentation at : http://mongoosejs.com/docs/guide.html
    User.findOne({citizenId: req.body.citizenId}, function(err, user) {
        if(err) {
            console.log('ERR');
        } else if(user) {

            bcrypt.compare(req.body.password, user.hashPassword, function(err, _result) {
                if (err) throw (err);
                // result == true
                if (_result) {
                    const payload = {
                        name: user.name,
                        citizenId: user.citizenId,
                        role: user.role,
                        isVote: user.isVote,
                    }
        
                    var token = jwt.sign(payload, app.get('jwtSecret'), {
                        expiresIn: 3600 // expires in 1 hour
                    });
        
                    res.status(200);
                    res.json({token: token});
                } else {
                    res.json({
                        message: 'Invalid username or password'
                    });
                }
            });

        } else {

            res.json({
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
                if(err) throw (err);
                // Store hash in your password DB.
                newUser.hashPassword = _hash;
                newUser.role = 'citizen';
                newUser.hash = '0x';
                newUser.isVote = false;
                newUser.save();
            });
            
            res.status(201);
            res.json({message: 'success'});
        }
    });

}


 
export default {
    postLogin,
    postRegister
}

