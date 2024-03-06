const express = require('express');
const app = express()

app.get('/maestros', (req, res,next) => {
  if(tru){
    res.send("respondiendo maestros");
  }
  else{
    res.send("respondiendo false");
  }
  })
  

app.get('/alumnos', (req, res,next) => {
try {
throw new Error("ocurrio una tragedia")
}
catch(e){
  next(e)
  }
  // res.send('Respondiendo servidor')
})


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
// app.use( (req, res,next) => {
//   res.status(404).send('Recursos no encontrado')
// })
app.use((err, req, res, next) => {
  res.status(500).send( err.message);
});