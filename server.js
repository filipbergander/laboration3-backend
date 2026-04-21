require('dotenv').config(); // För att använda miljövariabler inom .env-filen

const express = require('express'); // Hämtar in express
const cors = require('cors'); // Hämtar in cors för att kunna anropa webbtjänsten från en annan domän
const mongoose = require('mongoose'); // Hämtar in mongoose

const app = express();
const port = process.env.PORT || 3000; // Porten som servern lyssnar på antingen från .env eller port 3000 som standard

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