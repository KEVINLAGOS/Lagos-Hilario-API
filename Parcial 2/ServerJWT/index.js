const express = require('express');
const app = express();
const jsonwebtoken = require('jsonwebtoken');
app.use(express.json());

app.post('/login',function(req,res,next){
    var token = jsonwebtoken.sign(req.body, 'claveSecreta');
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
    jsonwebtoken.verify(token, 'claveSecreta',function(err,decoded){
        if(err){
            res.json({Error:"Acceso no concedido a ruta sistema"});
        }else{
            next();
        }
    });
}