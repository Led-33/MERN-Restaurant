const mongoose = require("mongoose");
require("dotenv").config();

const Plat = require("./models/Plat");

mongoose.connect(process.env.MONGO_URI);

const plats = [];

for (let i = 1; i <= 50; i++) {
  plats.push({
    nom: `Plat ${i}`,
    description: `Délicieux plat numéro ${i}`,
    prix: 10000 + i * 1000,
    categorie:
      i % 4 === 0
        ? "Dessert"
        : i % 3 === 0
        ? "Boisson"
        : i % 2 === 0
        ? "Entrée"
        : "Plat Principal",
    image: `https://picsum.photos/400/300?random=${i}`,
  });
}

async function seed() {
  try {
    await Plat.deleteMany({});
    await Plat.insertMany(plats);

    console.log("✅ 50 plats ajoutés");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();