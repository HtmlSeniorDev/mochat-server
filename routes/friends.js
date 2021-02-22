const express = require('express');
const router = express.Router();

router.get('/friends', function(req, res) {
  res.render('friends',{title:"Друзья"});
});

module.exports = router;
