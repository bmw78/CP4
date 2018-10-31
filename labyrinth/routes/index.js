var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/highscore', function(req, res) {
  console.log("In Highscore");
  res.send(highscore);
});

router.post('/highscore', function(req, res) {
    console.log("In Highscore Post");
    console.log(req.body);
    highscore.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

module.exports = router;

var highscore = [
  /*{
    name: 'Legolas',
    time: '0:01'
  },
  {
    name: 'H4ck3r1337',
    time: '1:30'
  },
  {
    name: 'SlowBro',
    time: '99:59'
    
  },
  {
    name: 'Gimli',
    time: '1:28'
  }*/
  {
    name: 'Legolas',
    time: '1'
  },
  {
    name: 'H4ck3r1337',
    time: '30'
  },
  {
    name: 'SlowBro',
    time: '9959'
    
  },
  {
    name: 'Gimli',
    time: '28'
  }
];
