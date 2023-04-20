const Catguide = require('../models/catguide.model');

//création d'une nouvelle catégorie de guide
exports.createCatguide = (req,res) => {
    const {name} = req.body;

    const catguide = new Catguide({ name});

    catguide    
        .save()
        .then((catguide) => {
            return res.status(200).json({catguide});
            
        })
        .catch((err) => {
            return res.status(500).json({error:"Erreur lors de la création de la catégorie de guide"});
        });
};


//récuparation de toutes les catégories de guides 
exports.getAllCatguides = (req,res) => {
    Catguide.find()
        .then((catguides)=> {
            return res.status(200).json({catguides});
        })
        .catch((err) => {
            return res.status(500).json({error : "Erreur lors de la récupération des catégories de guides"});
        });
};


//mise à jour d'une catégorie de guide 
exports.updateCatguide = (req,res) => {
    
    const id = req.params.id;
    
    Catguide.findById(id)
        .then((catguide) => {
            if(!catguide){
                return res.status(404).json({error:"Catégorie de guide introuvable."});

            }

            catguide.name = req.body.name;

            catguide
                .save()
                .then((catguide) => {
                    return res.status(201).json({catguide});
                })
                .catch((err) => {
                    return res.status(500).json({error:"Erreur lors de la mise à jour de la catégorie de guide."});

                });
        })
        .catch((err) => {
            return res.status(500).json({error:"Erreur lors de la recherche de la catégorie de guide."});
        });
};


//suppression d'une catégorie de guide 
exports.deleteCatguide = (req,res) =>{
    const id = req.params.id;

    Catguide.findById(id)
        .then((catguide) => {
            if(!catguide){
                return res.status(404).json({error:"Catégorie de guide introuvable"});

            }

            catguide    
                .remove()
                .then(() => {
                    return res.status(200).json({message:"Catégorie de guide supprimée avec succés."});

                })
                .catch((err) => {
                    res.status(500).json({error:"Erreur lors de la suppression de la catégorie du guide"});

                });
        })
        .catch((err) => {
            return res.status(500).json({error:"Erreur lors de la recherche de la catégorie de guide"});
        });
};
