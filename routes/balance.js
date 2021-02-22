const express = require('express');
const router = express.Router();

router.get('/balance', function(req, res) {
  res.render('balance', {title:"Ваш счёт"});
});

module.exports = router;
