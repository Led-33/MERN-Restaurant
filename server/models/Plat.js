const mongoose = require("mongoose");
const platSchema = new mongoose.Schema({
  nom: String,
  description: String,
  prix: Number,
  categorie: String,
  image: String
});

module.exports = mongoose.model("Plat", platSchema);