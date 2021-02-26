
const express = require('express');
const router = express.Router();
const RatingActions = require('../methods/avtoritet');
/**
 * Главный url чат портала
 * @return {HTMLBaseElement}
 */
router.get('/chatportal', function(req, res) {
  RatingActions.getBiggestAvtoritet().then(users => {
    res.render('chatportal', {
      title:"Чат портал",
      users
    });
  }).catch(e => e)

});

module.exports = router;
