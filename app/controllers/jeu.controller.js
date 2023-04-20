const Jeu = require('../models/jeu.model');

//création d'un nouveau jeu
exports.createJeu = async (req,res) => {
    
    //instance de jeu avec les données envoyées 
    const jeu = new Jeu ({
        name : req.body.name,
        image : req.file ? req.file.path : "",
        category : req.body.category,
        platforms: req.body.platforms
    });

    jeu.save()
    .then(jeu => {
        return res.status(200).json({jeu});
    })
    .catch(err => {
        return res.status(500).json({error: "Erreur lors de la création du jeu."});

    });
};


//récupération d'un jeu spécifique par son ID
exports.getJeuById = async (req,res) => {
    
    const jeuId = req.params.id;

    Jeu.findById(jeuId)
    .then(jeu => {
        if(!jeu) {
            return res.status(404).json({error : 'Jeu non trouvé'});
        }
        return res.status(200).json({jeu});
    })
    .catch(err => {
        return res.status(500).json({ error: 'Erreur lors de la récupération du jeu'});
    })
};

//récupération de tous les jeux
exports.getAllJeux = (req,res) => {
    Jeu.find()
    .then(jeux => {
        return res.status(200).json({jeux});
    })
    .catch(err => {
        return res.status(500).json({error : 'Erruer lors de la récupération des jeux'});
    });
};


//mise à jour d'un jeu existant
exports.updateJeu = (req,res) => {
    
    const id = req.params.id;

    Jeu.findById(id)
    .then(jeu => {
        if(!jeu) {
            return res.status(404).json({error:'Jeu introuvable'});
        }
        
        jeu.name = req.body.name;
        jeu.image = req.file ? req.file.path : jeu.image;
        jeu.category = req.body.category;
        jeu.platforms = req.body.platforms;

        return jeu.save();
    })
    .then(updatedJeu => {
        return res.status(200).json({jeu: updatedJeu});
    })
    .catch(err => {
        return res.status(500).json({error:'Erreur lors de la mise à jour du jeu'});
    });
};

//suppression d'un jeu existant
exports.deleteJeu = (req,res) => {

    const jeuID = req.params.id;

    Jeu.findByIdAndDelete(jeuId)
    .then(jeu => {
        if (!jeu){
        return res.status(404).json({error:'Jeu non trouvé'});
    }
    
    return res.json({ message : 'Jeu supprimé avec succé'});
    })
    
    .catch(err => {
        return res.status(500).json({error: 'Erreur lors de la suppression du jeu'});
    });
};