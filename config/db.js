import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Construct the path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// Load environment variable
dotenv.config({ path: path.join(PATH, '..', '.env') });

// Create pool
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

const query = async (sql, params) => {
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, params);
        return results;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        connection.release();
    }
};

export default query;
