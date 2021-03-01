const express = require('express');
const router = express.Router();

router.get('/balance', function(req, res) {
  res.render('balance', {title:"Ваш счёт"});
});

router.get('/balance-mobile', function(req, res) {
  res.render('balance-mobile', {title:"Мобильный счёт"});
});
module.exports = router;
