require('dotenv').config();
const { Pool } = require('pg'); //or const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});


const getAllCandies = (req, res) => {
  pool.query('SELECT * FROM candies ORDER BY id ASC', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results.rows);
  });
};


const getCandyById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM candies WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Candy not found' });
    }
    res.status(200).json(results.rows[0]);
  });
};


module.exports = {
  getAllCandies,
  getCandyById
};
