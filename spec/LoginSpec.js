const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('Login API Tests:', function () {
    it('correc login', function (done) {
    api.post({url: '/login', body: {username: 'admin', password:'abcd'}}, function (err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
    });
   });

   it('Improper Login', function (done) {
    api.post({url: '/login', body: {username: 'adminnn', password:'abcd'}}, function (err, res, body) {
        expect(res.statusCode).toBe(400);
        done();
    });
   })
});