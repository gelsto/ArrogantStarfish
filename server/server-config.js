var express = require('express');
var app = express();
var path = require('path');
var Query = require('../db/query');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.post('/query', function(req, res) {
  var newQuery = new Query({
    user: req.body.user,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    keyword: req.body.keyword,
    datetime: new Date(),
    message: req.body.message
  });

  newQuery.save(function(err, newQuery) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      Query.find({keyword: req.body.keyword}).exec(function(err, queries) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          res.status(200);
          res.send(queries);
        }
      });
    }
  });
});

module.exports = app;