const express = require('express');
const app = express();
require('./mongoose');
const path = require('path');
const bodyParser = require("body-parser");
const indexRouter = require('./routes/index');
const avtoritetRouter = require('./routes/avtoritet');
const avtoritetBuyRouter = require('./routes/avtoritetBuy');
const balanceRouter = require('./routes/balance');
const chatportalRouter = require('./routes/chatportal');
const friendsRouter = require('./routes/friends');
const giftsRouter = require('./routes/gifts');
const gameRouter = require('./routes/game');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/', chatportalRouter);
app.use('/', avtoritetRouter);
app.use('/', avtoritetBuyRouter);
app.use('/', balanceRouter);
app.use('/', friendsRouter);
app.use('/', giftsRouter);
app.use('/', gameRouter);

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');