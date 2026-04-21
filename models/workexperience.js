const mongoose = require('mongoose'); // Hämtar in mongoose


/*Schema för CV:et som definierar hur en arbetserfarenhet ska se ut inom databasen.
Felmeddelande om något av fälten inte anges när man ska lägga till en ny erfarenhet.*/
const CvSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: [true, "Ett företagsnamn måste anges!"]
    },
    job_title: {
        type: String,
        required: [true, "En jobbtitel måste anges!"]
    },
    location: {
        type: String,
        required: [true, "En ort måste anges!"]
    },
    description: {
        type: String,
        required: [true, "En beskrivning måste anges!"]
    },
    start_date: {
        type: Date,
        required: [true, "Ett startdatum måste anges!"]
    },
    end_date: {
        type: Date
            // ,required: [true, "Ett slutdatum måste anges!"]
    }
});

module.exports = mongoose.model("WorkExperience", CvSchema); // Exporterar modellen för att kunna använda den i resten av webbtjänsten