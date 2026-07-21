require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {

    try {

        const existe = await User.findOne({
            email: "admin@restaurant.com"
        });

        if (existe) {

            console.log("Cet administrateur existe déjà.");

            process.exit();

        }

        const password = await bcrypt.hash(
            "aleloia",
            10
        );

        const admin = new User({

            nom: "led",

            email: "maminiainaleonardo@gmail.com",

            password,

            role: "Super Admin",

            actif: true

        });

        await admin.save();

        console.log("Administrateur créé avec succès !");

        process.exit();

    }

    catch(err){

        console.log(err);

        process.exit();

    }

}

createAdmin();