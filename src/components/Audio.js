import { useRef, useState, useEffect } from "react";
import mp3Stop from "../audio/stop.mp3";
import oggStop from "../audio/stop.ogg";

function Audio({ play, reset }) {
    const refAudio = useRef(null);

    useEffect(() => {
        const audio = refAudio.current;
        if (play) {
            audio.play();
            audio.addEventListener("ended", reset);
        }
        return () => audio.removeEventListener("ended", reset);
    }, [play]);

    return (
        <audio ref={refAudio} className="audio">
            <source src={mp3Stop} type="audio/mpeg"></source>
            <source src={oggStop} type="audio/ogg"></source>
        </audio>
    );
}

export default Audio;
