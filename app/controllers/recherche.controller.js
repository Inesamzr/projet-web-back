const Guide = require('../models/guide.model');

// Route de recherche de guides
const searchGuides =  (req, res) => {

    //pagination
    const perPage = 9; //nb guides par pages (3x3)
    const page = req.query.page || 1; //numéro de page

    const skip = (page - 1) * perPage;
    
    //extraction des paramètres de recherche
    const { keywords, catguide, catjeu, plateforme } = req.query;

    //création d'un objet de filtre pour la recherche
    const filter = {};

    //filtrer par mots clefs correspondants au titre du guide
    if (keywords) {
        filter.title = { $regex: new RegExp(keywords, 'i') };
    }

    //filtrer par catégories de guides
    if (catguide) {
        const catguideArray = catguide.split(',');
        filter['category.name'] = { $in: catguideArray};
    }

    //filtrer par catégorie de jeu 
    if (catjeu) {
        const catJeuArray = catjeu.split(',');
        filter['jeu.category'] = {$in: catJeuArray};
    }

    //filtrer par plateforme
    if (plateforme) {
        const plateformeArray = plateforme.split(',');
        filter['jeu.platform'] = {$in: plateformeArray};
    }

    // Rechercher les guides 
    Guide.find(filter)
        //pagination
        .skip(skip)
        .limit(perPage)
        .populate('category', 'name') 
        .populate('game', 'category platform') 
        .populate('author', 'username') 
        .sort({ created_at: -1 }) 
        .then(guides => {
            // Filtrer les guides en fonction des paramètres de recherche
            const filteredGuides = guides.filter(guide => {
                const { title, category, game, author } = guide;
                return (
                    !keywords || 
                    title.toLowerCase().includes(keywords.toLowerCase())
                )
                && (!catguide || (category && category.name && catguide.name.some(cat => cat === catguide)))
                && (!catjeu || (game && game.category && game.category.some(cat => cat === catjeu)))
                && (!plateforme || (game && game.platform && game.platform.some(plat => plat === plateforme)))
                && (!author || (author && author.username === author));
            });

            //renvoi le résultat de la recherche de guides paginés au client
            return res.status(200).json({
                guides: filteredGuides,
                currentPage : page,
                totalPages: Math.ceil(guides.length / perPage),
                totalGuides : filteredGuides.length
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: 'Erreur lors de la recherche de guides.' });
        });
};

module.exports = {searchGuides};
