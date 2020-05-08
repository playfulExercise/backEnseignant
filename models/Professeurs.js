const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfesseurSchema = new Schema ({
    prenom_prof: {
        type: String
    },
    nom_prof: {
        type: String
    },
    email_prof: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    etablissement: {
        type: String,
    },
    departement: {
        type: String,
    },
    eleves: [{
        prenom_eleve: {
            type: String,
            required: true
        },
        nom_eleve: {
            type: String,
            required: true
        },
        pseudo_eleve: {
            type: String
        },
        code_eleve: {
            type: String
        },
        id_prof: {
            type: ObjectId
        },
        progression: [],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    configuration_monde: {
        nb_donjons: 0,
        francais: 0,
        maths: 0,
        histoire: 0,
        geographie: 0,
        anglais: 0
    },
    infos: {}
})

module.exports = User = mongoose.model('professeurs', ProfesseurSchema);
