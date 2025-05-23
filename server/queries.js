require('dotenv').config();
const { Pool } = require('pg'); //or const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
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


const updateCandy = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, quantity, imageurl } = req.body;

  pool.query(
    'UPDATE candies SET name = $1, description = $2, quantity = $3, imageurl = $4 WHERE id = $5 RETURNING *',
    [name, description, quantity, imageurl, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Candy not found' });
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

//deleteCandy
const deleteCandy = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    'DELETE FROM candies WHERE id = $1 RETURNING *',
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Candy not found' });
      }
      res.status(200).json({ message: 'Candy deleted', candy: results.rows[0] });
    }
  );
};

const createCandy = (req, res) => {
  const { name, description, quantity } = req.body;
  const imageurl = 'https://picsum.photos/200?blur'

  pool.query(
    'INSERT INTO candies (name, description, quantity, imageurl) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, quantity, imageurl],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

module.exports = {
  getAllCandies,
  getCandyById,
  updateCandy,
  deleteCandy,
  createCandy
};
