# Webbtjänst för att hämta och skriva ut arbetslivserfarenheter som ett CV
Detta repository innehåller kod för ett enklare REST-API byggt med Express och Mongoose tillsammans med databasen MongoDB. Webbtjänsten är byggd för att hantera olika arbetslivserfarenheter som jag till viss del arbetet med tidigare. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: https://laboration3-backend.onrender.com/

## Installation, databas
API:et använder sig utav databasen MongoDB & Atlas.
 Inom denna webbtjänst används Mongoose som hjälpmedel till databasen. En dotenv-fil (.env.sample) finns för exempel på anslutningsmöjligheter. Inom katalogen models visas strukturen över data. Eftersom jag har använt MongoDB så skapas ett automatiskt ID till varje post. 
 
 Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket.

| Fält          | Typ     | Beskrivning |
|---------------|----------|-------------|
| _id           | ObjectId | Automatiskt genererat ID |
| company_name  | String   | Företagets namn |
| job_title     | String   | Jobbtitel |
| location      | String   | Ort |
| description   | String   | Beskrivning av arbetsuppgifter |
| start_date    | Date     | Startdatum |
| end_date      | Date     | Slutdatum |

## Användning
Nedan finns beskrivet hur man når API:et på olika vis:

| Metod | Ändpunkt              | Beskrivning                                      |
|-------|------------------------|--------------------------------------------------|
| GET   | /workexperiences        | Hämtar alla sparade arbetserfarenheter.         |
| GET   | /workexperiences/:id    | Hämtar en specifik arbetserfarenhet via ID.     |
| POST  | /workexperiences        | Lagrar en ny arbetserfarenhet.                  |
| PUT   | /workexperiences/:id    | Uppdaterar en befintlig arbetserfarenhet.       |
| DELETE| /workexperiences/:id    | Raderar en specifik arbetserfarenhet via ID.    |

Ett CV-objekt returneras/skickas som JSON med följande struktur:
```
 {
  "company_name" : "Svensk Catering",
  "job_title": "Chaufför",
  "location": "Östersund",
  "description": "Sorterade pallar med livsmedel och körde ut till kunder runt Jämtland.",
  "start_date": "2026-02-02",
  "end_date": "2026-04-04"
}
```