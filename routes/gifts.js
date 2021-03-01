const express = require('express');
const router = express.Router();

router.get('/gifts', function(req, res) {
  res.render('gifts',{title:"Подарки"});
});

module.exports = router;
