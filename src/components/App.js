import { useState, useEffect } from "react";
import "../css/app.scss";
import Cadran from "./Cadran";
import Aiguille from "./Aiguille";
import Parametres from "./Parametres";
import Minuterie from "./Minuterie";
import Audio from "./Audio";

function App({ dureeInitiale }) {
    const [time, setTime] = useState(dureeInitiale * 60);
    const [duree, setDuree] = useState(dureeInitiale);
    const [isActive, setIsActive] = useState(false);
    const [isPause, setIsPause] = useState(false);

    if (isActive && time === 0) {
        setIsActive(!isActive);
    }
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive]);

    const changeDuree = (e) => {
        const d = e.target.value;
        e.preventDefault();
        if (!isActive) {
            if (d < 1 || d > 60) {
                setDuree(5);
            }
            setDuree(d);
            setTime(d * 60);
        }
    };
    const handleDemarrer = () => {
        setIsActive(true);
    };
    const handlePause = () => {
        setIsActive(false);
        setIsPause(true);
    };
    const handleAnnuler = () => {
        setIsActive(false);
        setIsPause(false);
        setTime(duree * 60);
    };
    const handleReprendre = () => {
        setIsActive(true);
        setIsPause(false);
    };

    return (
        <div className="minuterie-container">
            <div className="minuterie-wrapper">
                <Minuterie time={time} />
                <Cadran />
                <Aiguille time={time} />
            </div>
            <Parametres
                duree={duree}
                onChangeDuree={changeDuree}
                demarrer={handleDemarrer}
                pause={handlePause}
                annuler={handleAnnuler}
                reprendre={handleReprendre}
                isActive={isActive}
                isPause={isPause}
                time={time}
            />
            <Audio play={time === 0} reset={() => setTime(duree * 60)} />
            <p className="source">
                Créé par{" "}
                <i>
                    <a href="http://micetf.fr">MiCetF</a>
                </i>
            </p>
        </div>
    );
}

export default App;
