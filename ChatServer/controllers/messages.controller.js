var MessagesModel     = require('./../models/messages');

module.exports.putMsg=(req, res) => {
    // use our bear model to find the bear we want
    MessagesModel.findById(req.params.msg_id, function(err, msg) {
        if (err)
            res.send(err);
        msg.senderId = req.body.senderId;
        msg.receiverId = req.body.receiverId;
        msg.messageText = req.body.messageText;
        msg.messageDate= req.body.messageDate;    
        // save the bear
        msg.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'message updated!' });
        });
    })
}

module.exports.postMsg=(req, res) => {
    var messages = new MessagesModel();      // create a new instance of the messages model
    /*{"id":1,"senderId":1,"receiverId":2,"messageText":"Hey there!!","messageTime":"Oct 20 12:10 Am"}*/ 
    messages.senderId = req.body.senderId;
    messages.receiverId = req.body.receiverId;
    messages.messageText = req.body.messageText;
    messages.messageTime= req.body.messageTime;
    // save the messages and check for errors
    console.log("message arrived through api",messages)
    messages.save(function(err) {
        if (err)
            res.send(err);
        res.json({ messages,status: 'messages created!' });
    });
}

module.exports.getMsg=(req, res) => {
    MessagesModel.findById(req.params.msg_id, function(err, msg) {
        if (err)
            return res.json("hello error here");
        console.log(msg)
        res.json({msg});
    });
    return
}

module.exports.getAllMsg=(req, res) => {
    MessagesModel.find(function(err, message_list) {
        if (err){
            res.send(err);
        }
        res.json(message_list);
        return
    });
}

module.exports.deleteMsg=(req, res) => {
    console.log(req.params.msg_id);
    MessagesModel.deleteOne({
        "_id": req.params.msg_id
    }, function(err, msg) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
        return
    });
}

module.exports.getAllMsgByUsr = (req, res) => {
    MessagesModel.find({"$or": [{
        "senderId": req.params.user_id
    }, {
        "receiverId": req.params.user_id
    }]}, function(err, message_list) {
        if (err)
            res.send(err);
        res.json(message_list);
        return
    });
}