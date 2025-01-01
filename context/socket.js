import { io } from "socket.io-client";

import { useEffect,useState,createContext,useContext } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
    // console.log("kuldeep")
    const socket = useContext(SocketContext);
    // console.log(socket);
    return socket;
}

export const SocketProvider = (props) => {
    const { children } = props

    const [socket , setSocket] = useState(null)

    useEffect(() => {
        // console.log("kuldeep")
        const connection = io();
        console.log("socket connection",connection)
        setSocket(connection)

    },[])

    socket?.on('connect_error', async (err) => {
        console.log("Error establishing connection",err)
        await fetch('/api/socket')
    })

    return (
        <SocketContext.Provider value={socket} > {children} </SocketContext.Provider>
    );

}