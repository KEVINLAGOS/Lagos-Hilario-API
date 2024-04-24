const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('pruebas', () => {
    it('Aprobado !',function (done)  { 
        chai.request('http://localhost:3000')
            .get('/')
            .end((err, res) => {
                if (err) return done(err); 
                expect(res).to.have.status(200); 
                done(); 
            });
    });
    
    
});
