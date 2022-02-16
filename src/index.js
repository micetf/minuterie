import "./css/app.scss";
var $tt = document.querySelector(".minuterie-container"),
    drawMinuterie = function(elt, angle) {
        var $minuterie = $tt.querySelector(elt),
            $svg = document.querySelector("#minuterie"),
            r = $minuterie.offsetWidth / 2,
            dy = r * Math.tan(((angle - 90) * Math.PI) / 180),
            points;
        if (angle < 180) {
            points = [
                [r, r].join(" "),
                [2 * r, r + dy].join(" "),
                [2 * r, 2 * r].join(" "),
                [0, 2 * r].join(" "),
                [0, 0].join(" "),
                [r, 0].join(" "),
            ].join(", ");
        }
        if (angle > 180) {
            points = [
                [r, r].join(" "),
                [0, r - dy].join(" "),
                [0, r].join(" "),
                [0, r].join(" "),
                [0, 0].join(" "),
                [r, 0].join(" "),
            ].join(", ");
        }
        if (angle === 0) {
            points = [
                [0, 0].join(" "),
                [2 * r, 0].join(" "),
                [2 * r, 2 * r].join(" "),
                [0, 2 * r].join(" "),
                [0, 0].join(" "),
            ].join(", ");
        }
        if (angle === 180) {
            points = [
                [0, 0].join(" "),
                [r, 0].join(" "),
                [r, 2 * r].join(" "),
                [0, 2 * r].join(" "),
                [0, 0].join(" "),
            ].join(", ");
        }
        if (angle === 360) {
            points = [
                [r, 0].join(" "),
                [r, r].join(" "),
                [r, 0].join(" "),
            ].join(", ");
        }

        if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
            $svg.getElementsByTagName("polygon")[0].setAttribute(
                "points",
                points
            );
            $minuterie.style["clip-path"] = "url(#minuterie)";
        } else {
            points = points.replace(/(-?[0-9.]+) (-?[0-9.]+)/g, "$1px $2px");
            $minuterie.style["-webkit-clip-path"] = "polygon(" + points + ")";
            $minuterie.style["-moz-clip-path"] = "polygon(" + points + ")";
            $minuterie.style["-ms-clip-path"] = "polygon(" + points + ")";
            $minuterie.style["clip-path"] = "polygon(" + points + ")";
        }
    },
    drawAiguille = function(t) {
        var $aiguille = $tt.querySelector(".aiguille"),
            s = (t % 60) * 6;
        $aiguille.style["-webkit-transform"] = "rotate(-" + s + "deg)";
        $aiguille.style["-ms-transform"] = "rotate(-" + s + "deg)";
        $aiguille.style.transform = "rotate(-" + s + "deg)";
        return s;
    },
    alarm = function() {
        $tt.querySelector(".audio").play();
    },
    $start = $tt.querySelector(".start"),
    $duree = $tt.querySelector(".duree"),
    initDuree = function() {
        if (document.location.hash.match(/^#[1-6]?[0-9]$/g)) {
            $duree.value = document.location.hash.slice(1);
        }
        return $duree.value;
    },
    tps = initDuree() * 60,
    timer;

$start.addEventListener("click", function() {
    if ($start.innerHTML === "GO !") {
        if (tps === 0) {
            tps = $duree.value * 60;
        }
        $start.innerHTML = "STOP !";
        $duree.setAttribute("disabled", "disabled");
        timer = setInterval(function() {
            tps -= 1;
            drawAiguille(tps);
            drawMinuterie(".minuterie", 360 - tps / 10);
            if (tps === 0) {
                $start.innerHTML = "GO !";
                $duree.removeAttribute("disabled");
                clearInterval(timer);
                alarm();
            }
        }, 1000);
    } else {
        $start.innerHTML = "GO !";
        $duree.removeAttribute("disabled");
        clearInterval(timer);
    }
});

$duree.addEventListener("change", function() {
    if ($duree.value < 1 || $duree.value > 60) {
        $duree.value = 5;
    }
    tps = $duree.value * 60;
    drawMinuterie(".minuterie", 360 - tps / 10);
    drawAiguille(tps);
});

window.onresize = () => drawMinuterie(".minuterie", 360 - tps / 10);

drawMinuterie(".minuterie", 360 - tps / 10);
