const http = require('http')

const events = require('events')
const eventEmitter = new events.EventEmitter()


const server = http.createServer( function (req,res){
    eventEmitter.emit('test event')
    res.end("hello world")
});

server.listen(3000,()=> console.log("server started"));

eventEmitter.on('test event',() => {
    console.log("test event received");
});