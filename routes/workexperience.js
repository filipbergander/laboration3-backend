const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Skapar variabel för att kunna använda som modell i API:et    
const WorkExperience = require("../models/workexperience");

// Hämta alla arbetserfarenheter
router.get("/", async(req, res) => {
    try {
        let result = await WorkExperience.find();
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Hämta specifik arbetserfarenhet
router.get("/:id", async(req, res) => {
    try {
        let result = await WorkExperience.findById(req.params.id);
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
        let result = await WorkExperience.findByIdAndDelete(req.params.id);
        if (result == null) {
            return res.status(404).json({ message: "Ange ett ID som finns med i databasen!" });
        }
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
        const { id } = req.params;
        let result = await WorkExperience.findByIdAndUpdate(id, req.body);

        //Felmeddelande om ett ID anges som inte finns med i databasen
        if (!result) {
            return res.status(404).json({ message: "Ange ett ID som finns med i databasen!" });
        }
        // Om uppdateringen lyckades
        const updatedExperience = await WorkExperience.findById(id);
        return res.status(200).json({ message: "Arbetserfarenheten uppdaterad!", updated: updatedExperience });
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;