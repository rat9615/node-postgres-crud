const express = require('express');

const app = express();

const Umzug = require('umzug');
const db = require('./config/database');

const umzug = new Umzug({
    migrations: {
        params: [db.sequelize.getQueryInterface(), db.Sequelize],
        path: './migrations'
    },
    storage: 'sequelize',
    storageOptions: {
        sequelize: db.sequelize
    },
    logger: console
});

(async () => {
    await umzug
        .up()
        .then(() => console.log('Migrations completed!'))
        .catch((err) => console.log(`Migrations unsuccessful! - ${err}`));
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/index'));

app.get('/', (req, res) => res.send(`Routes at /api/users`));

app.use((req, res) => res.status(404).send(`404! Not Found!`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
