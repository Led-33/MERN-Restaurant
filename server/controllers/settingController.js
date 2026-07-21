const Setting = require("../models/Setting");

exports.getSettings = async (req, res) => {
  try {

    let settings = await Setting.findOne();

    if (!settings) {

      settings = await Setting.create({});

    }

    res.json(settings);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

exports.updateSettings = async (req, res) => {
  try {

    let settings = await Setting.findOne();

    if (!settings) {

      settings = new Setting();

    }

    settings.nomRestaurant = req.body.nomRestaurant;
    settings.slogan = req.body.slogan;
    settings.adresse = req.body.adresse;
    settings.telephone = req.body.telephone;
    settings.email = req.body.email;
    settings.siteWeb = req.body.siteWeb;

    settings.ouverture = req.body.ouverture;
    settings.fermeture = req.body.fermeture;

    settings.facebook = req.body.facebook;
    settings.instagram = req.body.instagram;
    settings.whatsapp = req.body.whatsapp;

    settings.devise = req.body.devise;
    settings.maxReservation = req.body.maxReservation;

    if (req.files?.logo) {

      settings.logo = req.files.logo[0].filename;

    }

    if (req.files?.cover) {

      settings.cover = req.files.cover[0].filename;

    }

    await settings.save();

    res.json(settings);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};