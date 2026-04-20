require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ansluta till MongoDB
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Ansluten till Mongo-databas!")
}).catch((error) => {
    console.log("Fel vid försök till anslutning mot databas: " + error);
});

// Gör routesen enklare att använda i API:et, slipper skriva workexperience inom varje route
app.use("/workexperiences", require("./routes/workexperience")); // Hämtar in från routes/workexperience.js

// Standard till API:et med ett "välkomstmeddelande"
app.get("/", async(req, res) => {
    res.json({ message: "Välkommen till API:et" });
});

// Lyssnar och startar servern
app.listen(port, () => {
    console.log("Servern kör på port: " + port);
    console.log("Länk: http://localhost:" + port);
});