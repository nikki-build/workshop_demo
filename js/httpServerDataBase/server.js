var express = require('express');
var app = express();

var loki = require('lokijs')

var db = new loki('example.db');
var users = db.addCollection('users');

var odin = users.insert({ name: 'odin', email: 'odin.soap@lokijs.org', age: 38 });
var thor = users.insert({ name: 'thor', email: 'thor.soap@lokijs.org', age: 25 });
var stan = users.insert({ name: 'stan', email: 'stan.soap@lokijs.org', age: 29 });
var oliver = users.insert({ name: 'oliver', email: 'oliver.soap@lokijs.org', age: 31 });
var hector = users.insert({ name: 'hector', email: 'hector.soap@lokijs.org', age: 15 });
var achilles = users.insert({ name: 'achilles', email: 'achilles.soap@lokijs.org', age: 31 });

// console.info("data ", users.data())
    //  for serving static files.
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World');
})


function filterFun() {
    return true
}
app.get('/users', function(req, res) {

    let dbusers = users.where(filterFun)
    res.json({ users: dbusers });
})


let port = 8083

app.listen(port, function() {

    console.log(`open link in the browser: server is  listening at http://localhost:${port}`)
})