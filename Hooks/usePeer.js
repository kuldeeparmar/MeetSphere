import { useState,useRef,useEffect } from "react"

const usePeer = () => {
    const [peer,setPeer] = useState(null);
    const [myId,setMyId] = useState('');

    const isPeerSet = useRef(false);

    useEffect(() => {
        if(isPeerSet.current == true){
            return ;
        }

        isPeerSet.current = true;

        async function initPeer() {

            const myPeer = new (await import('peerjs')).default();
            setPeer(myPeer);

            myPeer.on('open', (id) => {
                setMyId(id);
                console.log('Peer id ',id);
            })
        }

        initPeer();

    },[])


    return {peer,myId}

}


export default usePeer;

  