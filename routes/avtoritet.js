const Avtoritets =  require("../methods/avtoritet");

const express = require('express');
const router = express.Router();

router.get('/avtoritet', function(req, res) {
  const avtUsers = Avtoritets.SerializeBiggestAvtoritet()
  avtUsers.then((users)=> {
    res.render('avtoritet', {
      title:"Авторитеты",
      users
    });
  })
});

module.exports = router;
