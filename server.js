const express = require('express');
const app = express();

app.use(express.static('build'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/test', function (req, res) {
    res.end('hello world')
});

app.get('*', function (req, res) {
   res.sendFile(__dirname + '/build/index.html');
});

console.log('On port 7777');
app.listen(7777);
