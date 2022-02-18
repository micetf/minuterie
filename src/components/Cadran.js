function Cadran() {
    return (
        <div className="cadran">
            {Array.from({ length: 60 }, (v, i) => (
                <div key={i} className="graduation"></div>
            ))}
        </div>
    );
}

export default Cadran;
