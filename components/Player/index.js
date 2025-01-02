import ReactPlayer from "react-player";

const Player = (props) => {
    const {stream, playing, muted, playerId } = props;

    return (
        <div>
            <ReactPlayer url={stream} playing = { playing } muted = {muted} key = {playerId}/>
        </div>
    );
}

export default Player;