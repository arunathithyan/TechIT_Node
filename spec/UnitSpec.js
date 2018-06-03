const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('Unit API Tests:', function () {

  let adminjwtToken = '';
  let user1jwtToken = '';
  let user2jwtToken = '';
  let superjwtToken = '';
  let jwtToken = '';
  let user1id;
  let unitid1;
  let user2id;

 beforeAll(function (done) {
    api.post({url: '/login', body: {username: 'admin', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      adminjwtToken = body.token;
      
    });
    api.post({url: '/login', body: {username: 'super2', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      superjwtToken = body.token;
      unitid1=body.userData.unit;   
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

  

 
  it('Get technicians by admin', function (done) {
    api.get({
      url: '/units/'+unitid1+'/technicians',
     headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
 

  it('wrong unitid by admin', function (done) {
    api.get({
      url: '/units/5af2583a2bd708aa929b1ab5/technicians',
     headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(404);
      done();
    });
  });


  it('incorrect unitid by supervisor', function (done) {
    api.get({
      url: '/units/'+unitid1+'/technicians',
      headers: {
        'Authorization': 'Bearer ' + superjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  
  it('Get technicians by unathorised user', function (done) {
    api.get({
      url: '/units/'+unitid1+'/technicians',
      headers: {
        'Authorization': 'Bearer ' + user2jwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      done();
    });
  });








 it('Get tickets by admin ', function (done) {
    api.get({
      url: '/units/'+unitid1+'/tickets',
      headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  
 it('Wrong unit id by admin ', function (done) {
  api.get({
    url: '/units/5af2583a2bd708aa929b1ab5/tickets',
    headers: {
      'Authorization': 'Bearer ' + adminjwtToken
    }
  }, function (err, res, body) {
    expect(res.statusCode).toBe(404);
    done();
  });
});


  it('Get tickets by supervisor ', function (done) {
    api.get({
      url: '/units/'+unitid1+'/tickets',
      headers: {
        'Authorization': 'Bearer ' + superjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  
  it('Get tickets by unathorised user ', function (done) {
    api.get({
      url: '/units/'+unitid1+'/tickets',
      headers: {
        'Authorization': 'Bearer ' + user1jwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      done();
    });
  });

});