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

// Routes
app.use("/workexperiences", require("./routes/workexperience"));

// Standard till API:et med ett "välkomstmeddelande"
app.get("/", async(req, res) => {
    res.json({ message: "Välkommen till API:et" });
});

// Lyssnar och startar servern
app.listen(port, () => {
    console.log("Servern kör på port: " + port);
    console.log("Länk: http://localhost:" + port);
});