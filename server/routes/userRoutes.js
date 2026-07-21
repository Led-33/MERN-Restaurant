const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.get("/", async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.post("/", async (req, res) => {

  try {

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({

      nom: req.body.nom,

      email: req.body.email,

      password: hash,

      role: req.body.role,

      photo: req.body.photo,

    });

    await user.save();

    res.status(201).json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.put("/:id", async (req, res) => {

  try {

    const update = {

      nom: req.body.nom,

      email: req.body.email,

      role: req.body.role,

      photo: req.body.photo,

      actif: req.body.actif,

    };

    if (req.body.password) {

      update.password = await bcrypt.hash(
        req.body.password,
        10
      );

    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        update,
        {
          new: true,
        }
      ).select("-password");

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.delete("/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Utilisateur supprimé",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});
module.exports = router;