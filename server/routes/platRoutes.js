const express = require("express");
const router = express.Router();
const Plat = require("../models/Plat");
const upload = require("../middleware/upload");

// ➕ Ajouter un plat
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      const plat = new Plat({

        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        categorie: req.body.categorie,
        image: req.file ? req.file.filename : "",

      });

      await plat.save();

      res.json(plat);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);

// 📄 Lire les plats avec pagination + recherche
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {
      nom: { $regex: search, $options: "i" }
    };

    const plats = await Plat.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Plat.countDocuments(query);

    res.json({
      plats,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//modifier un plat
router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {

    try {

      const data = {
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        categorie: req.body.categorie,
      };

      if (req.file) {
        data.image = req.file.filename;
      }

      const plat = await Plat.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
      );

      res.json(plat);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }

  }
);

//supprimer un plat
router.delete("/:id", async (req, res) => {
  try {
    await Plat.findByIdAndDelete(req.params.id);

    res.json({
      message: "Plat supprimé"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;