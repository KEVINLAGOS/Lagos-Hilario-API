const express = require('express');
const app = express()
const path = require("path")



app.get('/download', (req, res,next) => {
  res.download(path.join(__dirname,'/Imagenes/mapa.png'));
})

app.get('/send', (req, res,next) => {
  res.sendFile(path.join(__dirname,'/Imagenes/mapa.png'));
})


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})