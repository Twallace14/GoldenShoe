const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'tyronewallace',
  host: 'localhost',
  port: 5432,
  database: 'GoldenShoeDemo',
});

module.exports = pool;
