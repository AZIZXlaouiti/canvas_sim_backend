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
type DrawLine = {
    color : string
    prevPoint : Point | null
    currentPoint : Point
}

type Point = {x : number , y : number}
io.on('connection' , (socket) =>{
    // the client establish a connection for draw line
    socket.on('draw-line' , ({prevPoint , currentPoint , color} : DrawLine)=>{
        socket.broadcast.emit('draw-line' , {prevPoint , currentPoint , color})
    })
})
server.listen(3001 , ()=>{
    console.log('listening on 3001')
})