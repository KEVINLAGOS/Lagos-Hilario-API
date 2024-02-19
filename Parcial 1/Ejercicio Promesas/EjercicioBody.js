const objeto = {
  nombre: "Guillermo",
  edad: 22,
  Materia: "Api Rest"
};

// Imprimir el objeto actualizado
console.log(objeto);

for (const propiedad in objeto) {
    if (objeto.hasOwnProperty.call(objeto, propiedad)) {
        const objeto = Object[propiedad];
        
    }
}
