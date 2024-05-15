const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3000;
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const fs = require('fs'); // Importa el módulo fs para leer archivos
app.use(express.json());

// Leer el archivo README.md de forma síncrona
const readmeContent = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ejemplo'
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * @swagger
 * tags:
 *   name: Personas
 *   description: Operaciones relacionadas con personas
 *
 * components:
 *   schemas:
 *     Persona:
 *       type: object
 *       required:
 *         - nombre
 *         - direccion
 *         - curp
 *         - nacionalidad
 *         - numero
 *         - ciudad
 *         - estado
 *         - codigo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único generado automáticamente para la persona
 *         nombre:
 *           type: string
 *           description: Nombre de la persona
 *         direccion:
 *           type: string
 *           description: Dirección de la persona
 *         curp:
 *           type: string
 *           description: CURP de la persona
 *         nacionalidad:
 *           type: string
 *           description: Nacionalidad de la persona
 *         numero:
 *           type: string
 *           description: Número de teléfono de la persona
 *         ciudad:
 *           type: string
 *           description: Ciudad de residencia de la persona
 *         estado:
 *           type: string
 *           description: Estado de residencia de la persona
 *         codigo:
 *           type: string
 *           description: Código postal de la persona
 */

// GET endpoint to retrieve all personas or by ID
/**
 * @swagger
 * /personas:
 *   get:
 *     summary: Obtener todas las personas o una persona por su ID
 *     tags: [Personas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID de la persona a obtener (opcional)
 *     responses:
 *       200:
 *         description: Datos de la(s) persona(s) encontrada(s)
 *       500:
 *         description: Error al buscar las personas en la base de datos
 */
app.get('/personas', (req, res, next) => {
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

// DELETE endpoint to delete a persona by ID
/**
 * @swagger
 * /personas:
 *   delete:
 *     summary: Eliminar una persona por su ID
 *     tags: [Personas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la persona a eliminar
 *     responses:
 *       200:
 *         description: Persona eliminada correctamente
 *       400:
 *         description: Debe proporcionar un ID para eliminar un registro
 *       500:
 *         description: Error al eliminar la persona de la base de datos
 */
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
      }
      console.log(`Registro eliminado con ID ${req.query.id}`);
      res.send('Registro eliminado correctamente');
    }
  );
});

// PUT endpoint to update a persona by ID
/**
 * @swagger
 * /personas:
 *   put:
 *     summary: Actualizar una persona por su ID
 *     tags: [Personas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la persona a actualizar
 *       - in: body
 *         name: persona
 *         required: true
 *         description: Campos a actualizar de la persona
 *         schema:
 *           $ref: '#/components/schemas/Persona'
 *     responses:
 *       200:
 *         description: Persona actualizada correctamente
 *       400:
 *         description: Se requiere al menos un campo para modificar el registro
 *       500:
 *         description: Error al modificar la persona en la base de datos
 */
app.put('/personas', (req, res, next) => {
  const id = req.query.id;
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
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

// POST endpoint to create a new persona
/**
 * @swagger
 * /personas:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       200:
 *         description: Nueva persona creada correctamente
 *       400:
 *         description: Se requieren todos los campos para crear un nuevo registro
 *       500:
 *         description: Error al insertar la nueva persona en la base de datos
 */
app.post('/personas', (req, res, next) => {
  const { nombre, direccion, curp, nacionalidad, numero, ciudad, estado, codigo } = req.body;

  // Verificar que se proporcionen todos los campos obligatorios
  if (!nombre || !direccion || !curp || !nacionalidad || !numero || !ciudad || !estado || !codigo) {
    res.status(400).send('Se requieren todos los campos para crear un nuevo registro.');
    return;
  }

  // Crear un nuevo registro en la base de datos
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

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Personas',
      version: '1.0.0',
      description: readmeContent, // Agrega la descripción desde el archivo README.md
    },
    servers: [
      { url: `http://localhost:${port}` }
    ],
  },
  apis: [`${path.join(__dirname, "./index.js")}`],
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
 app.get("/api-docs-json", (req, res) => {
  res.json(swaggerDocs);
});
app.get("/api-docs-redoc", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});
// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
