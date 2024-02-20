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

app.get('/personas', (req, res, next) => {
  if (typeof req.query.id === 'undefined') {
    connection.query(
      'SELECT * FROM datos',
      function(err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).send('Error ');
          return;
        }
        console.log(results);
        console.log(fields);
        res.send(results);
      }
    );
  } else {
    connection.query(
      `SELECT * FROM datos WHERE id = ${req.query.id}`,
      function(err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).send('Error no encontrado');
          return;
        }
        console.log(results);
        console.log(fields);
        res.send(results);
      }
    );
  }
});


// app.get('/personas', async (req, res,next) => {
//  let sql='';
//  if (typeof req.query.id=='undefined'){
//   sql= 'SELECT * FROM datos';
//  }
//  else{
//  sql = 'SELECT * FROM datos where id = ${req.query.id}';
//  }
//  try{
//   const connection =await 
//  }
//   connection.query(
//     'SELECT * FROM datos',
//     function(err,results,fields){
//       console.log(results);
//       console.log(fields);
//       res.send(results);


//     }
//   )
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})