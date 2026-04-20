const mongoose = require('mongoose');


//Schema för CV:et som definierar hur en arbetserfarenhet ska se ut inom databasen
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
        type: Date,
        required: [true, "Ett slutdatum måste anges!"]
    }
});

module.exports = mongoose.model("WorkExperience", CvSchema);