const express = require("express");
const axios = require("axios");
const { readFileSync } = require("fs");

const app = express();
const cors = require("cors");
const port = 3000;

const apiURL = "https://api.3geonames.org/?randomland";

app.use(cors());
app.use(express.json());

app.get("/geolist", (req, res) => {
  try {
    const text = readFileSync("./geolist.txt").toString("utf-8");
    const textByLine = text.split("\n").map((line) => {
      const [lat, lng] = line.split(" ").map(Number);
      return { lat, lng };
    });
    res.json(textByLine);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/proxy", async (req, res) => {
  try {
    const { region } = req.body;
    const response = await axios.get(`${apiURL}=${region}&json=1`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
