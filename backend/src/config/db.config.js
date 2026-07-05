import config from './env.config.js';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: config.SUPABASE_CONNECTION_STRING,
    ssl: false
});

const query = (text, params) => pool.query(text, params);

export default query;