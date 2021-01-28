var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/*{"id":1,"senderId":1,"receiverId":2,"messageText":"Hey there!!","messageTime":"Oct 20 12:10 Am"}*/ 

var MessageSchema   = new Schema({ 
    senderId:String,
    receiverId:String,
    messageText: String,
    messageTime: Date
});

module.exports = mongoose.model('Messages', MessageSchema);