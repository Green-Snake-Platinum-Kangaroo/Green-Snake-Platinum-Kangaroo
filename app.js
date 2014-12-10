var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// var fs = require('fs');
// var path = require('path');
// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();

// app.use('/', express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.listen(3000);

// console.log('Server started: http://localhost:3000/');
