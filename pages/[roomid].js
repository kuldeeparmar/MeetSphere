import { useSocket } from "@/context/socket";
import usePeer from "@/Hooks/usePeer";
import useMediaPlayer from "@/Hooks/useMediaPlayer";
import Player from "@/components/Player";
import { useEffect } from "react";
import { useRouter } from "next/router";
import usePlayer from "@/Hooks/usePlayer";
import styles from "../styles/room.module.css"

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaPlayer();
  const router = useRouter();
  const roomId = router.query.roomid;
  const { player, setPlayer, highlightedPlayer, nonHighlightedPlayer } = usePlayer(myId);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleConnection = (userId) => {
      console.log(`user connected with userId ${userId}`);

      const call = peer.call(userId, stream);

      call.on("stream", (incommingStream) => {
        console.log(`incommingStream from userId ${userId}`);

        setPlayer((prev) => ({
          ...prev,
          [userId]: {
            url: incommingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    };

    socket.on("user-connected", handleConnection);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayer, socket, stream]);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call) => {
      const { peer: callerId } = call;

      call.answer(stream);

      call.on("stream", (incommingStream) => {
        console.log(`stream of userId ${callerId}`);

        setPlayer((prev) => ({
          ...prev,
          [callerId]: {
            url: incommingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    });
  }, [peer, setPlayer, stream]);

  useEffect(() => {
    if (!stream || !myId) return;

    setPlayer((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayer, stream]);

  return (
    <>

      <div className={styles.activePlayerContainer}>

        {   highlightedPlayer && 

            <Player
              stream={highlightedPlayer.url}
              playing={highlightedPlayer.playing}
              muted={highlightedPlayer.muted}
              isActive = {true}
            />
        }
      </div>
      
      <div className={styles.inActivePlayerContainer}>
        {Object.keys(nonHighlightedPlayer).map((playerId) => {
          const { url, muted, playing } = player[playerId];

          return (
            <Player
              stream={url}
              playing={playing}
              muted={muted}
              key={playerId}
              isActive = {false}
            />
          );
        })}
      </div>
    </>
  );
};

export default Room;
