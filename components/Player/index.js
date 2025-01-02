import ReactPlayer from "react-player";
import cx from 'classnames'
import styles from './index.module.css'

const Player = (props) => {
  const { stream, playing, muted, isActive } = props;



  return (
    <div  className={cx(styles.playerContiner,{ [styles.active] : !isActive },
        {[styles.notActive] : !isActive })}>

      <ReactPlayer url={stream} playing={playing} muted={muted} width="100%" height="100%"/>
    </div>
  );
};

export default Player;
