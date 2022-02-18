const Demarrer = ({ onClick }) => <button onClick={onClick}>Démarrer</button>;
const Pause = ({ onClick }) => <button onClick={onClick}>Pause</button>;
const Reprendre = ({ onClick }) => <button onClick={onClick}>Reprendre</button>;
const Annuler = ({ onClick }) => <button onClick={onClick}>Annuler</button>;
function Parametres({
    onChangeDuree,
    duree,
    demarrer,
    pause,
    annuler,
    reprendre,
    isActive,
    isPause,
    time,
}) {
    const handleDemarrer = (e) => {
        e.preventDefault();
        demarrer();
    };
    const handlePause = (e) => {
        e.preventDefault();
        pause();
    };
    const handleAnnuler = (e) => {
        e.preventDefault();
        annuler();
    };
    const handleReprendre = (e) => {
        e.preventDefault();
        reprendre();
    };
    return (
        <div className="parametres">
            <div className="input">
                <input
                    className="duree"
                    type="number"
                    value={duree}
                    max="60"
                    min="1"
                    onChange={onChangeDuree}
                    disabled={isActive && time !== 0 ? true : false}
                />
                <div>min</div>
            </div>
            <div className="btn">
                {!isActive && !isPause && time !== 0 && (
                    <Demarrer onClick={handleDemarrer} />
                )}
                {!isActive && isPause && (
                    <Reprendre onClick={handleReprendre} />
                )}
                {isActive && <Pause onClick={handlePause} />}
                {(isActive || isPause) && <Annuler onClick={handleAnnuler} />}
            </div>
        </div>
    );
}

export default Parametres;
