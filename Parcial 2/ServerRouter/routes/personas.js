const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ejemplo'
});

router.get('/', (req, res, next) => {
  if (typeof req.query.id === 'undefined') {
    connection.query(
      'SELECT * FROM ejemplo',
      function(err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).send('Error');
          return;
        }
        console.log(results);
        console.log(fields);
        res.send(results);
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
        }
        console.log(results);
        console.log(fields);
        res.send(results);
      }
    );
  }
});

router.delete('/', (req, res, next) => {
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
      }
      console.log(`Registro eliminado con ID ${req.query.id}`);
      res.send('Registro eliminado correctamente');
    }
  );
});

router.put('/', (req, res, next) => {
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

router.post('/', (req, res, next) => {
  const { nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo } = req.body;

  if (!nombre || !direccion || !curp || !nacionalidad || !numero || !ciudad || !estado || !codigo) {
    res.status(400).send('Se requieren todos los campos para crear un nuevo registro.');
    return;
  }

  connection.query(
    'INSERT INTO ejemplo (nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo],
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).send('Error al insertar el nuevo registro');
        return;
      }
      console.log(`Nuevo registro insertado`);
      res.send('Nuevo registro insertado correctamente');
    }
  );
});

module.exports = router;
