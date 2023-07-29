import {Server} from 'socket.io'
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)

const io = new Server(server , {
    cors :{
        origin: "*"
    }
})
type DrawLineProps = {
    color : string
    prevPoint : Point | null
    currentPoint : Point
}

type Point = {x : number , y : number}
/* 
    * socket => everyone but the sender
    * io => everyone in the server on same PORT
    * canvas state should not be sever side throttling problem *size of message is growing exponentially 
    * PROBLEM: if joining late new user (subscriber won't received old canvas state)
*/

io.on('connection' , (socket) =>{
    // the client establish a connection for draw line
    console.log("connection")
    // listening on messages being sent back to socket server 
    socket.on('draw-line' , ({prevPoint , currentPoint , color} : DrawLineProps)=>{
        socket.broadcast.emit('draw-line' , {prevPoint , currentPoint , color})
    })
    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
    socket.on('clear' , ()=>{
        io.emit('clear')
    })
})
server.listen(3001 , ()=>{
    // socket listening no need for client to be acitve to perform this action
    console.log('✔️ Server listening on port 3001')
})