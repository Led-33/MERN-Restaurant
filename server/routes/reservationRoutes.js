const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");


// ==========================
// Ajouter une réservation
// ==========================
router.post("/", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// ==========================
// Toutes les réservations
// ==========================
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({
      createdAt: -1,
    });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// ==========================
// Une réservation
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable",
      });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// ==========================
// Modifier une réservation
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(reservation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// ==========================
// Modifier uniquement le statut
// ==========================
router.patch("/:id/status", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        statut: req.body.statut,
      },
      {
        new: true,
      }
    );

    res.json(reservation);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// ==========================
// Supprimer
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);

    res.json({
      message: "Réservation supprimée",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;