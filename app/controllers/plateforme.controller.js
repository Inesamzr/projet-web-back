const Plateforme = require("../models/plateforme.model");


//création d'une nouvelle plateforme
exports.createPlateforme = (req,res) => {

    const {name} = req.body;

    const plateforme = new Plateforme({name});

    plateforme
        .save()
        .then((plateforme) => {
            return res.status(200).json({plateforme});
        })
        .catch((err) => {
            res.status(500).json({error:"Erreur lors de la création de la plateforme."});
        });
};

//récupération de toutes les plateformes
exports.getAllPlateformes = (req,res) => {

    Plateforme.find()
        .then((plateformes) => {
            return res.status(200).json({plateformes});
        })
        .catch((err) => {
            return res.status(500).json({error : "Erreur lors de la récupération des plateformes"});
        });
};


//mise à jour d'une plateforme existante
exports.updatePlateforme = (req,res) => {

    const id = req.params.id;

    Plateforme.findById(id)
        .then((plateforme) => {

            if (!plateforme){
                return res.status(404).json({error: "Plateforme introuvable."});
            }

            plateforme.name = req.body.name;

            return plateforme.save();
        })
        .then((plateforme) => {
            return res.status(200).json({plateforme});
        })
        .catch((err) => {
            return res.status(500).json({error:"Erreur de la mise à jour de la plateforme"});
        });
};

//suppression d'une plateforme existante
exports.deletePlateforme = (req,res) => {

    const id = req.params.id;

    Plateforme.findByIdAndDelete(id)
        .then((plateforme) => {

            if(!plateforme){
                
                return res.status(404).json({error : "Plateforme introuvable"});

            }

            return res.status(200).json({message : "Plateforme supprimée avec succés"});

        })
        .catch((err) => {
            return res.status(500).json({error:"Erreur lors de la suppression de la plateforme"});
        });
};