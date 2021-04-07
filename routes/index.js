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

router.post('/users', (req, res) => {
    const { name, age } = req.body;
    const query = `INSERT INTO users(name,age) VALUES($1,$2)`;

    client.query(query, [name, age], (err) => {
        if (err) res.json(`Error: ${err}`);
        else res.send(`User added: ${name}`);
    });
});

router.put('/users/:id', (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;
    const query = `UPDATE users SET name = $1, age = $2 WHERE ID = $3;`;

    client.query(query, [name, age, id], (err) => {
        if (err) res.json(`Error ${err}`);
        else res.send(`User updated: ${id}`);
    });
});

module.exports = router;
