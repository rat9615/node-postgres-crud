const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    await User.sync();
    await User.findAll()
        .then((results) => res.status(200).json(results))
        .catch((err) => {
            console.log(`Error ${err}`);
            res.send(`Something went wrong!`);
        });
});

// router.post('/users', (req, res) => {
//     const { name, age } = req.body;
//     const query = `INSERT INTO users(name,age) VALUES($1,$2)`;

//     client.query(query, [name, age], (err) => {
//         if (err) res.json(`Error: ${err}`);
//         else res.send(`User added: ${name}`);
//     });
// });

// router.put('/users/:id', (req, res) => {
//     const { name, age } = req.body;
//     const { id } = req.params;
//     const query = `UPDATE users SET name = $1, age = $2 WHERE ID = $3;`;

//     client.query(query, [name, age, id], (err) => {
//         if (err) res.json(`Error ${err}`);
//         else res.send(`User updated: ${id}`);
//     });
// });

// router.delete('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const query = `DELETE FROM users WHERE ID = $1;`;

//     client.query(query, [id], (err) => {
//         if (err) res.json(`Error: ${err}`);
//         else res.send(`User deleted: ${id}`);
//     });
// });

module.exports = router;
