var MIC;

var RECORD;
var RANGE;

var BELL_FILL;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    MIC = new p5.AudioIn();
    MIC.start();
    
    RECORD = 0;
    RANGE = 400;
    BELL_FILL = 0;
}

function draw() {
    let nob = 20;
    let gap = 5;
    let unitH = (RANGE+gap)/nob;
    let blockW = 50;
    let blockH = unitH - gap;
    
    // sensitivity adjustment
    let vol = MIC.getLevel();
    let currentLevel = Math.floor(map(vol, 0, 0.8, 0, 10));
    
    // background setting
    background(240);
    noStroke();
    
    
    
    push();
    translate(0, 150);
    // VISUALIZOR starts here
    
    // level container
    fill(255);
    for (let i = 0; i<nob; i += 1) {
        rect(width/2 - blockW/2, RANGE + gap*2 - i*unitH, blockW, blockH);
    }
    
    // Draw a rectangle with height based on volume
    if (RECORD < currentLevel) {
        RECORD = currentLevel;
    }
    fill(255, 255, 0);
    
    for (let i = 0; i<RECORD; i += 1) {
        rect(width/2 - blockW/2, RANGE + gap*2 - i*unitH, blockW, blockH);
    }
    
    
    // visualize live volume


    fill(255, 170, 0);
    for (let i = 0; i<currentLevel; i += 1) {
        rect(width/2 - blockW/2, RANGE + gap*2 - i*unitH, blockW, blockH);
    }    
    
    
    // bell
    
    fill(BELL_FILL);
    
    // time control by changing the number
    if (currentLevel >= nob) {
        BELL_FILL += 30;
    } else if (currentLevel > 0) {
        BELL_FILL -= 5;
    }
    rect(width/2 - 50, unitH, 100, 3);
    
    // end of the visualizer
    pop();
    
    drawGround();
}

function drawGround(){
    fill(0, 170, 255);
    rect(0, height - 100, width, 100);
}

function windowResized() {
     resizeCanvas(windowWidth, windowHeight);
 }