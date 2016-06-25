var app = require("express")();
var server = require('http').createServer(app);
server.listen(process.env.PORT || 80);
var io = require('socket.io')(server);
var user = [];
var connection = [];


app.get('/',function(req,res){
   res.sendFile(__dirname+'/index.html'); 
});
app.get('/login',function(req,res){
    res.sendFile(__dirname+"/login.html");
});

io.on("connection",function(socket){
    socket.emit('connection','some one is connection');
    socket.on('new message',function(data){
        console.log(data);
        io.emit('message',data);
    });
    socket.on('disconnect',function(){
        io.emit('disconnect','some one is disconnect');
    });
});
