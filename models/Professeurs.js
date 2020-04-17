const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const ProfesseurSchema = new Schema ({
    prenomArtisan: {
        type: String
    },
    nomArtisan: {
        type: String
    },
    emailArtisan: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    creations: [{
        nomProduit: {
            type: String
        },
        descriptionProduit: {
            type: String,
            required: true
        },
        gainEnvironnement: {
            type: String,
            required: true
        },
        categorieProduit: String,
        styleProduit: String,
        materiauProduit: String,
        couleurProduit: String,
        anneeConceptionProduit: String,
        hauteurProduit: SchemaTypes.Decimal128,
        poidsProduit: SchemaTypes.Decimal128,
        largeurProduit: SchemaTypes.Decimal128,
        longueurProduit: SchemaTypes.Decimal128,
        prixTTCProduit: SchemaTypes.Decimal128,
        prixLivraisonProduit: SchemaTypes.Decimal128,
        // retraitAtelierProduit: Boolean,
        lieuFabricationProduit: String,
        stock: Boolean,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],  
    date: {
        type: Date,
        default: Date.now
    },
    telephoneArtisan: {
        type: String,
    },
    sloganArtisan: {
        type: String,
    },
    plateformeArtisan: {
        type: String,
        required: true
    },
    savoirFaireArtisan: {
        type: String,
        required: true 
    },
    histoireArtisan: {
        type: String,
        required: true 
    },
    engagementEcoFriendlyArtisan: {
        type: String,
    },
    surMesureArtisan: {
        type: Boolean,
    }
})

module.exports = User = mongoose.model('professeurs', ProfesseurSchema);
