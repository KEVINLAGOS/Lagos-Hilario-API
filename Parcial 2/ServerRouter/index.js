const express = require('express');
const app = express();
const personasRouter = require('./routes/personas');
const port = 3000;
app.use('/personas', personasRouter);
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
