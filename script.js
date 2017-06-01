var MIC;
var HIGH_LEVEL;
var TOP_POINT;
var BELL_FILL;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    MIC = new p5.AudioIn();
    MIC.start();
    
    HIGH_LEVEL = 0;
    TOP_POINT = 300;
    BELL_FILL = 0;
}

function draw() {
    // background setting
    background(240);
    noStroke();
    // draw a ground
    fill(0, 170, 255);
    rect(0, height - 100, width, 100);    
    // level container
    fill(255);
    rect(width/2 - 25, height - 100, 50, -TOP_POINT);
    
    
    // Get the overall volume (between 0 and 1.0)
    let vol = MIC.getLevel();
    console.log(vol);
    
    // VISUALIZOR starts here
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
    
    // bell
    
    fill(BELL_FILL);
    
    // time control by changing the number
    if (h >= TOP_POINT) {
        BELL_FILL += 30;
    } else if (BELL_FILL > 0) {
        BELL_FILL -= 1;
    }
    
    rect(width/2 - 50, height - 100 - TOP_POINT, 100, 3);
}



// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }