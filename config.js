const env = process.env.NOTE_ENV || 'development';
const credentials = require(`./.credentials.${env}`);
module.export = { credentials }