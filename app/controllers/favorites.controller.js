const User = require('../models/user.model');
const Guide = require('../models/guide.model');

// Ajouter un guide aux favoris d'un utilisateur
exports.addFavoriteGuide = async (req, res) => {
  try {
    const { guideId } = req.body;
    const userId = req.user.id;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le guide existe
    const guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(404).json({ message: 'Guide non trouvé' });
    }

    // Vérifier si le guide est déjà présent dans les favoris de l'utilisateur
    const isGuideInFavorites = user.favoriteGuides.includes(guideId);
    if (isGuideInFavorites) {
      return res.status(400).json({ message: 'Le guide est déjà présent dans les favoris de l\'utilisateur' });
    }

    // Ajouter le guide aux favoris de l'utilisateur
    user.favoriteGuides.push(guideId);
    await user.save();

    res.status(200).json({ message: 'Guide ajouté aux favoris avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du guide aux favoris' });
  }
};

// Supprimer un guide des favoris d'un utilisateur
exports.removeFavoriteGuide = async (req, res) => {
  try {
    const { guideId } = req.params;
    const userId = req.user.id;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le guide est présent dans les favoris de l'utilisateur
    const isGuideInFavorites = user.favoriteGuides.includes(guideId);
    if (!isGuideInFavorites) {
      return res.status(400).json({ message: 'Le guide n\'est pas présent dans les favoris de l\'utilisateur' });
    }

    // Supprimer le guide des favoris de l'utilisateur
    user.favoriteGuides = user.favoriteGuides.filter(favoriteGuideId => favoriteGuideId.toString() !== guideId);
    await user.save();

    res.status(200).json({ message: 'Guide supprimé des favoris avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du guide des favoris' });
  }
};
