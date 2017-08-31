// Dependencies 
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Server Set-Up
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

// MiddleWare 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static Serve
app.use(express.static(path.join(__dirname, '/../dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// Routes - API
  // New Contract
app.post('/newcontract', function (req, res){

});
  
  // Find Contract
app.get('/findcontract', function (req, res){

});

  // Nullify Contract
app.delete('/nullcontract', function (req, res){

});

  // New User
app.post('/newuser', function (req, res){

});

  //Update User                                                                                                                                                                                                                                                                             
app.update('/updateuser', function (req, res){

});

  // Find by PubKey
app.get('/findpubkey', function (req, res){

});

  // Find by SSN
app.get('/findssn', function (req, res){

});



server.listen(port, () => console.log(`We have lift off! Cruising at an altitude of: ${port} feet`));