const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('Users API Tests:', function () {

  let adminjwtToken = '';
  let user1jwtToken = '';
  let user2jwtToken = '';
  let superjwtToken = '';
  let jwtToken = '';
  let user2id;
  let user3id;
  let user1id;

 beforeAll(function (done) {
    api.post({url: '/login', body: {username: 'admin', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      adminjwtToken = body.token;
    });
    api.post({url: '/login', body: {username: 'super2', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      user3id=body.userData.id;
      superjwtToken = body.token;
       });
    api.post({url: '/login', body: {username: 'user1', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      user1jwtToken = body.token;
      user1id=body.userData.id;
      });
     api.post({url: '/login', body: {username: 'user2', password:'abcd'}}, function (err, res, body) {
        expect(res.statusCode).toBe(200);
        user2jwtToken = body.token;
        user2id=body.userData.id;
        done();
        });
  });

  it('Get tickets by admin', function (done) {
    api.get({
      url: '/users/'+user2id+'/tickets',
      headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  it('get ticket by the user created it', function (done) {
    api.get({
      url: '/users/'+user2id+'/tickets',
      headers: {
        'Authorization': 'Bearer ' + user2jwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
       done();
    });
  });

  it('Get tickets by unathorised user', function (done) {
    api.get({
      url: '/users/'+user2id+'/tickets',
      headers: {
        'Authorization': 'Bearer ' + user1jwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      done();
    });
  });

  it('No tickets', function (done) {
    api.get({
      url: '/users/'+user3id+'/tickets',
     headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
     
      done();
    });
  });


});