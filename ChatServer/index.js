const portNo= process.env.PORT || 3000
/*database */
const dbURI = 'mongodb://localhost:27017/ChatApp';
var mongoose   = require('mongoose');
mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true});

const express = require('express')
const app= express()
const cors = require('cors');
const bodyParser = require('body-parser');
const socketCtrl = require('./controllers/socket.controller')

const messagesRouter = require('./routes/messages.router')
const userRouter = require('./routes/user.router')
//socket was here

socketCtrl.initSocket(app);
app.use(cors());
app.use(express.static('public'))
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ROUTES FOR OUR API
// REGISTER OUR ROUTES -------------------------------
app.use('/chat-api', messagesRouter);
app.use('/user', userRouter);
// START THE SERVER
app.listen(portNo);
console.log('chat-server ready on port ' + portNo);