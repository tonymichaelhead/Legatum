// Dependencies 
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('../database/db');

// Server Set-Up
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

// MiddleWare 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static Serve
app.use(express.static(path.join(__dirname, '/../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// Routes - API
  // New Contract
app.post('/newcontract', function (req, res){
  db.Contract.create({
    hash: req.body.hash,
    block_id: req.body.block_id
  }).then(function (data){
    res.status(201).send(data)
  }).catch(function (err){
    return console.log(err)
  })
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
  db.Contract.findAll({})
  .then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});

//   // Nullify Contract
// app.delete('/nullcontract', function (req, res){

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

  // Return All Users
app.get('/findalluser', function (req, res){
  db.User.findAll({})
  .then(function (data){
    res.status(200).send(data)
  }).catch(function (err){
    return console.log(err)
  })
});

server.listen(port, () => console.log(`We have lift off! Cruising at an altitude of: ${port} feet`));