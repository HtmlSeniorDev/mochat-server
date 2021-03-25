const express = require('express');
const router = express.Router();

router.get('/game', function(req, res) {
  res.render('game',{title:"Подарки"});
});

module.exports = router;
