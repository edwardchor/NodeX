var express = require('express');
var router = express.Router();

router.use('/api', require(__base + 'api'));
router.use('/mock', require(__base +  'mock'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
