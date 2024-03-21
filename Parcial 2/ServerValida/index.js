const express = require('express');
const app = express()
const mysql= require ('mysql2')
const port = 3000
const { body, validationResult } = require('express-validator');
app.use(express.json());

const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ejemplo'
});

app.get('/personas', (req, res, next) => {
  
  if (typeof req.query.id === 'undefined') {
    connection.query(
      'SELECT * FROM ejemplo',
      function(err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).send('Error ');
          return;
          connection.end()

        }
        console.log(results);
        console.log(fields);
        res.send(results);
        connection.end()


      }
    );
  } else {
    connection.query(
      `SELECT * FROM ejemplo WHERE id = ${req.query.id}`,
      function(err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).send('Error no encontrado');
          return;
          connection.end()

        }
        console.log(results);
        console.log(fields);
        res.send(results);
        connection.end()

      }
    );
  }
});
app.delete('/personas', (req, res, next) => {
  if (typeof req.query.id === 'undefined') {
    res.status(400).send('Debe proporcionar un ID para eliminar un registro.');
    return;
  }

  connection.query(
    `DELETE FROM ejemplo WHERE id = ${req.query.id}`,
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el registro');
        return;
        connection.end()

      }
      console.log(`Registro eliminado con ID ${req.query.id}`);
      res.send('Registro eliminado correctamente');
      connection.end()

    }
  );
});

app.put('/personas', (req, res, next) => {
  const id = req.query.id;
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    console.log(req.body);
    res.status(400).send('Se requiere al menos un campo para modificar el registro.');
    return;
  }

  connection.query(
    'UPDATE ejemplo SET ? WHERE id = ?',
    [newData, id],
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).send('Error al modificar el registro');
        return;
      }
      console.log(`Registro modificado con ID ${id}`);
      res.send('Registro modificado correctamente');
    }
  );
});
app.post('/personas', [
  body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
  body('direccion').notEmpty().withMessage('El campo direccion es obligatorio'),
  body('curp').notEmpty().withMessage('El campo CURP es obligatorio'),
  body('nacionalidad').notEmpty().withMessage('El campo nacionalidad es obligatorio'),
  body('numero').notEmpty().withMessage('El campo numero es obligatorio').isInt().withMessage('El campo numero debe ser un número entero').isLength({ min: 10, max: 10 }).withMessage('El campo numero debe tener 10 dígitos'),
  body('ciudad').notEmpty().withMessage('El campo ciudad es obligatorio'),
  body('estado').notEmpty().withMessage('El campo estado es obligatorio'),
  body('codigo').notEmpty().withMessage('El campo codigo es obligatorio').isInt().withMessage('El campo codigo debe ser un número entero').isLength({ min: 5, max: 5 }).withMessage('El campo codigo debe tener 5 dígitos'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo } = req.body;

  // Crear un nuevo registro en la base de datos
  connection.query(
    'INSERT INTO ejemplo (nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al insertar el nuevo registro');
      }
      console.log(`Nuevo registro insertado `);
      res.send('Nuevo registro insertado correctamente');
    }
  );
});




// app.get('/personas', async (req, res,next) => {
//  let sql='';
//  if (typeof req.query.id=='undefined'){
//   sql= 'SELECT * FROM ejemplo';
//  }
//  else{
//  sql = 'SELECT * FROM ejemplo where id = ${req.query.id}';
//  }
//  try{
//   const connection =await 
//  }
//   connection.query(
//     'SELECT * FROM ejemplo',
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