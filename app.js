const express = require('express');
const app = express();
const path = require('path');
require('./mongoose');

const indexRouter = require('./routes/index');
const avtoritetRouter = require('./routes/avtoritet');
const balanceRouter = require('./routes/balance');
const chatportalRouter = require('./routes/chatportal');
const friendsRouter = require('./routes/friends');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/',chatportalRouter);
app.use('/', avtoritetRouter);
app.use('/', balanceRouter);
app.use('/', friendsRouter)

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');