import Citizen           from '../models/citizen.model';
import User              from '../models/user.model';
import PasswordGenerator from 'generate-password';
import Crypto            from 'crypto';


/*
Route: /api/citizen/check
Method: GET
*/
function check(req, res) {
    res.send('successfully connect to /citizen route');
}


/*
Route: /api/citizen
Method: POST
{
    Id_number: '2222'
}
*/
function postCitizenById(req, res) {
    const _id = req.body['Id_number'];

    if (_id) {
        Citizen.findOne({Id_number: _id}, function (err, citizen) {
            if(err) {
                console.log('ERR');
            } else if(citizen) {
                res.status(200);
                res.json(citizen);
            } else {
                res.status(404);
                const message = {
                    message: 'Invalid citizen ID!'
                }
                res.json(message);
            }
        });
    }
}



function getGeneratedPassword() {
    return PasswordGenerator.generate({
        length: 10,
        numbers: true
    })
}

function isExist(_id) {
    return Citizen.findOne({ id: _id }, function (err, citizen) {
            return true
    });

}

/*
Route: /api/citizen/generatePassword
Method: POST
{
    Id_number: '2222'
}
*/
async function postGeneratePassword(req, res) {
    const _id = req.body['Id_number'];
    const _defaultPassword = getGeneratedPassword();
    const query = { Id_number: _id };
    const updateValues = {
        $set:
            { defaultPassword: Crypto.createHash('md5').update(_defaultPassword).digest('hex') }
    };

    if (_id) {
        Citizen.updateOne(
            query,
            updateValues,
            { overwrite: true, upsert: false },
            function (err, rawResponse) {});
    }

    res.json({ password: _defaultPassword });
}

/* POST: [/getUserHash] 
    req JSON {
        "citizen_id": "0432"
        JWT token in ver 2.0
    }
*/
function postGetCitizenHash(req, res) {
    User.findOne({id: req.body.citizenID}, function(err, _user) {
        if(err) {
            console.log('ERR');
        } else if(_user) {
            const message = {
                hash: _user.hash,
                isVote: _user.isVote
            }
            res.json(message);
        } else {
            const message = {
                message: 'Invalid citizen ID'
            }
            res.json(message);
        }
    });
}

export default {
    check,
    postCitizenById,
    postGeneratePassword,
    postGetCitizenHash
}