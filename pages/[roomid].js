import { useSocket } from "@/context/socket";
import  usePeer  from "@/Hooks/usePeer";

const Room = () => {
  const socket = useSocket();
  const {peer,myId} = usePeer();
}

export default Room;