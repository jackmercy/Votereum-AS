var User = require('../models/user.model');

var postLogin = function(req, res) {
    var user = new User(req.body);

    if(!req.body.name) {
        res.status(400);
        res.send('Name is required');
    } else if(!req.body.id) {
        res.status(400);
        res.send('ID is required');
    }

    // handle login request in mongodb - should move those lines into model method
    // see documentation at : http://mongoosejs.com/docs/guide.html
    User.findOne({name: user.name, id: user.id}, function(err, user) {
        if(err) {
            console.log('ERR');
        } else if(user) {
            res.status(200);
            const res_user = {
                name: user.name,
                id: user.id,
                role: user.role
            }
            res.json(res_user);
        } else {
            const message = {
                message: 'No user is found'
            }
            res.json(message);
        }
    });

}

module.exports = {
    postLogin
}