import { STATS } from "../app.js"

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let cWidth = 1000;
let cHeight = 600;


export function drawBackground() {
    //Fills the background with black
    ctx.save();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 800)
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
export function drawMoney() {
    //Text drawn at the bottom of the screen
    ctx.save();
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`$     ${STATS.Money}`, cWidth / 2 - 100, cHeight - 20);
    ctx.restore();
}

export function drawEarnings() {
    //Text drawn above money at the bottom of the screen
    ctx.save();
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`$/s: ${STATS.Earnings}`, cWidth / 2 - 100, cHeight - 60);
    ctx.restore();
}

export function drawEntropy(entropy) {
    ctx.save();
    //Huge font
    ctx.font = "240px Arial";

    //Figure out how tall the letter is going to be
    let letterHeight = ctx.measureText("E").fontBoundingBoxAscent;

    //Vertical extents of gradient (top is brute forced to align correctly [see +45])
    let gradientBottom = cHeight - 60;
    let gradientTop = gradientBottom - letterHeight + 45;
    let gradient = ctx.createLinearGradient(0, gradientBottom, 0, gradientTop);

    //Create a sharp split at the entropy fraction as a "meter"
    gradient.addColorStop(0, "white");
    gradient.addColorStop(entropy, "white");
    gradient.addColorStop(Math.min(1.0, entropy + 0.00000001), "#333e5b");
    gradient.addColorStop(1, "#333e5b");
    ctx.fillStyle = gradient;

    //Draw
    ctx.fillText("E", 60, gradientBottom);
    ctx.restore();
}

export function drawSatisfaction(satisfaction) {
    ctx.save();
    
    //Prewrite dimensions of circle (for ease of calculations)
    let centerX = cWidth - 150;
    let centerY = cHeight - 150;
    let radius = 100;

    //Vertical extents of gradient
    let gradientBottom = centerY + radius;
    let gradientTop = centerY - radius;
    let gradient = ctx.createLinearGradient(0, gradientBottom, 0, gradientTop);

    //Create a sharp split at the satisfaction fraction as a "meter"
    gradient.addColorStop(0, "white");
    gradient.addColorStop(satisfaction, "white");
    gradient.addColorStop(Math.min(1.0, satisfaction + 0.00000001), "black");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;

    ctx.strokeStyle = "#333e5b";
    ctx.lineWidth = 5;
    //Draw base circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /*
    ctx.fillStyle = "black";
    //Left Eye
    ctx.beginPath();
    ctx.arc(centerX - (radius / 3), centerY - (radius / 3), 10,  0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    */
    drawCircle(centerX - (radius / 3), centerY - (radius / 3), 10, "black");

    //Right Eye
    /*
    ctx.beginPath();
    ctx.arc(centerX + (radius / 3), centerY - (radius / 3), 10,  0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    */
    drawCircle(centerX + (radius / 3), centerY - (radius / 3), 10, "black");

    ctx.strokeStyle = "black";
    //Smile
    ctx.beginPath();
    ctx.arc(centerX, centerY + (radius / 5), 50,  Math.PI * .125, Math.PI * .875);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

export function drawFlower(petals, variable, rotation, color = "red") {
    let n = 0;
    //let c = 4;
    let divergence = 137.5 + variable;
    let counter = 4;
    let increment = 0.01;
    let petalCount = petals;
    let centerX = cWidth / 2;
    let centerY = cHeight / 2;

    for (let i = 0; i < petalCount; i++) {
        counter += increment;
        
        let angle = n * dtr(divergence);
        let radius = counter * Math.sqrt(Math.abs(n));

        let x = radius * Math.cos(angle + rotation) + centerX;
        let y = radius * Math.sin(angle + rotation) + centerY;

        drawCircle(x, y, 2, color);

        n--;
    }

}

function dtr(degrees) {
    return degrees * (Math.PI/180);
}

function drawCircle(x, y, radius, color = "black") {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}