var express = require('express');
var app = express();

//  for serving static files.
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/jsonData', function(req, res) {

    // do processing...

    res.json({ "date": Date.now() });
})

let port = 8082

app.listen(port, function() {

    console.log(`open link in the browser: server is  listening at http://localhost:${port}`)
})