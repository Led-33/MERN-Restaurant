const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  dateReservation: {
    type: Date,
    required: true,
  },
  nombrePersonnes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);