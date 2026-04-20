const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ansluta till MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cv").then(() => {
    console.log("Ansluten till Mongo-databas!")
}).catch((error) => {
    console.log("Fel vid försök till anslutning mot databas: " + error);
});

//Schema för CV:et
const CvSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Number,
        required: true
    },
    end_date: {
        type: Number,
        required: true
    }
});

const WorkExperience = mongoose.model("Workexperience", CvSchema);

// Routes
app.get("/", async(req, res) => {
    res.json({ message: "välkommen till API:et" });
});

app.get("/workexperiences", async(req, res) => {
    try {
        let result = await WorkExperience.find({});

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.listen(port, () => {
    console.log("Servern kör på port: " + port);
    console.log("Länk: http://localhost:" + port);
});