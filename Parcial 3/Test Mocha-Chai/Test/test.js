
import * as chai from 'chai';
import * as  area from '../src/AreaCirculo.js';


describe("Ver si el resultado es igual", () => {
    
    it('Si le mando 2827.4333882308138 debe ser cierto', () => {
        let resultado= area.calcularArea(30);
        chai.assert.strictEqual(resultado,2827.4333882308138);
    });


});
// run with `node tests.mjs`
