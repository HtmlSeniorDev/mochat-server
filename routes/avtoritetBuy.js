const express = require('express');
const router = express.Router();
const RatingActions = require('../methods/avtoritet');
const BalanceActions = require('../methods/balance');
router.get('/avtoritet-buy', function(req, res) {
    res.render('avtoritet-buy', {
      title:"Покупка авторитета",
    });
});

router.post('/avtoritet-buy', function(req, res) {
  const data = req.body
  const userId = data.userId
  const counts = data.price
  const isBalanceAllowed = BalanceActions.checkBalance(userId, counts)
  isBalanceAllowed.then((r) => {
    if (r.allowed) {
      RatingActions.buyAvtoritet(userId, +counts)
      res.json({
        redirect: '/avtoritet'
      });
    } else {
      res.json({
        enoughBalance:true,
        redirect: '/avtoritet'
      })
    }
  })
    .catch(e => res.sendStatus(400))
} )

module.exports = router;
