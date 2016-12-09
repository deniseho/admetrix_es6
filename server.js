var jsonServer = require('json-server')
var server = jsonServer.create()
var jsonFile = require('./db.json')
var middlwares = jsonServer.defaults()
var _ = require('lodash')
var bodyparser = require('body-parser')

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: true}));

server.use(middlewares);

server.post('/login', function(req, res){
    var fbResponse = req.body.fbResponse
    res.json({
        "accessToken": "test-token",
        "email": fbResponse.email,
        "id": fbResponse.id,
        "name": fbResponse.name,
        "picture": fbResponse.picture.data.url
    })
})
