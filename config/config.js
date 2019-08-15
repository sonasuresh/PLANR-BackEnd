const env = process.env;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config()

const config = {
  port: env.PLANR_SERVER_PORT,
  connInfo: {
    host: env.SQL_DB_HOST,
    user: env.SQL_DB_USERNAME,
    password: env.SQL_DB_PASSWORD,
    database: env.SQL_DB
  }
};

module.exports = config;