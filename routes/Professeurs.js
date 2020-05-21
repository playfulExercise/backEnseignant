const express = require("express");
const professeurs = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Professeurs = require("../models/Professeurs");

professeurs.use(cors());

process.env.SECRET_KEY = 'secret';

professeurs.post('/elevesList', (req, res) => {
    
    const professeurData = {
        nom_eleve: req.body.nom_eleve,
        prenom_eleve: req.body.prenom_eleve,
        code_eleve: req.body.code_eleve,
        id_prof: req.body._id,
        infos: req.body.infos,
    }
    Professeurs.findOneAndUpdate (
        { _id : req.body._id},
        {$push :
            { eleves: professeurData }}
    ).then(added => {
        if(added){
            res.send({success: "eleve added success"});
        }
    }).catch(err => {
        res.send({error: "eleve added : err"})
    });
})


professeurs.post('/eleves/delete', (req, res) => {
    const professeurData = {
        _id: req.body._id,
        listElevesDelete: req.body.listElevesDelete,
    }
    Professeurs.findByIdAndUpdate(
        {_id : professeurData._id},
        { $pull: { 'eleves': {  _id: professeurData.listElevesDelete } } }
        ).then(response => {
            res.json({success: "eleve(s) delete - success !"});
        })
        .catch(err => {
            res.send({error: "eleve(s) delete - error ! "})
        });
})


professeurs.post('/monde/setInfos', (req, res) => {
    const userData = {
        _id: req.body._id,
        infos: req.body.infos,
    }
    Professeurs.updateMany(
        { "_id" : userData._id, "eleves":{"$exists":true, "$ne":[], "$not":{"$size":1}}}, 
        { "$set": {
        'eleves.$[].infos':  userData.infos
        }}, {multi : true}).then(upd => {
            if(upd){
                res.send({success: "eleves update all success"});
            }
        }).catch(err => {
            res.send({error: "eleves update all error"})
        });
})
professeurs.post('/eleveSpecifique', (req, res) => {
    Professeurs.findOne (
        {_id : req.body._id,}
    ).then(user => {
        if(user) {
            user.eleves.map(eleves => {
                if(eleves._id == req.body.eleves_id){
                    res.send(eleves);
                }
            })
        }
    })
})

/*
professeurs.post('/creations', (req, res) => {
    User.findOne (
        {emailArtisan : req.body.emailArtisan,}
    ).then(user => {
        if(user){
            res.send(user.creations);
        }
    })
})

professeurs.post('/creationDelete', (req, res) => {

    Professeurs.findByIdAndUpdate(
    {_id : req.body.userId},
       { $pull: { 'creations': {  _id: req.body._id } } }
    ).then(response => {

        res.json({success: "creation delete"});
    })
    .catch(err => {
        res.send({error: "creation delete - error ! "})
    });
})
*/
professeurs.post('/register', (req, res) => {
    console.log("Professeur enregistre");
    const today = new Date();
    const professeurData = {
        prenom_prof: req.body.prenom_prof,
        nom_prof: req.body.nom_prof,
        email_prof: req.body.email_prof,
        password: req.body.password,
        created: today,
        departement: req.body.departement,
        etablissement: req.body.etablissement,
        eleves: req.body.eleves,
        questions: req.body.questions
    }
    Professeurs.findOne({
        email_prof: req.body.email_prof
    })
    .then(professeur => {
        if (!professeur) {
            bcrypt.hash(
                req.body.password,
                10,
                (err, hash) => {
                    professeurData.password = hash;
                    Professeurs.create(professeurData)
                    .then(professeur => {
                        res.json({
                            status: professeur.email_prof + 'enregistrement ok!'
                        })
                    })
                    .catch(err => {
                        res.send('error: ' + err);
                    })
            })
        } else {
            res.json({error: 'Professeur already exists'})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

professeurs.post('/login', (req, res) => {
    Professeurs.findOne({
        email_prof: req.body.email_prof
    })
    .then(professeur => {
        if (professeur) {
            if (bcrypt.compareSync(req.body.password, professeur.password)) {
                const payload = {
                    _id: professeur._id,
                    prenom_prof: professeur.prenom_prof,
                    nom_prof: professeur.nom_prof,
                    email_prof: professeur.email_prof
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token);
            } else {
                res.json({error: "Professeur does not exist"});
            }
        } else {
            res.json({error: "Professeur does not exist"});
        }
    })
    .catch(err => {
        res.send("error: " + err)
    })
})

professeurs.get('/profile', (req, res) => {
    var decoded = jwt.verify(
        req.headers['authorization'],
        process. env.SECRET_KEY
    )

    Professeurs.findOne({
        _id: decoded._id
    })
    .then(professeur => {
        if (professeur) {
            res.json(professeur);
        } else {
            res.send("Professeur does not exist");
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})

professeurs.post('/eleves/all', (req, res) => {
    Professeurs.findOne (
        {_id : req.body._id,}
    ).then(user => {
        if(user){
            res.send(user.eleves);
        }
    })
})

professeurs.post('/monde', (req, res) => {
    Professeurs.findOne (
        {_id : req.body._id,}
    ).then(user => {
        if(user){
            res.send(user.configuration_monde);
        }
    })
})

professeurs.post('/monde/set', (req, res) => {
    const User = {
        _id: req.body._id,
        configuration_monde: req.body.configuration_monde,
    }
    Professeurs.updateOne(
        { "_id" : User._id }, 
        { "$set": {
        'configuration_monde':  User.configuration_monde
    }}).then(upd => {
        if(upd){
            res.send({success: "configuration_monde update : ok"});
        }
    }).catch(err => {
        res.send({error: "configuration_monde update : err"})
    });
})


module.exports = professeurs