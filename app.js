const express = require('express');

const app = express();

const sequelize = require('./config/database');

sequelize
    .authenticate()
    .then(() => console.log(`Connected successfully.`))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/index'));

app.get('/', (req, res) => res.send(`Routes at /api/users`));

app.use((req, res) => res.status(404).send(`404! Not Found!`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
