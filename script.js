var MIC;
var HIGH_LEVEL;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    MIC = new p5.AudioIn();
    MIC.start();
    HIGH_LEVEL = 0;
}


function draw() {
    // background setting
    background(245, 245, 250);
    // draw a ground
    fill(0, 170, 255);
    noStroke();
    rect(0, height - 100, width, 100);
    
    // Get the overall volume (between 0 and 1.0)
    let vol = MIC.getLevel();
    console.log(vol);
    
    // Draw a rectangle with height based on volume
    let h = map(vol, 0, 1, 0, height);
    
    if (HIGH_LEVEL < h) {
        HIGH_LEVEL = h;
    }
    fill(255, 255, 0);
    rect(width/2 - 25, height - 100, 50, -HIGH_LEVEL);
    
    // visualize live volume
    fill(255, 170, 0);
    rect(width/2 - 25, height - 100, 50, -h);
}


function keepHighest() {}
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }