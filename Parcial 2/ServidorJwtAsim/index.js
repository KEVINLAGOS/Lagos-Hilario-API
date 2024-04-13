const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const jsonwebtoken = require('jsonwebtoken');
app.use(express.json());
const privada = fs.readFileSync(path.join(__dirname, 'llaves/privada.pem'));
const publica = fs.readFileSync(path.join(__dirname, 'llaves/publica.pem')); 
app.post('/login',function(req,res,next){
    var token = jsonwebtoken.sign(req.body, privada, { algorithm: 'RS256' });
    console.log(token);
    res.json({token});
});



app.get('/sistema',verificarToken,function(req,res,next){
    res.json({mensaje:"Acceso concedido a ruta sistema"})
});

app.listen(8081,function(){
    console.log("Servidor express escuchando en el puerto 8081");
});

function verificarToken(req,res,next){
    console.log(req.headers.authorization);
    let token = req.headers.authorization;
    jsonwebtoken.verify(token, publica, function(err,decoded){
        if(err){
            res.json({Error:"Acceso no concedido a ruta sistema"});
        }else{
            next();
        }
    });
}