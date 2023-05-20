const Guide = require('../models/guide.model');
const { populate } = require('../models/user.model');
const User = require('../models/user.model');


//récuparation de tous les guides existants
exports.getAllGuides = (req, res) => {
    Guide.find().populate(["category", "game","author"])
    .then((guides) => {
        return res.status(200).json(guides);
    })
    .catch((err) => {
        return res.status(500).json({ error: 'Erreur lors de la récupération des guides'});
    });
};

//afficher les guide par plateforme
exports.getGuidesByPlateforme = (req,res) => {
    const plateforme = req.params.plateforme;

    Guide.find({'game.platforms': plateforme})
    .populate('category')
    .populate('game')
    .populate('author')
    .then((guides) => {
        return res.status(200).json({guides});
    })
    .catch((err) => {
        return res.status(500).json({error : 'Erreur lors de la recherche des guides par plateforme'});
    });
};

//affichage d'un guide spécifique 
exports.getGuideById = (req, res) => {

    //récupération de l'id 
    const guideId = req.params.id; 
  
    //recherche du guide dans la bd
    Guide.findById(guideId)
        //utiliser la méthode populate pour remplacer l'ID de la catégorie par l'objet complet de la catégorie associée
        .populate('category') 
        .populate('game') 
        .populate('author') 
        .then((guide) => {
            if (!guide) {
                //cas où le guide n'est pas trouvé
                return res.status(404).json({ error: 'Guide non trouvé.' });
            }

            //renvoi le guide trouvé sous forme de réponse
            return res.status(200).json({ guide }); 
        })
        .catch((err) => {
            //erreur de recherche de guide
            res.status(500).json({ error : 'Erreur lors de la recherche du guide'})
        });
};


//création d'un guide
exports.createGuide = (req, res) => {
    //on récupère les données du guide
    const { title, category, game, objective, content } = req.body;
    const author = req.userId;

    //middleware de vérification de token
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        // Récupérer l'ID de l'utilisateur à partir du token décodé
        const userId = decoded.id;

        // Comparer l'ID de l'utilisateur du token avec l'ID de l'auteur du guide
        if (userId !== author) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        //nouvelle instance de guide
        const newGuide = new Guide({
            title,
            category,
            game,
            objective,
            content,
            author
        });
    


    //on enregistre ce guide dans le bd
    newGuide.save()
        .then((guide) => {
            //récupère le username de l'utilisateur 
            return Guide.populate(guide, {path:'author', model: User, select: 'username'});
        })
        .then((populatedGuide) => {
            return res.status(201).json({guide:populatedGuide}); 
        })

        .catch((err) => {
            res.status(500).json({ error: 'Erreur lors de la création du guide' });
        });
    });
},


//mise à jour d'un guide
exports.updateGuide = (req, res) => {
    //on récupère l'id du guide à mettre à jour
    const guideId = req.params.guideId;

    //on récupère les données de mise à jour 
    const { title, category, game, objective, content, author } = req.body;

    //on le met à jour dans la bd
    Guide.findByIdAndUpdate(
        guideId,
        {
            title,
            category,
            game,
            objective,
            content,
            author
        },
        { new: true }
    )
        .populate('author')
        .then((updatedGuide) => {
            if (!updatedGuide) {
                //erreur recherche de guide 
                return res.status(404).json({ error: 'Guide non trouvé' });
            }

            //on renvoi le guide mise à jour
            return res.status(200).json({ guide: updatedGuide });
        })
        .catch((err) => {
            //erreur mise à jour du guide 
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du guide' });
        });
};

//suppression d'un guide
exports.deleteGuide = (req, res) => {

    //on récupère l'id du guide à supprimer
    const guideId = req.params.guideId;

    //on supprime le guide dans la base de données 
    Guide.findByIdAndDelete(guideId)
        .then((deletedGuide) => {
            if (!deletedGuide) {
                //erreur recherche de guide 
                return res.status(404).json({ error: 'Guide non trouvé' });
            }

            //on envoie un message de succès dans la réponse
            return res.status(204).json({ message: 'Guide supprimé avec succès' });
        })
        .catch((err) => {
            //erreur suppression du guide
            return res.status(500).json({ error: 'Erreur lors de la suppression du guide' });
        });
};