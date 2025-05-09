const pgp = require('pg-promise')();

const pgUsername = process.env.PG_USERNAME;
const pgPassword = process.env.PG_PASSWORD;
const dbName = process.env.DB_NAME;

const db = pgp(
  `postgres://${pgUsername}:${pgPassword}@localhost:5432/${dbName}`,
);

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });

module.exports = db;
