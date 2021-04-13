const express = require('express');

const router = express.Router();
const { User, Product } = require('../models');

router.get('/users', async (req, res) => {
    await User.findAll()
        .then((results) => res.status(200).json(results))
        .catch((err) => {
            console.log(`Error ${err}`);
            res.send(`Something went wrong!`);
        });
});

router.post('/users', async (req, res) => {
    const { name, age, city, mobile } = req.body;
    await User.create({
        name,
        age
    })
        .then(async (results) => {
            await results.createInfo({
                city,
                mobile
            });
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.send('Insertion unsuccessful');
        });
});

router.post('/products', async (req, res) => {
    const { productName, price, UserId } = req.body;
    await Product.create({
        productName,
        price,
        UserId
    })
        .then(async (results) => {
            res.status(200).json(results);
        })
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
            age
        },
        {
            where: {
                id
            }
        }
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
            id
        }
    })
        .then(() => res.status(200).send(`User deleted ${id}`))
        .catch((err) => {
            console.log(err);
            res.send(`Something went wrong!`);
        });
});

module.exports = router;
