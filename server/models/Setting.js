const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    nomRestaurant: {
      type: String,
      default: "Mon Restaurant",
    },

    slogan: {
      type: String,
      default: "",
    },

    adresse: {
      type: String,
      default: "",
    },

    telephone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    siteWeb: {
      type: String,
      default: "",
    },

    ouverture: {
      type: String,
      default: "08:00",
    },

    fermeture: {
      type: String,
      default: "22:00",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    devise: {
      type: String,
      default: "Ar",
    },

    maxReservation: {
      type: Number,
      default: 10,
    },

    logo: {
      type: String,
      default: "",
    },

    cover: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", settingSchema);