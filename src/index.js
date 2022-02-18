import { render } from "react-dom";
import App from "./components/App";

const hash = document.location.hash;
const duree = hash.match(/^#[1-6]?[0-9]$/g) ? hash.slice(1) : 5;
const uri = window.location.toString();

if (uri.indexOf("#") > 0) {
    const clean_uri = uri.substring(0, uri.indexOf("#"));
    window.history.replaceState({}, document.title, clean_uri);
}

render(<App dureeInitiale={duree} />, document.querySelector("#app"));
