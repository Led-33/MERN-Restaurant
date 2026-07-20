const express = require("express");
const router = express.Router();

const Categorie = require("../models/Categorie");
const Plat = require("../models/Plat");

// Toutes les catégories
router.get("/", async (req, res) => {
  try {

    const categories = await Categorie.find().sort({ nom: 1 });

    const resultat = await Promise.all(
      categories.map(async (cat) => {

        const total = await Plat.countDocuments({
          categorie: cat.nom,
        });

        return {
          ...cat.toObject(),
          totalPlats: total,
        };

      })
    );

    res.json(resultat);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Ajouter
router.post("/", async (req, res) => {
  try {

    const categorie = new Categorie(req.body);

    await categorie.save();

    res.json(categorie);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Modifier
router.put("/:id", async (req, res) => {

  try {

    const ancienne = await Categorie.findById(req.params.id);

    const categorie = await Categorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    await Plat.updateMany(
      { categorie: ancienne.nom },
      { categorie: categorie.nom }
    );

    res.json(categorie);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }

});

// Supprimer
router.delete("/:id", async (req, res) => {

  try {

    const categorie = await Categorie.findById(req.params.id);

    const total = await Plat.countDocuments({
      categorie: categorie.nom,
    });

    if (total > 0) {

      return res.status(400).json({
        message:
          "Impossible de supprimer une catégorie contenant des plats.",
      });

    }

    await categorie.deleteOne();

    res.json({
      message: "Supprimée",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;