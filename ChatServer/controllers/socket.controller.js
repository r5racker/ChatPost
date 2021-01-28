//db
var MessagesModel     = require('./../models/messages');
//socket io
const socketPort = 3010
const http = require('http')
const socketio = require('socket.io');
const messages = require('./../models/messages');
const { type } = require('os');
//socket handlers
function clientToServerHandler(msg)
{
    
}
ClientSockets={}
function initSocket(app){
    const server = http.createServer(app)  
    const io = socketio(server);
    io.on('connection',(newClientSocket) => {
        console.log("connection established")
        //ClientSockets.push(newClientSocket)
        newClientSocket.emit("MsgServerToClient","Hey there Welcome");
        newClientSocket.on('setClientId',(id) => {
            console.log("setClientId",id)
            newClientSocket.join(id)
            //newClientSocket.join("demo")
            console.log("client joined:",id)
            newClientSocket.emit("ClientConnected",{success:true});
        })
        newClientSocket.on("MsgClientToServer",(msg)=>{
            console.log("message received",msg)
            var messages = new MessagesModel();  
            messages.senderId=msg.senderId;
            messages.receiverId=msg.receiverId;
            messages.messageText=msg.messageText;
            messages.messageTime= msg.messageTime;
            messages.save(function(err) {
                if (err){
                    res.send(err);
                    newClientSocket.emit("MsgReceivedAck",{ status: 'error in message creation' });
                }
                else{
                    newClientSocket.emit("MsgReceivedAck",{ messages,status: 'messages created!' });
                    console.log("sending message to",messages.receiverId)
                    //newClientSocket.join(messages.receiverId)
                    //newClientSocket.broadcast.to(/*messages.receiverId*/"demo1").emit("MsgServerToClient",messages)
                    io.to(messages.receiverId).emit("MsgServerToClient",messages);
                    //newClientSocket.leave(messages.receiverId)
                }
            });
        });
    })
    server.listen(socketPort, () =>console.log('httpServer started at port:',socketPort));
}

module.exports.initSocket=initSocket