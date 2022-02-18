function Aiguille({ time }) {
    const s = (time % 60) * 6;

    const transform = "rotate(-" + s + "deg)";
    const style = {
        WebkitTransform: transform,
        MsTransform: transform,
        transform,
    };
    return <div style={style} className="aiguille"></div>;
}

export default Aiguille;
