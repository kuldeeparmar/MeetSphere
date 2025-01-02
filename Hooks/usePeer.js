import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";
import { useState,useRef,useEffect } from "react"

const usePeer = () => {
    const socket = useSocket();
    const [peer,setPeer] = useState(null);
    const [myId,setMyId] = useState('');
    const roomId = useRouter().query.roomid;

    const isPeerSet = useRef(false);

    useEffect(() => {
        if(isPeerSet.current || !socket || !roomId){
            return ;
        }


        isPeerSet.current = true;

        async function initPeer() {

            const myPeer = new (await import('peerjs')).default();
            setPeer(myPeer);

            myPeer.on('open', (id) => {
                setMyId(id);
                console.log('Peer id ',id);

                socket.emit('join-room',roomId,id)

                console.log(`${roomId}, ${id}`)
            })
        }

        initPeer();




    },[roomId, socket])

    return {peer,myId}

}


export default usePeer;

  