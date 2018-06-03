/**
 * This is a Mongo Shell script. Run it with Mongo shell on command line:
 *     mongo test2.js
 * or inside Mongo shell: load('test2.js')
 */
db = connect('localhost/techit');

print('Connected to database: techit');

// drop the units, users, tickets collection if it already exists
db.units.drop();
db.users.drop();
db.tickets.drop();

// inserting units

unitId1 = db.units.insertOne({
    name:'ECST unit',
    location:'',
    email:'',
    descrpition:'Technical Operations, or TechOps, is a unit in the ECST College.TechOps runs the Hydrogen Station, and provides technical assistance to the ECST departments such as creating and replacing part for senior design project.'
}).insertedId


unitId2 = db.units.insertOne({
    name:'ET',
    location:'ET',
    email:'et@gmail.com',
    phone: '987654321'
}).insertedId

// inserting users
userId1 = db.users.insertOne({   
    username: 'admin',
    password: 'abcd',
    email: 'admin@gmail.com',
    firstName: 'AdminFirstName',
    lastName: 'AdminLastName',
    phoneNumber:'123456798',
    position:'ADMIN',
    unit:unitId1
}).insertedId;


userId2 = db.users.insertOne({  
    username: 'tech1',
    password: 'abcd',
    email: 'tech1@gmail.com',
    firstName: 'tech1f',
    lastName: 'tech1l',
    phoneNumber:'987654321',
    position:'TECHNICIAN',
    unit: unitId1
}).insertedId;

userId3 = db.users.insertOne({  
    username: 'super2',
    password: 'abcd',
    email: 'supervisor2@localhost.localdomain',
    firstName: 'supervisorFname',
    lastName: 'supervisorLname',
    phoneNumber:'(555) 555-5965',
    position:'SUPERVISOR',
    unit: unitId2
}).insertedId;


userId4 = db.users.insertOne({  
    username: 'user2',
    password: 'abcd',
    email: 'user2@localhost.localdomain',
    firstName: 'user2f',
    lastName: 'user2l',
    phoneNumber:'(555) 555-5555',
    position:'USER',
}).insertedId;


userId5 = db.users.insertOne({  
    username: 'user1',
    password: 'abcd',
    email: 'user1@localhost.localdomain',
    firstName: 'user1f',
    lastName: 'user1l',
    phoneNumber:'(565) 555-5555',
    position:'USER',
}).insertedId;

userId6 = db.users.insertOne({  
    username: 'super1',
    password: 'abcd',
    email: 'super1@localhost.localdomain',
    firstName: 'supervisorFname',
    lastName: 'supervisorLname',
    phoneNumber:'(565) 555-5555',
    position:'SUPERVISOR',
    unit: unitId1
}).insertedId;


// list all the users

// cursor = db.users.find();
// while (cursor.hasNext()) {
//     printjson(cursor.next());
// }
print(`${userId1} \n${userId2} \n${userId3} \n`)

ticketId1 = db.tickets.insertOne({
    userid: userId5, 
    createdForName: 'user1', 
    phone: '(666) 666-6666' , 
    createdForEmail: 'user1@localhost.localdomin', 
    status : 'OPEN', 
    unitId: unitId2,
    subject:'Computer malfunction.', 
    details:'The computer is broken in room 220.', 
    startDate: new Date('2016-10-14 00:00:01'), 
    lastUpdated: new Date('2016-10-14 00:00:01'), 
    ticketLocation: 'Kinghall 220',
    technicians:[userId2]
}).insertedId

ticketId2 = db.tickets.insertOne({
    userid: userId5, 
    createdForName: 'Joseph', 
    phone: '(666) 666-6666' , 
    createdForEmail: 'user1@localhost.localdomin', 
    status : 'OPEN', 
    unitId: unitId2,
    subject:'Projector malfunction.', 
    details:'The projector is broken in room A220.', 
    startDate: new Date('2016-10-13 00:00:01'), 
    lastUpdated: new Date('2016-10-13 00:00:01'), 
    ticketLocation: 'ET A220'
}).insertedId

ticketId3 = db.tickets.insertOne({
    userid: userId4, 
    createdForName: 'user1', 
    phone: '(666) 666-6666' , 
    createdForEmail: 'jojo@localhost.localdomin', 
    status : 'OPEN', 
    unitId: unitId2,
    subject:'Projector malfunction.', 
    details:'The projector is broken in room A220.', 
    startDate: new Date('2016-10-13 00:00:01'), 
    lastUpdated: new Date('2016-10-13 00:00:01'), 
    ticketLocation: 'ET A220'
}).insertedId



db.users.update({
    _id: userId5
}, {$push:{tickets:{$each:[ticketId1, ticketId2]}}})


db.users.update({
    _id: userId4
}, {$push:{tickets:{$each:[ticketId3]}}})

db.units.update({
    _id: unitId2
}, {$push:{technicians:{$each:[userId2]} , supervisors: userId3, tickets:{$each:[ticketId1,ticketId2]}}})