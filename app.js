const express = require('express');

const app = express();

require('dotenv').config();
app.use('/api', require('./routes/index'));

app.get('/', (req, res) => res.send(`Routes at /api`));

app.use((req, res) => res.status(404).send(`404! Not Found!`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
