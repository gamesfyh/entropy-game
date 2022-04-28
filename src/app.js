import * as cv from "./game/canvas.js";
import { UI } from "./game/interface.js";

//Pseudo-enum to simplify communication between this file and others
export const TYPES = {
    "Wood": 1,
    "Coal": 2,
    "Wind": 3,
    "Solar": 4,
    "Nuclear": 5,
    "Dyson": 6
}

//Set game FPS
let fps = 60;

//Holds mostly changing data about the game's condition
export const STATS = {
    "Entropy": {
        "Wood": {
            "UPrice" : 100,
            "BPrice": 5,
            "Unlocked": "no",
            "PoolSize": 300,
            "Remaining": 300,
            "EarnRate": 2,
            "Owned": 0,
            "Harm": 3
        }, 
        "Coal": {
            "UPrice" : 200,
            "BPrice": 25,
            "Unlocked": "no",
            "PoolSize": 800,
            "Remaining": 800,
            "EarnRate": 5,
            "Owned": 0,
            "Harm": 10
        }, 
        "Wind": {
            "UPrice" : 400,
            "BPrice": 150,
            "Unlocked": "no",
            "PoolSize": 1500,
            "Remaining": 1500,
            "EarnRate": 6,
            "Owned": 0,
            "Harm": 1
        }, 
        "Solar": {
            "UPrice" : 500,
            "BPrice": 170,
            "Unlocked": "no",
            "PoolSize": 2000,
            "Remaining": 2000,
            "EarnRate": 5,
            "Owned": 0,
            "Harm": 1
        }, 
        "Nuclear": {
            "UPrice" : 10000,
            "BPrice": 5000,
            "Unlocked": "no",
            "PoolSize": 10000,
            "Remaining": 10000,
            "EarnRate": 750,
            "Owned": 0,
            "Harm": 0
        }, 
        "Dyson": {
            "UPrice" : 750000,
            "BPrice": 350000,
            "Unlocked": "no",
            "PoolSize": 250000,
            "Remaining": 250000,
            "EarnRate": 100000,
            "Owned": 0,
            "Harm": 0
        }
    },
    "Satisfaction": 1,
    "Money": 100,
    "Earnings": 0,
    "Score": 0
}

let lastTime = 0;
let dt = 0;
let paused = false;
let increment = 2.0;
let counter = 0.0;

let multiplier = 5;
let flowerCounter = 0;
let flowerIncrement = 0.02;
let flowerBound = 5;
let angleOffset = 0;

//Init
//window.onload
let init = () => {
    window.onblur = () => { 
        //paused = true; 
    }
    window.onfocus = () => { 
        /*paused = false; 
        aLoop(); 
        uLoop();*/
    }
    aLoop();
    uLoop();
}

init();

//Performs calculations and draws repeatedly at the specified framerate
function aLoop(time = 0) {
    requestAnimationFrame(aLoop);
    dt = (time - lastTime) / 1000;
    dt = Math.min(Math.max(dt, 1/144), 1/12);
    lastTime = time;
    counter += dt;
    if (counter > increment) {
        counter -= counter;
        
    }
    //console.log("Frame");
    update();
    draw();
}

function uLoop() {
    setTimeout(uLoop, 1000);
    earn();
}

function update() {
    checkButtonUsable();
}

//Make sure only the buttons that the player should be able to press are enabled
function checkButtonUsable() {
    //For every energy source:
    for (let type in STATS.Entropy) {
        //If it is not unlocked:
        if (STATS.Entropy[`${type}`].Unlocked == "no") {
            //Only enable the unlock button if the player can afford it
            if (STATS.Entropy[`${type}`].UPrice <= STATS.Money) {
                UI.Unlock[`${type}`].removeAttribute("disabled");
            }
            else {
                UI.Unlock[`${type}`].setAttribute("disabled", "disabled");
            }
            //Disable the buy button
            UI.Buy[`${type}`].setAttribute("disabled", "disabled");
        }
        //If it is unlocked:
        else {
            //Disable the unlock button
            UI.Unlock[`${type}`].setAttribute("disabled", "disabled");
            //Only enable the buy button if the player can afford it
            if (STATS.Entropy[`${type}`].BPrice <= STATS.Money) {
                UI.Buy[`${type}`].removeAttribute("disabled");
            }
            else {
                UI.Buy[`${type}`].setAttribute("disabled", "disabled");
            }
        }
        
    }
}

function draw() {
    cv.drawBackground();
    cv.drawMoney();
    cv.drawEarnings();

    //Add up the remaining entropy and the maximum unlocked pool values
    let amount = 0;
    let pool = 0;
    for (let type in STATS.Entropy) {
        if (STATS.Entropy[`${type}`].Unlocked != "no") {
            amount += STATS.Entropy[`${type}`].Remaining;
            pool += STATS.Entropy[`${type}`].PoolSize;
        }
    }
    let entropy = 0;

    //Calculate the fraction of entropy (current / capacity), avoiding divide by zero
    if (pool == 0) {
        entropy = 0;
    }
    else {
        entropy = amount / pool;
    }

    //Draw a big E that is colored like a meter
    cv.drawEntropy(entropy);

    console.log(flowerCounter);
    //cv.drawFlower(250, flowerCounter, angleOffset);
    //Draw one flower for each energy source
    cv.drawFlower(STATS.Entropy.Wood.Owned * STATS.Entropy.Wood.EarnRate * multiplier, flowerCounter, angleOffset, "brown");
    cv.drawFlower(STATS.Entropy.Coal.Owned * STATS.Entropy.Coal.EarnRate * multiplier, flowerCounter, angleOffset + 2, "grey");
    cv.drawFlower(STATS.Entropy.Wind.Owned * STATS.Entropy.Wind.EarnRate * multiplier, flowerCounter, angleOffset + 4, "white");
    cv.drawFlower(STATS.Entropy.Solar.Owned * STATS.Entropy.Solar.EarnRate * multiplier, flowerCounter, angleOffset + 6, "blue");
    cv.drawFlower(STATS.Entropy.Nuclear.Owned * STATS.Entropy.Nuclear.EarnRate * multiplier, flowerCounter, angleOffset + 8, "yellow");
    cv.drawFlower(STATS.Entropy.Dyson.Owned * STATS.Entropy.Dyson.EarnRate * multiplier, flowerCounter, angleOffset + 10, "lightblue");

    //Increment
    angleOffset += .02;
    flowerCounter += flowerIncrement;
    //"Bounce" the counter
    if (Math.abs(flowerCounter) > flowerBound) {
        flowerCounter = Math.abs(flowerCounter) / flowerCounter * flowerBound;
        flowerIncrement = -1 * flowerIncrement;
    }

    cv.drawSatisfaction(STATS.Satisfaction);
}

//Handles unlocking a new energy type. Should be responsible for checking available money and safeguarding against repeat unlocks.
export function unlock(type) {
    console.log(`Unlocked ${type}`);
    STATS.Money -= STATS.Entropy[`${type}`].UPrice;
    STATS.Entropy[`${type}`].Unlocked = "yes";
    buy(type, true)
    UI.Unlock[`${type}`].innerHTML = "Unlocked";
}

//Handles buying an energy generator. Should be responsible for checking available money
export function buy(type, isFree = false) {
    console.log(`Bought ${type}`);
    if (!isFree) {
        STATS.Money -= STATS.Entropy[`${type}`].BPrice;
    }
    STATS.Entropy[`${type}`].Owned += 1;
    UI.Buy[`${type}`].innerHTML = `Purchase ($${STATS.Entropy[`${type}`].BPrice}) [${STATS.Entropy[`${type}`].Owned}]`
    STATS.Earnings += STATS.Entropy[`${type}`].EarnRate;
}

function earn() {
    //Add to the amount of money the rate of earning
    STATS.Money += STATS.Earnings;
    //Subtract entropy
    for (let type in STATS.Entropy) {
        let source = STATS.Entropy[`${type}`];
        if (source.Unlocked != "no") {
            source.Remaining -= STATS.Entropy[`${type}`].Owned;
        }
        //If entropy is exhausted, prevent energy generation BUT DO THIS BETTER THAN I HAVE JUST NOW
        if (source.Remaining < 0) {
            //Prevent below-zero issues
            source.Remaining = 0;

            //Prevent earning
            STATS.Earnings -= source.EarnRate * source.Owned;

            //Prevent any issues with "reanimating" source from the dead
            source.EarnRate = 0;
            source.Owned = 0;
            source.BPrice = 999999999999999;

            UI.Buy
        }
    }
}

console.log("App Loaded");