function calcularArea(radio) {
  const pi = Math.PI;
  return pi * radio ** 2;
}
  
function numeroaletorio(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = { calcularArea, numeroaletorio };
