const yaml = require("yaml");
const fs = require("fs");
const path = require("path");

const file = fs.readFileSync(path.join(__dirname, 'objeto.yml'), 'utf8');
const VarObjeto = yaml.parse(file);
console.log(VarObjeto);
