const { useEffect, useRef, useState } = require("react")

const useMediaPlayer = () => {

    const [stream,setStream] = useState(null);

    const isPlayingStream = useRef(false);

    useEffect(() => {
        if(isPlayingStream.current) return;

        isPlayingStream.current = true;

        async function initStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video : true,
                    audio : true,
                });
    
                setStream(stream)

                console.log("Navitor is established succesfully");
            }
            catch (e) {
                console.log("Error while establishing the navigator",e);
            }
        }

        initStream();
        
    },[])



    return {stream};
}

export default useMediaPlayer;