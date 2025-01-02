import { Server } from 'socket.io'

const SocketHandler = (req,res) => {

    if(res.socket.server.io) {
        console.log("Socket is already running")
    }
    else {
        
        console.log("Initializing the socket")
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection',(socket) => {

            console.log('New client connected',socket.id)


            socket.on('join-room',(roomId,userId) => {
                console.log(`a new user with userId ${userId} join the roomId ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-connected',userId);
            })

            socket.on('disconnect',() => {
                console.log('Client disconnected',socket.id)
            })
        })
    }

    res.end();

}

export default SocketHandler;