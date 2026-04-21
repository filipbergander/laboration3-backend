const express = require('express'); // Hämtar in express
const router = express.Router(); // Använder en router för att kunna skapa routes inom webbtjänsten
const mongoose = require('mongoose'); // Hämtar in mongoose

// Skapar variabel för att kunna använda som modell i API:et    
const WorkExperience = require("../models/workexperience");

// Hämta alla arbetserfarenheter
router.get("/", async(req, res) => {
    try {
        // Hämtar in alla tillagda arbetserfarenheter och sorterar dem efter startdatum där senaste jobbet kommer först
        let result = await WorkExperience.find().sort({ start_date: -1 });
        const formattedResult = result.map(row => ({
            id: row._id,
            company_name: row.company_name,
            job_title: row.job_title,
            location: row.location,
            description: row.description,
            start_date: row.start_date.toISOString().slice(0, 10), // Formatererar datumen enligt: YYYY-MM-DD
            end_date: row.end_date.toISOString().slice(0, 10)
        }));
        // Om inga arbetserfarenheter finns lagrade i databasen ges ett felmeddelande
        if (!result || formattedResult.length === 0) {
            return res.status(404).json({ message: "Det finns inga lagrade arbetserfarenheter i databasen!" });
        }
        return res.json(formattedResult); // Returnerar alla arbetserfarenheter i databasen som formaterat
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Hämta specifik arbetserfarenhet
router.get("/:id", async(req, res) => {
    try {
        // Hämtar in en specifik arbetserfarenhet genom det specifika ID:et på posten inom databasen
        let result = await WorkExperience.findById(req.params.id);
        // Om det inte finns någon post i databasen med det angivna ID:et, så ges ett felmeddelande
        if (result == null) {
            return res.status(404).json({ message: "Ange ett ID som finns i databasen!" });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Lägga till en arbetserfarenhet
router.post("/", async(req, res) => {
    try {
        let result = await WorkExperience.create(req.body);

        // Meddelande om användaren lyckats lägga till en ny arbetserfarenhet i databasen
        return res.status(201).json({
            message: "Du har lagt till en ny arbetserfarenhet i databasen!",
            created: result
        });

    } catch (error) {
        return res.status(400).json(error);
    }
});

// Radera specfik arbetserfarenhet
router.delete("/:id", async(req, res) => {
    try {
        // Letar upp det specifika ID:et inom databasen och raderar just den posten
        let result = await WorkExperience.findByIdAndDelete(req.params.id);

        // Felmeddelande om det angivna ID:et inte finns med i databasen
        if (!result) {
            return res.status(404).json({ message: "Ange ett ID som finns med i databasen!" });
        }

        // Om raderingen lyckas
        return res.json({
            message: "Arbetserfarenheten raderades från databasen",
            deleted: result
        });
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Uppdatera specfik arbetserfarenhet
router.put("/:id", async(req, res) => {
    try {
        // Letar upp det specifika ID:et inom databasen och uppdaterar just det jobbet
        const { id } = req.params;
        let result = await WorkExperience.findByIdAndUpdate(id, req.body);

        // Om användaren inte angett något i body för att uppdatera ett jobb
        if (req.body.length === 0) {
            return res.status(400).json("Ange minst ett fält för att uppdatera en arbetserfarenhet!");
        }

        //Felmeddelande om ett ID anges som inte finns med i databasen
        if (!result) {
            return res.status(404).json({ message: "Ange ett ID som finns med i databasen!" });
        }
        // Om uppdateringen lyckades, ges ett meddelande med den uppdaterade posten
        const updatedExperience = await WorkExperience.findById(id);
        return res.status(200).json({ message: "Arbetserfarenheten uppdaterad!", updated: updatedExperience });
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Exporterar router så att det kan användas inom fler filer
module.exports = router;