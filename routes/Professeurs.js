const express = require("express");
const professeurs = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Professeurs = require("../models/Professeurs");

professeurs.use(cors());

process.env.SECRET_KEY = 'secret';

/*professeurs.post('/creationsList', (req, res) => {
    
    const userData = {
        nomProduit: req.body.nomProduit,
        descriptionProduit: req.body.descriptionProduit,
        gainEnvironnement: req.body.gainEnvironnement,
        categorieProduit: req.body.categorieProduit,
        styleProduit: req.body.styleProduit,
        materiauProduit: req.body.materiauProduit,
        couleurProduit: req.body.couleurProduit,
        anneeConceptionProduit: req.body.anneeConceptionProduit,
        hauteurProduit: req.body.hauteurProduit,
        poidsProduit: req.body.poidsProduit,
        largeurProduit: req.body.largeurProduit,
        longueurProduit: req.body.longueurProduit,
        prixTTCProduit: req.body.prixTTCProduit,
        prixLivraisonProduit: req.body.prixLivraisonProduit,
        retraitAtelierProduit: req.body.retraitAtelierProduit,
        lieuFabricationProduit: req.body.lieuFabricationProduit,
        stock: req.body.stock
    }
    User.findOneAndUpdate (
        { _id : req.body._id},
        {$push :
            { creations: userData }}
    ).then(added => {
        if(added){
            res.send({success: "creation update success"});
        }
    }).catch(err => {
        res.send({error: "creation added : err"})
    });
})

professeurs.post('/creations', (req, res) => {
    User.findOne (
        {emailArtisan : req.body.emailArtisan,}
    ).then(user => {
        if(user){
            res.send(user.creations);
        }
    })
})

professeurs.post('/creationSpecifique', (req, res) => {
    User.findOne (
        {emailArtisan : req.body.emailArtisan,}
    ).then(user => {
        if(user) {
            user.creations.map(crea => {
                if(crea._id == req.body.creationId){
                    res.send(crea);
                }
            })
        }
    })
})

professeurs.post('/creationDelete', (req, res) => {

    User.findByIdAndUpdate(
    {_id : req.body.userId},
       { $pull: { 'creations': {  _id: req.body._id } } }
    ).then(response => {

        res.json({success: "creation delete"});
    })
    .catch(err => {
        res.send({error: "creation delete - error ! "})
    });
})

professeurs.post('/creationsUpdate', (req, res) => {
    const userData = {
        nomProduit: req.body.nomProduit,
        descriptionProduit: req.body.descriptionProduit,
        gainEnvironnement: req.body.gainEnvironnement,
        categorieProduit: req.body.categorieProduit,
        styleProduit: req.body.styleProduit,
        materiauProduit: req.body.materiauProduit,
        couleurProduit: req.body.couleurProduit,
        anneeConceptionProduit: req.body.anneeConceptionProduit,
        hauteurProduit: req.body.hauteurProduit,
        poidsProduit: req.body.poidsProduit,
        largeurProduit: req.body.largeurProduit,
        longueurProduit: req.body.longueurProduit,
        prixTTCProduit: req.body.prixTTCProduit,
        prixLivraisonProduit: req.body.prixLivraisonProduit,
        retraitAtelierProduit: req.body.retraitAtelierProduit,
        lieuFabricationProduit: req.body.lieuFabricationProduit,
        stock: req.body.stock,

        _id: req.body._id,
        creationId: req.body.creationId
    }
    User.update(
        { "_id" : userData._id, "creations._id": userData.creationId }, 
        { "$set": {
        'creations.$.nomProduit':  userData.nomProduit,
        'creations.$.descriptionProduit': userData.descriptionProduit,
        'creations.$.gainEnvironnement': userData.gainEnvironnement,
        'creations.$.categorieProduit': userData.categorieProduit,
        'creations.$.styleProduit': userData.styleProduit,
        'creations.$.materiauProduit': userData.materiauProduit,
        'creations.$.couleurProduit': userData.couleurProduit,
        'creations.$.hauteurProduit': userData.hauteurProduit,
        'creations.$.poidsProduit': userData.poidsProduit,
        'creations.$.largeurProduit': userData.largeurProduit,
        'creations.$.longueurProduit': userData.longueurProduit,
        'creations.$.prixTTCProduit': userData.prixTTCProduit,
        'creations.$.prixLivraisonProduit': userData.prixLivraisonProduit,
        'creations.$.retraitAtelierProduit': userData.retraitAtelierProduit,
        'creations.$.lieuFabricationProduit': userData.lieuFabricationProduit,
        'creations.$.stock': userData.stock
        }}).then(upd => {
            if(upd){
                res.send({success: "creation update success"});
            }
        }).catch(err => {
            res.send({error: "creation update : err"})
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
        eleves: req.body.eleves
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
            res.send("User does not exist");
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})

module.exports = professeurs