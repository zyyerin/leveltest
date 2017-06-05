var MIC;
var ARNOLD_FFT;
var BGIMG;
var TRIGGER;

var RECORDS = [0, 0, 0, 0];
var RANGE;


function preload() {
    BGIMG = loadImage("assets/bg_cover.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(24);
    background(255);
    MIC = new p5.AudioIn();
    MIC.start();
    ARNOLD_FFT = new p5.FFT(0.9, 16);
    ARNOLD_FFT.setInput(MIC);

    RECORD = 0;
    RANGE = 325;
    BELL_FILL = 0;
    noStroke();
    
    imageMode(CENTER);
}

function normalTest() {
        background(255);
    let blockW = 25;
    
    // sensitivity adjustment
    let vol = MIC.getLevel();
    let volScaler = map(vol, 0, 1, 1, 2);
    let spectrum = ARNOLD_FFT.analyze();
    
    
    // records
    let currentRecords = [];
    for (let i = 0; i < spectrum.length; i += 4) {
        let h = map(spectrum[i], 0, 255, 0, RANGE*0.5);
        currentRecords.push(h * volScaler);
    }

    // background setting
    push();
    translate(width/2 - 61, height - 90);
    
//    //range tester
//    fill(255,0,255);
//    rect(0,0,10,-RANGE);
    
    // VISUALIZOR starts here
    
    // record session
    fill(255, 200, 0);
    for(let i = 0; i < currentRecords.length; i += 1) {
        if(currentRecords[i] > RECORDS[i]){
            RECORDS[i] = currentRecords[i];
        }
    }
    console.log(RECORDS);
    
    for (let i = 0; i < RECORDS.length; i += 1) {
        rect(blockW * i, 0, blockW, -RECORDS[i]);
    }
    
    // spectrum
    
    fill(255, 100, 0);
    for (let i = 0; i < spectrum.length; i += 4) {
        let x = map(i, 0, spectrum.length, 0, blockW * 4);
        let h = map(spectrum[i], 0, 255, 0, RANGE*0.5);
        rect(x, 0, blockW, -h * volScaler);
    }

    
    // end trigger
    
    TRIGGER = (function(){
        for(let i = 0; i < currentRecords.length; i += 1) {
        if (currentRecords[i] < RANGE) {
            return false;
        }
       return true;
    }
    }());
    
    // time control by changing the number

    
    rect(width/2 - 50, -RANGE, 100, 3);
    
    pop();
    // end of the visualizer
}

function loud() {
    for (let i = 0; i < 600; i += 1) {
        fill(255, 0, 0);
        push();
        translate(width/2, 200);
        rotate(radians(random(-10, 10)));
        ellipse(0, 0, 150*random(-1, 1), 70*random(2));
        pop();
    }
}

function draw() {
    if (TRIGGER) {
        alert("!");
        TRIGGER = false;
    } else {
        normalTest();
    }
//    tint(255,100);
    image(BGIMG, width/2, height/2);
    
    loud();
}


function windowResized() {
     resizeCanvas(windowWidth, windowHeight);
 }