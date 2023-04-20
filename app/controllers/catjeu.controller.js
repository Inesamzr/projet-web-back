const Catjeu = require ('../models/catjeu.model');
const { createJeu } = require('./jeu.controller');

//création d'une nouvelle catégorie de jeu 
exports.createCatjeu =(req,res) => {
    const {name} = req.body;

    const catjeu = new Catjeu({name});

    catjeu.save()
        .then(catjeu => {
            return res.status(201).json({catjeu});
        })
        .catch(err => {
            return res.status(500).json({error:"Erreur lors de la création de la catégorie de jeu"});
        });
};


//récupération de toutes les catégories de jeux
exports.getAllCatjeux = (req,res) => {

    Catjeu.find()
        .then(catjeux => {
            return res.status(200).json({catjeux});
        })
        .catch(err => {
            return res.status(200).json({error:"Erreur lors de la récupération des catégories de jeu"});
        });

};

//mise à jour d'une catégorie de jeu existante
exports.updateCatjeu = (req,res) => {
    
    const id = req.params.id;

    Catjeu.findById(id)
        .then(catjeu => {
            if (!catjeu){
                return res.status(404).json({error:"Catégorie de jeu introuvable."});
            }

            catjeu.name = req.body.name;

            return catjeu.save();
        })
        .then(updatedCatjeu => {
            return res.status(200).json({catjeu:updatedCatjeu});
        })
        .catch(err => {
            return res.status(500).json({error:"Erreur lors de la mise à jour de la catégorie de jeu"});
        });
};

//suppression d'une catégorie de jeu existante
exports.deleteCatjeu = (req,res) => {
    const id = req.params.id;

    Catjeu.findById(id)
        .then(catjeu => {
            
            if(!catjeu){

                return res.status(404).json({error : "Catégorie de jeu introuvable."});

            }

            return catjeu.remove();
        })
        .then(()=> {
            return res.status(200).json({message:"Catégorie supprimée avec succés!"});
        })
        .catch(err => {
            return res.status(500).json({error:"Erreur lors de la suppression de la catégorie de jeu"});
        });
};
