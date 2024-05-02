const area = require('../src/AreaCirculo.js');
// jest.spyOn(areas, 'numAletorio')
area.numeroaletorio =jest.fn(()=>{return 5});
test('Calcular área con radio 30', () => {
    const resultado = area.calcularArea(30); // Llamando a la función directamente
    expect(resultado).toBeCloseTo(2827.4333882308138);
   
    const aleatorio = area.numeroaletorio(1,20); // Llamando a la función directamente
    expect(aleatorio).toBe(5);
});
