const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Connexion
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect."
      });
    }

    // Vérifier si le compte est actif
    if (!user.actif) {
      return res.status(403).json({
        message: "Ce compte est désactivé."
      });
    }

    // Vérifier le mot de passe
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect."
      });
    }

    // Générer le token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Erreur serveur."
    });

  }
};

// Utilisateur connecté
exports.me = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};