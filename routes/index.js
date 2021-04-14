const express = require('express');

const router = express.Router();
const { User, Product, Role } = require('../models');

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
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.send('Insertion unsuccessful');
        });
});

router.post('/roles', async (req, res) => {
    const { roleName } = req.body;
    await Role.create({
        roleName
    })
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.send('Roles Added');
        });
});

router.post('/roles/:id/:roleId', async (req, res) => {
    const { id, roleId } = req.params;

    const user = await User.findOne({
        where: {
            id
        }
    });

    const role = await Role.findOne({ where: { roleId } });

    user.addRole(role)
        .then(() => res.status(200).send(`User role added`))
        .catch((err) => {
            console.log(err);
            res.send(`User role not added!`);
        });
});

router.get('/userroles/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    await user
        .getRoles()
        .then((results) => res.status(200).json(results))
        .catch((err) => {
            console.log(`Error ${err}`);
            res.send(`Something went wrong!`);
        });
});

router.get('/userrolesop/:roleId', async (req, res) => {
    const { roleId } = req.params;

    const role = await Role.findOne({ where: { roleId } });

    await role
        .getUsers()
        .then((results) => res.status(200).json(results))
        .catch((err) => {
            console.log(`Error ${err}`);
            res.send(`Something went wrong!`);
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
