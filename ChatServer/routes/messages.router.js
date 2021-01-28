const express= require('express')
const router = express.Router();
const messagesCtrl = require('./../controllers/messages.controller')

const dbURI = 'mongodb://localhost:27017/ChatApp';
var mongoose   = require('mongoose');
mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true});
var MessagesModel     = require('./../models/messages');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our chat-api!' });   
});
router.route('/messages').post(messagesCtrl.postMsg).get(messagesCtrl.getAllMsg);
router.route('/messages/:msg_id').get(messagesCtrl.getMsg).put(messagesCtrl.putMsg).delete(messagesCtrl.deleteMsg);
router.route('/messages/getall/:user_id').get(messagesCtrl.getAllMsgByUsr);
module.exports=router