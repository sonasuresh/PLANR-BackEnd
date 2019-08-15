const mysql = require('mysql');

const { connInfo } = require('../config/config');

const logger = require('../lib/logger');
const q = require('q');
const connection = mysql.createConnection(connInfo);

async function executeQuery (query, params) {
  const defer = q.defer();
  connection.query(query, params, (err, results) => {
    logger.info(connection.format(query, params));
    if (err) {
      defer.reject(err);
    }
    defer.resolve(results);
  });
  return defer.promise;
}

module.exports = {
  executeQuery
};
