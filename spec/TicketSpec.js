const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('Tickets API Tests:', function () {

  let adminjwtToken = '';
  let user1jwtToken = '';
  let user2jwtToken = '';
  let superjwtToken = '';
  let jwtToken = '';
  let techjwtToken='';

 beforeAll(function (done) {
    api.post({url: '/login', body: {username: 'admin', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      adminjwtToken = body.token;
    });
    api.post({url: '/login', body: {username: 'super2', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      superjwtToken = body.token;
       });
    api.post({url: '/login', body: {username: 'user1', password:'abcd'}}, function (err, res, body) {
      expect(res.statusCode).toBe(200);

      user1jwtToken = body.token;
      });
      api.post({url: '/login', body: {username: 'tech1', password:'abcd'}}, function (err, res, body) {
        expect(res.statusCode).toBe(200);
        techjwtToken = body.token;
        });

     api.post({url: '/login', body: {username: 'user2', password:'abcd'}}, function (err, res, body) {
        expect(res.statusCode).toBe(200);
        user2jwtToken = body.token;
        done();
        });

  });

  it('Get techicians of a ticket by admin', function (done) {
    api.get({
      url: '/tickets/5af2583a2bd708aa929b1ab3/technicians',
      headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });


  

  it('get technicians of a ticket created by the user', function (done) {
    api.get({
      url: '/tickets/5af2583a2bd708aa929b1ab3/technicians',
      headers: {
        'Authorization': 'Bearer ' + user1jwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  
  it('get technicians of a ticket unathorised', function (done) {
    api.get({
      url: '/tickets/5af2583a2bd708aa929b1ab3/technicians',
      headers: {
        'Authorization': 'Bearer ' + user2jwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      done();
    });
  });

//---------------------------Status
  it('updated the status by the supervisor of the unit', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab3/status/1',
      headers: {
        'Authorization': 'Bearer ' + superjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      
      done();
    });
  });

  it('update status by admin', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab3/status/2',
      headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      },
      body :{
        "message":"update status "
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.status).toBe('ONHOLD');
      
      done();
    });
  });
  it('update status by technician', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab3/status/2',
      headers: {
        'Authorization': 'Bearer ' + techjwtToken
      },
      body :{
        "message":"update status "
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.status).toBe('ONHOLD');
      
      done();
    });
  });

  it('update status by unathorised user', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab31/status/1',
      headers: {
        'Authorization': 'Bearer ' + user1jwtToken
      },
     // body :{
       // "message":"update status "
      //}
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      
      done();
    });
  });
  
  



  



//---------------------------Priority


  it('updated the priority by the supervisor of the unit', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab3/priority/1',
      headers: {
        'Authorization': 'Bearer ' + superjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.priority).toBe('LOW');
      
      done();
    });
  });

  it('updated the priority by the technician of the unit', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab3/priority/1',
      headers: {
        'Authorization': 'Bearer ' + techjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.priority).toBe('LOW');
      
      done();
    });
  });

  it('update priority by admin', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab3/priority/3',
      headers: {
        'Authorization': 'Bearer ' + adminjwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.priority).toBe('HIGH');
      done();
    });
  });

  it('update priority by unathorised user', function (done) {
    api.put({
      url: '/tickets/5af2583a2bd708aa929b1ab31/priority/1',
      headers: {
        'Authorization': 'Bearer ' + user1jwtToken
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      done();
    });
  });
  
  

  



 
  it('create ticket', function (done) {
    api.post({
      url: '/tickets',
      headers: {
        'Authorization': 'Bearer ' + user1jwtToken
      },
      body:{
        "subject":'test1',
        "details":'details2',
        "createdForEmail":'asd@g.com'
      }

    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  


});