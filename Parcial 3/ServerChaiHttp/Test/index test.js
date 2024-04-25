const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../index'); // Asegúrate de que la ruta sea correcta

describe('pruebas', () => {
    it('Debe devolver "Hello World!"', function (done) {
        chai.request('http://localhost:3000')
            .get('/')
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Hello World!');
                done();
            });
    });

    it('Debería devolver una sola persona si se proporciona un ID válido', (done) => {
        const idValido = 1; // Cambia esto por el ID de la persona que esperas recibir
        chai.request(app)
            .get(`/personas?id=${idValido}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.has.lengthOf(1); // Verifica que el cuerpo de la respuesta sea un array con una longitud de 1
                const persona = res.body[0]; // Obtiene el primer objeto del array
                expect(persona).to.have.property('id', idValido); // Verifica que el ID de la persona sea el esperado
                done();
            });
    });
    
});
