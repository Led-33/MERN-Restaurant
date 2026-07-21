const express = require("express");

const router = express.Router();

const controller = require("../controllers/settingController");

const upload = require("../middleware/upload");

router.get("/", controller.getSettings);

router.put(
  "/",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  controller.updateSettings
);

module.exports = router;