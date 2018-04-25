var user = require('../models/user');

exports.verify = function(req,res) {
    let name = req.body.username;
    let pass = req.body.password;
    let bool = false;
    for(let i in user) {
        console.log(user[i].password + ' ' + user[i].username);
        if(name == user[i].username && pass == user[i].password) {
            user[i].connected = true;
            bool = true;
            res.status(200).json({reponse : '200', message : 'connected', user : user[i].username});
        }
    }
    if (bool !== true) {
        res.status(401).json({reponse : '401', message : 'Wrong log'});
    }
    bool = false;
}

exports.connected = function(req,res) {
    let username = req.params.username;
    let bool = false;
    for(let i in user) {
        if(user[i].username == username) {
            bool = true;
            res.status(200).send(user[i].connected);
        }
    }
    if(bool === false) {
        res.send('false');
    }
    bool = false;
}

exports.new_user = function(req,res) {
    let list = {
        username : req.body.username,
        password : req.body.password,
        connected : false
    }
    user.push(list);
    if(req.body.username && req.body.password) {
        res.status(200).json({reponse : '200', message : 'user created'})
    } else if(req.body.username && !req.body.password) {
        res.status(400).json({reponse : '400', message : 'Entrez un mot de passe'});
    } else if(!req.body.username && req.body.password) {
        res.status(400).json({reponse : '400', message : 'Entrez un nom utilisateur'});
    } else {
        res.status(400).json({reponse : '400', message : 'Entrez un username et un password'});
    }
}