import { useState, useEffect } from "react";
const getPoints = (angle) => {
    const r = document.querySelector(".minuterie").offsetWidth / 2;
    const dy = r * Math.tan(((angle - 90) * Math.PI) / 180);
    if (angle < 180) {
        return [
            [r, r].join(" "),
            [2 * r, r + dy].join(" "),
            [2 * r, 2 * r].join(" "),
            [0, 2 * r].join(" "),
            [0, 0].join(" "),
            [r, 0].join(" "),
        ].join(", ");
    }
    if (angle > 180) {
        return [
            [r, r].join(" "),
            [0, r - dy].join(" "),
            [0, r].join(" "),
            [0, r].join(" "),
            [0, 0].join(" "),
            [r, 0].join(" "),
        ].join(", ");
    }
    if (angle === 0) {
        return [
            [0, 0].join(" "),
            [2 * r, 0].join(" "),
            [2 * r, 2 * r].join(" "),
            [0, 2 * r].join(" "),
            [0, 0].join(" "),
        ].join(", ");
    }
    if (angle === 180) {
        return [
            [0, 0].join(" "),
            [r, 0].join(" "),
            [r, 2 * r].join(" "),
            [0, 2 * r].join(" "),
            [0, 0].join(" "),
        ].join(", ");
    }
    if (angle === 360) {
        return [[r, 0].join(" "), [r, r].join(" "), [r, 0].join(" ")].join(
            ", "
        );
    }
};

const FirefoxMinuterie = ({ time }) => {
    const [points, setPoints] = useState("");
    useEffect(() => {
        setPoints(getPoints(360 - time / 10));
    }, [time]);
    return (
        <>
            <div
                className="minuterie"
                style={{ clipPath: "url(#minuterie)" }}
            ></div>
            <svg width="0" height="0">
                <clipPath id="minuterie">
                    <polygon points={points}></polygon>
                </clipPath>
            </svg>
        </>
    );
};
const OtherMinuterie = ({ time }) => {
    const [points, setPoints] = useState("");
    useEffect(() => {
        setPoints(
            getPoints(360 - time / 10).replace(
                /(-?[0-9.]+) (-?[0-9.]+)/g,
                "$1px $2px"
            )
        );
    }, [time]);
    const polygon = `polygon(${points})`;
    return (
        <div
            style={{
                WebkitClipPath: polygon,
                MozClipPath: polygon,
                clipPath: polygon,
            }}
            className="minuterie"
        ></div>
    );
};
function Minuterie({ time }) {
    return navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? (
        <FirefoxMinuterie time={time} />
    ) : (
        <OtherMinuterie time={time} />
    );
}

export default Minuterie;
