const express = require("express");

const router = express.Router();

const authController =
require("../controllers/authController");

const authMiddleware =
require("../middleware/authMiddleware");

// Connexion
router.post(
  "/login",
  authController.login
);

// Profil connecté
router.get(
  "/me",
  authMiddleware,
  authController.me
);

module.exports = router;