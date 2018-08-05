import Citizen from '../models/citizen.model';

function check(req, res) {
    res.send('successfully connect to /citizen route');
}


/*
Route: /api/citizen
Method: POST
{
    id: '2222'
}
*/
function postCitizenById(req, res) {
    const _id = req.body['id'];

    if (_id) {
        Citizen.findOne({id: _id}, function (err, citizen) {
            if(err) {
                console.log('ERR');
            } else if(citizen) {
                res.status(200);
                res.json(citizen);
            } else {
                const message = {
                    message: 'Invalid citizen ID!'
                }
                res.json(message);
            }
        })

    }
}

export default {
    check,
    postCitizenById
}