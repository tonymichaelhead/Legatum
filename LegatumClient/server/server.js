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
const users = [];

  // listen for connection
io.on('connection', function(socket){
  console.log('a user connected', socket.id);

  // listen for queue to update
  socket.on('getQueueSize', () => {
    io.emit('updateQueue', users.length);
  });

  // listen for user to initiate chat
  socket.on('userInitiateChat', function(username, socketid) {
    console.log('#3 - CHAT SERVER: heard userInitiatedChat from client');
    // store username in users object
    // users.push([socket.id, username]);
    users.push([socketid, username]);
    io.emit('updateQueue', users.length);
    io.emit('firstInLine', username, socketid);
    console.log('#3.1.1 - CHAT SERVER: users.length = ', users.length);
    console.log('#3.1 - CHAT SERVER: current users = ', users);
    // fire off userWaiting event with username
    console.log('#3.2 - CHAT SERVER: firing off waitingForAdmin event to client, username = ', username);
    io.emit('waitingForAdmin', username);
  });

  // listen for admin to accept chat
  socket.on('adminAcceptChat', function(adminUsername, adminID) {
    console.log('### CHAT SERVER: users = ', users);
    let user = users.shift();
    console.log('### CHAT SERVER: user after shift() = ', user);
    let username = user[1];
    let userid = user[0];
    console.log('#5 - CHAT SERVER: admin has accepted invite to chat');
    console.log('#5.1 - CHAT SERVER: firing off startChatWithUserAndAdmin');
    console.log('#5.2 - CHAT SERVER: username and userid = ', username, userid);
    console.log('#5.3 - CHAT SERVER: adminUsername = ', adminUsername);
    io.emit('startChatWithUserAndAdmin', username, userid, adminUsername);
    // dequeue user and reflect on admin page
    io.emit('updateQueue', users.length);
    io.emit('connectedWith', adminUsername, adminID);
  });
  
  // listen for new chat messages
  socket.on('chatMessage', (msg, sender) => {
    io.emit('chatMessages', msg, sender);
    console.log('server sent message', msg);
  });

  // listen for disconnect
  socket.on('ended', (username, socketid) => {
    console.log('SERVER SENDING RESPONSE TO END TO EVERYONE');
    io.to(socketid).emit('ended');
    console.log('SERVER HEARD ENDED AND SENT TO SOCKET ID ', username, socketid);
  });

  socket.on('disconnect', () => {
    console.log('## CHAT SERVER: heard user disconnect');
    // io.emit('ended');;
    // console.log();
  });

});

server.listen(port, () => console.log(`We have lift off! Cruising at an altitude of: ${port} feet`));