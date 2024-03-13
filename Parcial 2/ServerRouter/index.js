const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const personasRouter = require('./routes/personas');
const port = 3000;

app.use(bodyParser.json());

app.use('/personas', personasRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
