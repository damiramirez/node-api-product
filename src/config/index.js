const dotenv = require('dotenv');

// Veo si esta creado el .env
const envFound = dotenv.config();
if (!envFound) {
  throw new Error('The .env is missing');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: '/api/v1',
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  swagger: {
    path: '/api-docs',
  },
};
