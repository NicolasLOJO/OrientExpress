var express = require('express');
var menu = require('../models/menu');
var carte = require('../models/cartes');
var index = 0;

exports.menu_index = function(req,res) {
    res.json({message : 'badway'});
};

exports.menu_get = function(req,res) {
    let id = req.params.id;
    for(let i in carte) {
        if(carte[i].id == id) {
            res.status(200).send(carte[i].menus);
        }
    }
};

exports.menu_add = function(req,res) {
    let id = req.params.id;
    let bool = false;
    for(let i in carte) {
        if (carte[i].id == id) {
            var list = {
                id : index++,
                nom : req.body.nom,
                entree : {
                    nom : req.body.entree,
                    prix : req.body.prix1
                },
                plat : {
                    nom : req.body.plat,
                    prix : req.body.prix2
                },
                dessert : {
                    nom : req.body.dessert,
                    prix : req.body.prix3
                }
            }
            carte[i].menus.push(list);
            bool = true;
        }
    }
    if (bool === true) {
        res.status(200).json({nom : list.nom, menu: list.id});
        bool = false;
    } else {
        res.status(400).json({reponse: '400', message: 'Perdu'});
    }
};

exports.menu_delete = function(req,res) {
    let id = req.params.id;
    let bool = false;
    for(let i in carte) {
        if(id == carte[i].id) {
            carte[i].menus.splice(0, carte[i].menus.length);
            res.status(200).json({reponse : 'ok', message: 'menu removed'});
            bool = true;
        }
    }
    if (bool !== true) {
        res.status(400).json({reponse : '400', message : 'WrongID'});
    }
    bool = false;
};

exports.menu_get_id = function(req,res) {
    let id = req.params.id;
    let bool = false;
    for(let i in carte) {
        for(let k in carte[i].menus) {
            if(id == carte[i].menus[k].id) {
                res.status(200).send(carte[i].menus[k]);
                bool = true;
            }
        }
    }
    if (bool !== true) {
        res.status(400).json({reponse : '400', message : 'WrongID'});
    }
};

exports.menu_remove_id = function(req,res) {
    let id = req.params.id;
    let bool = false;
    for(let i in carte) {
        for(let k in carte[i].menus) {
            if(id == carte[i].menus[k].id) {
                carte[i].menus.splice(k, 1);
                res.status(200).json({reponse : 'ok', message : 'menu removed'});
                bool = true;
            }
        }
    }
    if(bool !== true) {
        res.status(400).json({reponse : '400', message : 'Wrongway'});
    }
    bool = false;
};

exports.menu_update_id = function(req,res) {
    let id = req.params.id;
    let bool = false;
    for(let i in carte) {
        for(let k in carte[i].menus) {
            if(id == carte[i].menus[k].id) {
                carte[i].menus[k].nom = req.body.name;
                carte[i].menus[k].entree.nom = req.body.entree;
                carte[i].menus[k].plat.nom = req.body.plat;
                carte[i].menus[k].dessert.nom = req.body.dessert;
                carte[i].menus[k].entree.prix1 = req.body.prix1
                carte[i].menus[k].plat.prix2 = req.body.prix2
                carte[i].menus[k].dessert.prix3 = req.body.prix3
                bool = true;
            }
        }
    }
    if (bool=true) {
        res.status(200).json({reponse : '200', message : 'Menu modified'});
        bool = false;
    } else {
        res.status(400).json({reponse : '400', message : 'Badway'});
    }
    
};