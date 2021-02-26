const RatingActions = require('../methods/avtoritet');

const express = require('express');
const router = express.Router();
const url = require('../config')

router.get('/avtoritet', function(req, res) {
  RatingActions.getBiggestAvtoritet().then(users => {
    res.render('avtoritet', {
      title:"Авторитеты",
      photo_url:url.PHOTO_URL,
      users
    });
  })
});

module.exports = router;
