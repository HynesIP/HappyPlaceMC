var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var cors=require("cors");
server.listen(8083,function(req,res){
    console.log("Listening on port 8083");
});

io.origins('*:*');
var users=0;

io.on('connection',function(socket){
    console.log("Request server connected");

    socket.on('disconnect',function(socket){
        console.log("Request server disconnected")
    })

    //join room
    socket.on('join',function(data){
 
        //Display the number of Builders in room 
        users+= (users < 0) ? 0 : 1;
        console.log(users)
        io.sockets.emit('Builder count',{count:users +' builders joined '});
        //end

        // user joining the particular room
        socket.join(data.room)
      
        console.log(data.user + ' started a ' +data.room +' build request.' )

       //inform other on the room about event
       socket.broadcast.to(data.room).emit('Builder started a request',{user:data.user,message:" has started a build request. "});
      

    });

    //leave room
    socket.on('leave',function(data){
        //number of users in room
        users--
        io.sockets.emit('usercount',{count:'' +users})
        console.log(users)
        //end

        console.log(data.user + " is done with " +data.room+ " build request.")
        socket.broadcast.to(data.room).emit('Done with build request',{user:data.user,message:" is done with a build request. "});
        socket.leave(data.room)
        
    })

    //sending message
    socket.on('message',function(data){
        io.in(data.room).emit('new request',{user:data.user,message:data.message})
    })

    

})

module.exports = router;