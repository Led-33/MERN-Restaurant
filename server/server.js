const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "API Restaurant OK" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

//Connection Plat
const platRoutes = require("./routes/platRoutes");
app.use("/api/plats", platRoutes);
//connexion categorie
const categorieRoutes = require("./routes/categorieRoutes");

app.use("/api/categories", categorieRoutes);
//connextion reservation
const reservationRoutes = require("./routes/reservationRoutes");
app.use("/api/reservations", reservationRoutes);
//image
const path = require("path");
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);