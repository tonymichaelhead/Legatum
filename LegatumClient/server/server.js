const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('PAST PRESENT FUTURE LEGATUM IS THE FIRST AND LAST WORD IN THE BLOCKCHAIN SECTOR')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})