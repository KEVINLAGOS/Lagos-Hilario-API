const express = require('express');
const app = express()
const mysql= require ('mysql2')
const port = 3000
const path = require('path')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
app.use(express.json());

const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ejemplo'
  
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})
/**
 * @swagger
 * /empleado:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

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
app.post('/personas', (req, res, next) => {
  const {  nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo } = req.body;

  // Verificar que se proporcionen todos los campos obligatorios
  if ( !nombre || !direccion || !curp || !nacionalidad || !numero || !ciudad || !estado || !codigo) {
    res.status(400).send('Se requieren todos los campos para crear un nuevo registro.');
    return;
  }

  // Crear un nuevo registro en la base de datos
  connection.query(
    'INSERT INTO ejemplo ( nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [ nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo],
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).send('Error al insertar el nuevo registro');
        return;
      }
      console.log(`Nuevo registro insertado `);
      res.send('Nuevo registro insertado correctamente');
    }
  );
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
const swaggerOptions = {
 definition: {
 openapi: '3.0.0',
 info: {
 title: 'API Personas',
 version: '1.0.0',
 },
 servers:[
 {url: `http://localhost:${port}`}
 ],
 },
 apis: [`${path.join(__dirname,"./index.js")}`],
 };
 const swaggerDocs = swaggerJsDoc(swaggerOptions);
 app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = app;
