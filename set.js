const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUJwVEIxcHRUQ2ZRSFFlWnIzbVNxVXM2ekZveFlZdTQ3MjM4TWxrdG1GND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0dsenlvSDlHUTBsUnluaFQ2Z2VNdm1ocFVSS3EwVHNJOWxKQnFpV1Z4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpS3V2MWwzRFlXQzl3N0ZYaEVac1M0K2d0NlN5UjUxRmJtbWRwRG54Nld3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2ZWRGTmptWTNqMmluZTJRcWtzOGhqckxFRDFRMGpZM05GM1BRc1g0WWx3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtQL2d0bDVOZ09aa09aQUhDdkgweDUyS0Z5WlRIaDRSbVRabS82NzZFV0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJFODQramhXVGw4L1hGbVNlRzIvRzBGTmp4eE4wU0xjR1BMdllHZmpMVjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0pRV01uY01Fd2RzSWtMdU5TSm5aZTFrbENya0RIQlpmMHJ3N2ZNYkJGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidW1Zb3BFQUU0aWxqcWltM0VaV0NsUzZlaWYvNTQyMlRSYlRBZzRWdWR6cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJZeklTSVQ3eGlEaVJiL3cxUGNuRmI2SUQ5cTNRcGg2LzhLdjZtZ2tYZ2U5emtJcC9OYk5VQUhvc1VwNERxU1Q0djlxbER5eXBrN2RZUHVPSEdMbEFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzksImFkdlNlY3JldEtleSI6InU5YmNKNzQvYmtDd1czQitJV3N5bWo0NklsRmM4WDl6ZmZzNit2VHVuZWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzE5NDk1MDY3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjFDQThBNENFQTVEQzA2RDVFNUUyQjBCOTg3OUE5RDQ3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA5MjY1MDJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxOTQ5NTA2N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCMTYzRTM2NDlCNENENkU1ODEzREM2QzlBNjczMUZDRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwOTI2NTA0fV0sIm5leHRQcmVLZXlJZCI6NjIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MiwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJQWlZFMjJHSiIsIm1lIjp7ImlkIjoiMjYzNzE5NDk1MDY3OjUzQHMud2hhdHNhcHAubmV0IiwibGlkIjoiODAyNTYzMTI1ODYyODQ6NTNAbGlkIiwibmFtZSI6IlN1cHJlbWUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00rUjJJb0JFSXlKOU1JR0dCQWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjBidzJKUWdzK1g2MVNJZkF0RkU0UE1WcnZzZ1VTU29JWDRHTFJGakY4aU09IiwiYWNjb3VudFNpZ25hdHVyZSI6ImtRbTF3d3ZyTU1BWGlxVEpINndJdnduU0YycCtvYnZ4Z1d6Yzc3THRmbmJIVmdQYldUdWl4dVI0UTdmSlJUNzlWVU9LelBWejhjZEJDL2h0ZUVCMURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJESHhhcE5vOU81TXBmdGdNbDE1L3FXRUMxZzNmZGc2OHFxRFRxS2FaMloyUUUwWGlkYjgwZ2lCamZENHZnR0lidUEyUUc1UGh0RTFRYUE5SkdSUmdDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxOTQ5NTA2Nzo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkRzhOaVVJTFBsK3RVaUh3TFJST0R6RmE3N0lGRWtxQ0YrQmkwUll4ZklqIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA5MjY0OTEsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRFVkIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/toxiclover-tech/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "toxic lover",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254717263689",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by JEEPERS CREEPER-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧JEEPERS CREEPER-XMD✧",
    BOT : process.env.BOT_NAME || '✧JEEPERS CREEPER-XMD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
