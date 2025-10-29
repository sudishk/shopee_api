// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'edugaon',
  host: 'dpg-d3s7cdi4d50c738jddb0-a',
  database: 'edugaon',
  password: '57Pyi0ifNkQ83Fm0L0oucnqFNm032hU6',
  port: 5432 // default PostgreSQL port
});

module.exports = pool;