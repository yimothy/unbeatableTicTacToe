const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist/')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.log('Error listening to server: ', err);
  }
  console.log('Server is listening to port : ', port);
});
