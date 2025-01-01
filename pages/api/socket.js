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

            socket.on('disconnect',() => {
                console.log('Client disconnected',socket.id)
            })
        })
    }

    res.end();

}

export default SocketHandler;