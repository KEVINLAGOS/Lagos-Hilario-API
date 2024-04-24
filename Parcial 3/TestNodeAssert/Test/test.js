
import assert from 'node:assert';
import test from 'node:test';
import * as area from '../src/AreaCirculo.js'

test('Calcular area 30', () => {
    let resultado= area.calcularArea(30);
    assert.strictEqual(resultado,2827.4333882308138);
});



// run with `node tests.mjs`
