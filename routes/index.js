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

router.post('/users', async (req, res) => {
    const { name, age } = req.body;
    await User.sync();
    await User.create({
        name,
        age,
    })
        .then((results) => res.status(200).json(results))
        .catch((err) => {
            console.log(err);
            res.send('Insertion unsuccessful');
        });
});

router.put('/users/:id', async (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;
    await User.update(
        {
            name,
            age,
        },
        {
            where: {
                id,
            },
        },
    )
        .then(() => res.status(200).send(`User updated ${id}`))
        .catch((err) => {
            console.log(err);
            res.send(`User not updated!`);
        });
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.destroy({
        where: {
            id,
        },
    })
        .then(() => res.status(200).send(`User deleted ${id}`))
        .catch((err) => {
            console.log(err);
            res.send(`Something went wrong!`);
        });
});

module.exports = router;
