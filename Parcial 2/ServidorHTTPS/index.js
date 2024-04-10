const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificado/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificado/cert.pem'))
};

app.get('/', (req, res) => {
    res.json({mensaje: "Servidor express respondiendo"});
})

https.createServer(options, app).listen(8080, () => {
    console.log("Servidor express escuchando en 8080");
})