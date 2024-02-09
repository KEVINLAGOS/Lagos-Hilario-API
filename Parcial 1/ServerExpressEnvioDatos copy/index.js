const express = require('express');
var morgan = require('morgan')
const app = express()
const port = 3000
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//recibiendo parametros  en la clase de consulta
app.get("/alumnos", (req, res, next) => {
 console.log(req.query)
  res.send('Hello World!')
});
//recibiendo parametros como parte de la ruta

app.get("/maestros/:carrera", (req, res, next) => {
  console.log(req.params.carrera)
   res.send('Maestro')
 });
//recibiendo  parametros body

 app.get("/administrativos", (req, res, next) => {
 
  for (const campo in req.body) {
     {
console.log(req.body[campo]);
      
    }
  }
   res.send('administrativos')
 });
 app.get("/minombre", (req, res, next) => {
  console.log(req.body);
   res.send('Nombre')
 });
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})