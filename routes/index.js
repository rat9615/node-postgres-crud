const express = require('express');

const router = express.Router();
const { Client } = require('pg');

const client = new Client();
client.connect((err) => {
    if (err) console.log(err);
    else console.log('Connected to DB');
});

router.get('/users', (req, res) => {
    const query = `SELECT * FROM users;`;

    client.query(query, (err, results) => {
        if (err) res.json(`Error: ${err}`);
        else res.json(results.rows);
    });
});

module.exports = router;
