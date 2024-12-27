const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0l4V0EwMXUyeUZvTEFhNnBLc0h6OXZCN3JrYXlZVEJwdjNCWWxxQ08wRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFFwVE1KWno3M0s2SG5OUGV3VlY1bzduTzN1SFFNMThHcW5DRkRORzJ3ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJS0JNVU8rTXJjNktBWm1wUTIydWg4MzEyMmp2cnRkZGFsYkYzRE1UZ1c0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5VjZwZlBqRmtjTUVOcDA2MkJxSjhLUDhyNXpydVdKakR6cEdCVDFwZHg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlLVkxYbk1QdkxjWnl5NFBrL1Nqc0V0ZXNnbnlJWEdRZy9oaDFjWXpGSFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVwaHpBUmF3bXFhdjhRQThGMGRyekI0TnN4dm52WEVJeHdoRStwU2pLMDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlMVFp4eVNEbkpBcTBNR1p0SCtINmhVUDVXRDZnM1ZodUVjaldNWnFVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0xUOVdyQThWOWJQREozL2psTThkdktpOVdMelc1bnRQZlFqcnRRV1dRYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJ0RE4vK3JxQ2laVitZcWpka1dkRjFxMnc2bVczMGMva2R5MnlHbjdDcjRXb21URXlJS3U1eElWYmVFcS9iZXRSTlBOM01BcTQ3SlVWMVBBU29JRkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIxLCJhZHZTZWNyZXRLZXkiOiI3cU55UFVCSEk1bE1TYmZKcDRoc1I4dE4rN2xqUDVnd2FJZ2xMOXg5OTBrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxODQyMTczNzU4OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1NjIyNDNBM0Y5RjQzNzU2RTRGQ0MyOURBQzNCODcyMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM1MzE0MDAxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZdWk2YkFZOVNKLUZSWUl1TVBNdS13IiwicGhvbmVJZCI6IjA1NTgzNzc2LTAxYTEtNDI1MC04YjM4LTIxODJjMjcyOTQ0MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnOUZUTTFQbE1hdGdWMXhrYllkVWp6d1pJclk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmQvTkdjL24vaEZmdzc0aUJURzdJNTlBZ3pjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJSMUUzTERFIiwibWUiOnsiaWQiOiI5MTg0MjE3Mzc1ODk6NTlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QkvCdmrTwnZqv8J2QliDwnZq+8J2auCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlMzcjcwREVMNlV1N3NHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoib1JIVWppaGljWGZCUjlwUmtndENmZUhVRzZhUHpJMXkxU3dGbXQ4QVBWST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVjFkemdEVG4xcG14UUxVWW9rT0IremFvalNLYytVSEp1OEwvVlFUR1hjblNSTHR4bmM2bTNQSGt1cU54TE1hdFN3ek9QSGdqZ2hxS3B1d3JmcXdCQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IjdHK3E2M1h3Z2FMUDJqbGNTblJ4ZTV4bmRBZlZzS1ZZTVFhM2VPejR4djhhK3V1alVmR3EzU20walZxbXFZMGpQenBheWZZZGN2STVrWUJ0cjRybkN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE4NDIxNzM3NTg5OjU5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFFUjFJNG9ZbkYzd1VmYVVaSUxRbjNoMUJ1bWo4eU5jdFVzQlpyZkFEMVMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzUzMTM5OTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ2R1In0=',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "𝐒𝚴𝚯𝐖 𝚾𝚸",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "918421737589",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Asia/Delhi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
