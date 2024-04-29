const area = require('../src/AreaCirculo.js');

test('Calcular área con radio 30', () => {
    const resultado = area(30); // Llamando a la función directamente
    expect(resultado).toBeCloseTo(2827.4333882308138);
});
