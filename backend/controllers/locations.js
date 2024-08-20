const locationRouter = require("express").Router();
const axios = require("axios");
const { parseText } = require("../utils/geolistUtils");
const geolist = "./geolist.txt";

const apiURL = "https://api.3geonames.org/?randomland";

locationRouter.get("/geolist", (req, res) => {
  try {
    const textByLine = parseText(geolist);

    const randomIndex = Math.trunc(Math.random() * textByLine.length);

    const randomPlace = textByLine[randomIndex];

    res.json(randomPlace);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

locationRouter.get("/geonames/:region", async (req, res) => {
  try {
    const { region } = req.params;

    const response = await axios.get(`${apiURL}=${region}&json=1`);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = locationRouter;
