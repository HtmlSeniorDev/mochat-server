
const express = require('express');
const router = express.Router();
const Avtoritets = require('../methods/avtoritet');

router.get('/chatportal', function(req, res) {
    const avtUsers = Avtoritets.SerializeBiggestAvtoritet()
    avtUsers.then((users)=> {
        res.render('chatportal', {
            title:"Чат портал",
            users
        });
    })
});

module.exports = router;
