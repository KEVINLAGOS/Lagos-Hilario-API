/*
  Módulo: calcularArea
  
  Descripción:
  Este módulo proporciona una función para calcular el área de un círculo dado su radio.
*/

/**
 * Calcula el área de un círculo dado su radio.
 * @param {number} radio El radio del círculo.
 * @returns {number} El área del círculo.
 */
 function calcularArea(radio) {
  // Fórmula para calcular el área de un círculo: pi * radio al cuadrado
  const pi = Math.PI;
  return pi * radio ** 2;
}

export default calcularArea;
