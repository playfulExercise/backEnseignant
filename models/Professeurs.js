const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfesseurSchema = new Schema({
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
        infos: {
            progression_monde: {
                type: Number,
                default: 0
            },
            nb_pieces: {
                type: Number,
                default: 0
            },
            matieres: [{
                nom_matiere: {
                    type: String
                },
                nb_donjons: {
                    type: Number
                },
                nb_donjons_finis: {
                    type: Number
                }
            }]
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    configuration_monde: {
        nb_donjons: {
            type: Number,
            default: 0
        },
        francais: {
            type: Number,
            default: 0
        },
        maths: {
            type: Number,
            default: 0
        },
        histoire: {
            type: Number,
            default: 0
        },
        geographie: {
            type: Number,
            default: 0
        },
        anglais: {
            type: Number,
            default: 0
        },
        date_creation_monde: {
            type: Date,
            default: Date.now
        }
    }
})

module.exports = User = mongoose.model('professeurs', ProfesseurSchema);