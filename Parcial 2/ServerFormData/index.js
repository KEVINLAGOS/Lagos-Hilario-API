const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const fs = require('fs');

const uploadDestination = path.join(__dirname, 'uploads');
const upload = multer({ dest: uploadDestination });

app.post('/imagenes', upload.single('imagen'), (req, res) => {
    console.log(req.file);
    const newPath = Guardar(req.file);
    res.send('termina');
});

function Guardar(file) {
    const newPath = path.join(uploadDestination, file.originalname);
    fs.renameSync(file.path, newPath);
    return newPath;
}

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
});
