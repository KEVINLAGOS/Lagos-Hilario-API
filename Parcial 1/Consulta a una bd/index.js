const express = require('express');
const app = express()
const mysql= require ('mysql2')
const port = 3000

const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ejemplo',
  password:'17112001'
});

app.get('/personas', (req, res,next) => {
  connection.query(
    'SELECT * FROM datos',
    function(err,results,fields){
      console.log(results);
      console.log(fields);
      res.send(results);


    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})