
function operacionAsincrona() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulamos una operación asíncrona que tarda 2 segundos en completarse
      resolve("La operacion async1 funciona ");
    }, 2000);
  });
}

function operacionAsincrona2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulamos una operación asíncrona que tarda 2 segundos en completarse
      resolve("La operación async2 funciona");
    }, 3000);
  });
}

// Ejemplo de uso con Promise.race:
console.log("Inicio de la operación asíncrona");
Promise.any([operacionAsincrona(), operacionAsincrona2()])
  .then(resultado => {
    console.log(resultado);
  })
  .catch(error => {
    console.log("Hubo un error:", error);
  });
