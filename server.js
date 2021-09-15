const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const botname="BOT";
const formatmessage = require("./utils/messages");
const {userJoin,getCurrentUser,userleaver,getroomuser} = require("./utils/users");
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:true}));
io.on("connection",function(socket){
    console.log("user connected :"+socket.id);
    
    socket.on('joinRoom',function({username,room}){
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);
        socket.emit("message",formatmessage(botname,"Welcome to the Chat Room"));
        socket.broadcast.to(user.room).emit("message",formatmessage(botname,`${user.username} has joined the chat`));
        io.to(user.room).emit("roomuser",{
            room:user.room,
            users:user.username
        });
        
    });
    
    socket.on("chatMessage",function(msg){
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit("message",formatmessage(user.username,msg));
    });
    socket.on("disconnect",function(){
        const user=userleaver(socket.id);
        if(user){
        io.to(user.room).emit("message",formatmessage(botname,`${user.username} has leave the room`));
        };
    });
});
server.listen(3000||process.env.PORT,function(){
    console.log("Server is Running Fine");
});