// Dependencies 
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('../database/db');
const fallback = require('express-history-api-fallback');
const socketIO = require('socket.io');
// const server = http.createServer(app);

// Server Set-Up
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

// Socket.io for chat
const io = socketIO(server);

// MiddleWare 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static Serve
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(fallback(__dirname + '../src/app/app-routing.module.ts'));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../dist/index.html'));
// });




// Routes - API
  // New Contract
app.post('/newcontract', function (req, res){
  let uniqueHash = req.body.hash;
  db.Contract.create({
    username: req.body.username,
    contract_nickname: req.body.contract_nickname,
    hash: req.body.hash,
    will_text: req.body.will_text,
    file_name: req.body.file_name,
    beneficiary: req.body.beneficiary,
    pending: true,
    will_hash: 'DEFAULT',
    contract_addr: 'DEFAULT'  
  })
  .then(function (data){
    res.status(201).send(data)
  }).catch(function (err){
    return console.log(err)
  })
 
    // db.Transaction.create({
    //   user_idFK: res.data.contract_id,
    // })
});
  
  // Find One Contract
app.get('/findonecontract', function (req, res){
  db.Contract.findOne({
    where: {hash: 'this is a test for hash'}
  }).then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});

  //Find All Contracts
app.get('/findallcontract', function (req, res){
  //let email = req.query.email
  
  db.Contract.findAll({ where: { username: req.query.username}})
  .then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});

  //Find All Pending Contracts
app.get('/findpendingcontract', function (req, res){
  db.Contract.findAll({ where: { pending: true }})
  .then( function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log
  })
});

  // Update Contract
app.post('/updatecontract', function (req, res){
  db.Contract.findOne({ where: { contract_id: req.body.contract_id }})
    .then((contract) => {
      contract.update({
        pending: false,
        will_hash: req.body.will_hash,
        hash: req.body.hash,
        contract_addr: req.body.contract_addr
      })
    })
    .then(result => {
      res.status(201).send(result);
    })
});

// app.post('/updatecontract', function (req, res){
//   db.Contract.find({ where: { contract_id: req.body.contract_id }})
//   .on('success', function (contract) {
//       contract.updateAttributes({
//         pending: false,
//         contract_addr: req.query.contract_addr,
//         will_hash: req.query.will_hash
//       })
//       .success(function () {
//         console.log('successfully updated contract')
//       })
//     }
//   )
// });


  // New User
app.post('/newuser', function (req, res){
  db.User.create({
    username: req.body.username,
    pub_key: req.body.pub_key,
    ssn: req.body.ssn
  }).then(function (data){
    res.status(201).send(data)
  }).catch( function (err){
    return console.log(err)
  })
});

//   //Update User                                                                                                                                                                                                                                                                             
// app.update('/updateuser', function (req, res){

// });

  // Find by PubKey
app.get('/findpubkey', function (req, res){
  db.User.findOne({
    where: {pub_key: 'this is a test 1234342342342'}
  }).then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});

  // Find by SSN
app.get('/findssn', function (req, res){
  db.User.findOne({
    where: {ssn: 2345433 }
  }).then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});
// Find by email
app.get('/findemail', function (req, res){
  console.log('Im req james bitch', req);
  db.User.findOne({
    where: {email: req.query.email }
  }).then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});

  // Return All Users
app.get('/findalluser', function (req, res){
  db.User.findAll({})
  .then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});

  // Chat functionality
// TODO: consider making this an array to preserve order more like a queue
// var users = {};
const users = [];

  // listen for connection
io.on('connection', function(socket){
  console.log('a user connected', socket.id);

  // listen for user to initiate chat
  socket.on('userInitiateChat', function(username) {
    console.log('#3 - CHAT SERVER: heard userInitiatedChat from client');
    
    // store username in users object
    // users[socket.id] = username;
    users.push([socket.id, username]);
    console.log('#3.1 - CHAT SERVER: current users = ', users);

    // fire off userWaiting event with username
    console.log('#3.2 - CHAT SERVER: firing off waitingForAdmin event to client, username = ', username);
    // TODO: toggle button on admin dashboard to indicate user is waiting...
    io.emit('waitingForAdmin', username);

    // TODO: REMOVE _ ONLY FOR TESTING 
        console.log('### CHAT SERVER: users = ', users);
        let user = users.pop();
        console.log('### CHAT SERVER: user after pop() = ', user);
        // let username = user[0];
        let userid = user[0];
        console.log('#5 - CHAT SERVER: admin has accepted invite to chat');
        console.log('#5.1 - CHAT SERVER: firing off startChatWithUserAndAdmin');
        console.log('#5.2 - CHAT SERVER: username and userid = ', username, userid);
        // console.log('#5.3 - CHAT SERVER: adminUsernaem = ', adminUsername);
        // io.emit('startChatWithUserAndAdmin', username, userid, adminUsername);
        io.emit('startChatWithUserAndAdmin', username, userid);

    // TODO: REMOVE _ ONLY FOR TESTING 

  });

  // listen for admin to accept chat
  // socket.on('adminAcceptChat', function(adminUsername) {
  //   // TODO: retrieve username and send back with adminUsername 
  //   // TODO: remove username from waiting queue
  //   let user = this.users.pop();
  //   let username = user[0];
  //   let userid = user[1];
  //   console.log('#5 - CHAT SERVER: admin has accepted invite to chat');
  //   console.log('#5.1 - CHAT SERVER: firing off startChatWithUserAndAdmin');
  //   console.log('#5.2 - CHAT SERVER: username = ', username);
  //   console.log('#5.3 - CHAT SERVER: adminUsernaem = ', adminUsername);
  //   io.emit('startChatWithUserAndAdmin', username, userid, adminUsername);
  // });
  
  // listen for new chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessages', msg);
    console.log('server sent message', msg);
  });

  // listen for disconnect
  socket.on('disconnect', () => {
    console.log('## CHAT SERVER: heard user disconnect from client');
    console.log('## CHAT SERVER: heard user disconnect from client.............');
    // close chat room
    // io.emit('ended', () => {
    //   console.log('##CHAT SERVER: emitting ended signal to client**************');
    // });
    // return state back to original
    // socket.disconnect();
  });

});

server.listen(port, () => console.log(`We have lift off! Cruising at an altitude of: ${port} feet`));

/*
listen for 'userInitiateChat', username
  add username to user array
  emit ('userWaiting')

listen for 'disconnect'
  close chat room
    display thank you message to user
    display message to admin user

listen for 'adminAcceptChat', username
  emit ('startChatwithUserAndAdmin', username, adminUsername)


*/

// old ---------------

// socket.on('start chat', function() {
  //   console.log('SERVER: starting chat');
  //   io.emit('chat started');
  // });

  // socket.on('end chat', function() {
  //   console.log('SERVER: ending chat');
  //   io.emit('chat ended');
  // });

 // socket.on('getNumberOfUsers', function() {
  //   let length = Object.keys(users).length;
  //   console.log('SERVER: sending length of users = ', length);
  //   io.emit('numOfUsers', length);
  // });

  // socket.on('addUser', function(name) {
  //   console.log('SERVER: add user heard by server');
  //   users[socket.id] = name;
  //   console.log('SERVER: current users = ', users);
  //   console.log('SERVER: current users length = ', Object.keys(users).length);
  // });

  // socket.on('removeUser', function(name) {
  //   socket.disconnect();
  //   console.log('users = ', users);
  // });