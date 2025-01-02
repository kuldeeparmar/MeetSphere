import { cloneDeep } from "lodash";

import { useState } from "react";

const usePlayer = (myId) => {
    const [player,setPlayer] = useState({}); 

    const playerCopy = cloneDeep(player);

    const highlightedPlayer = playerCopy[myId];

    delete playerCopy[myId];

    const nonHighlightedPlayer = playerCopy;



    return {player,setPlayer,highlightedPlayer,nonHighlightedPlayer};
}

export default usePlayer;