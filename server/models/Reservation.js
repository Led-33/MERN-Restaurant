const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    telephone: {
      type: String,
      required: true,
    },

    dateReservation: {
      type: Date,
      required: true,
    },

    heure: {
      type: String,
      default: "",
    },

    nombrePersonnes: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    statut: {
      type: String,
      enum: ["En attente", "Confirmée", "Annulée"],
      default: "En attente",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", reservationSchema);