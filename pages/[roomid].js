import { useSocket } from "@/context/socket";
import  usePeer  from "@/Hooks/usePeer";
import useMediaPlayer from "@/Hooks/useMediaPlayer";
import Player from "@/components/Player";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Room = () => {
  const socket = useSocket();
  const {peer,myId} = usePeer();
  const {stream} = useMediaPlayer();
  const  router = useRouter();
  const roomId = router.query.roomid;

  useEffect(() => {
    if(!socket || !peer) return;

    const handleConnection = (userId) => {
      console.log(`user connected with userId ${userId}`);
    }


    socket.on('user-connected',handleConnection)

    return () => {
      socket.off("user-connected", handleUserConnected);
    };

  },[peer, socket])

  return (
    
      <Player stream={stream} playing muted playerId = {myId}/>
    
  );
}

export default Room;