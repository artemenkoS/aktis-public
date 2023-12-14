import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
});

export default pool;
