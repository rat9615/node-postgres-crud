const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/index'));

app.get('/', (req, res) => res.send(`Routes at /api/users`));

app.use((req, res) => res.status(404).send(`404! Not Found!`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
