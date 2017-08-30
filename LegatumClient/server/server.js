const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});



server.listen(port, () => console.log(`We have lift off! Cruising at an altitude of: ${port} feet`));