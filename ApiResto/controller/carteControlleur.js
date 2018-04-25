var express = require('express');
var menu = require('../models/menu');
var carte = require('../models/cartes');
var index = 0;

exports.carte_index = function(req,res) {
    res.json({message : 'badway'});
};

exports.carte_get = function(req,res) {
    if(carte.length === 0) {
        res.status(200).json({message : 'Pas de carte'});
    } else {
        res.send(carte);
    }
};

exports.carte_details = function(req,res) {
    let id = req.params.id;
    let bool = false;
    for(let i in carte) {
        if(carte[i].id == id) {
            bool = true;
            res.status(200).send(carte[i]);
        }
    }
    if(bool === false) {
        res.status(400).json({ reponse : '400', message : 'Not a good URL'});
    }
    bool = false;
};

exports.carte_create_post = function(req,res) {
    if(req.body.name) {
        var list = {
            id : index++,
            nom : req.body.name,
            menus : []
        };
        carte.push(list);
        res.status(200).send(carte);
    } else {
        res.status(400).json({reponse: 'Bad Way', message: 'Ecrit un mot connard'});
    }
}

exports.carte_delete = function(req,res) {
    let id = req.params.id;
    for (let i in carte) {
        if(carte[i].id == id) {
            carte.splice(i, 1);
        }
    }
    res.send(carte);
};