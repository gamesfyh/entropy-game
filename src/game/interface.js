import {TYPES, unlock, buy} from "../app.js";

export const UI = {
    "Unlock": {
        "Wood": 0,
        "Coal": 0,
        "Wind": 0,
        "Solar": 0,
        "Nuclear": 0,
        "Dyson": 0
    },
    "Buy": {
        "Wood": 0,
        "Coal": 0,
        "Wind": 0,
        "Solar": 0,
        "Nuclear": 0,
        "Dyson": 0
    }
}

UI.Unlock.Wood = document.querySelector("#btnUnlWood");
UI.Buy.Wood = document.querySelector("#btnBuyWood");

UI.Unlock.Coal = document.querySelector("#btnUnlCoal");
UI.Buy.Coal = document.querySelector("#btnBuyCoal");

UI.Unlock.Wind = document.querySelector("#btnUnlWind");
UI.Buy.Wind = document.querySelector("#btnBuyWind");

UI.Unlock.Solar = document.querySelector("#btnUnlSolar");
UI.Buy.Solar = document.querySelector("#btnBuySolar");

UI.Unlock.Nuclear = document.querySelector("#btnUnlNuclear");
UI.Buy.Nuclear = document.querySelector("#btnBuyNuclear");

UI.Unlock.Dyson = document.querySelector("#btnUnlDyson");
UI.Buy.Dyson = document.querySelector("#btnBuyDyson");

UI.Unlock.Wood.onclick = (e) => { if (!e.target.getAttribute("disabled")) unlock("Wood"); }
UI.Buy.Wood.onclick = (e) => { if (!e.target.getAttribute("disabled")) buy("Wood"); }

UI.Unlock.Coal.onclick = (e) => { if (!e.target.getAttribute("disabled")) unlock("Coal"); }
UI.Buy.Coal.onclick = (e) => { if (!e.target.getAttribute("disabled")) buy("Coal"); }

UI.Unlock.Wind.onclick = (e) => { if (!e.target.getAttribute("disabled")) unlock("Wind"); }
UI.Buy.Wind.onclick = (e) => { if (!e.target.getAttribute("disabled")) buy("Wind"); }

UI.Unlock.Solar.onclick = (e) => { if (!e.target.getAttribute("disabled")) unlock("Solar"); }
UI.Buy.Solar.onclick = (e) => { if (!e.target.getAttribute("disabled")) buy("Solar"); }

UI.Unlock.Nuclear.onclick = (e) => { if (!e.target.getAttribute("disabled")) unlock("Nuclear"); }
UI.Buy.Nuclear.onclick = (e) => { if (!e.target.getAttribute("disabled")) buy("Nuclear"); }

UI.Unlock.Dyson.onclick = (e) => { if (!e.target.getAttribute("disabled")) unlock("Dyson"); }
UI.Buy.Dyson.onclick = (e) => { if (!e.target.getAttribute("disabled")) buy("Dyson"); }

console.log("Interface Loaded");