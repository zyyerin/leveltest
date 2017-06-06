var MIC;
var ARNOLD_FFT;
var BGIMG;
var ARNOLD_HEAD;
var ARNOLD_TYPE;
var TRIGGER;

var RECORDS = [0, 0, 0, 0];
var RANGE;

// var SLIDER;

function preload() {
    BGIMG = loadImage("assets/bg.png");
    ARNOLD_HEAD = loadImage("assets/arnoldHead.png");
    ARNOLD_TYPE = loadImage("assets/type.png");
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

    // SLIDER = createSlider(0, 100, 50);
    // SLIDER.position(50, 50);
}

function normalTest() {
    background(255);
    let blockW = 25;

    // sensitivity adjustment
    let vol = MIC.getLevel();
    let volScaler = map(vol, 0, 0.4, 1, 2);
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

    pop();
    // end of the visualizer

    //    tint(255,100);
    image(BGIMG, width/2, height/2);
    image(ARNOLD_HEAD, width/2, 160);
}

function loud() {
    fill(255, 100, 0);
    rect(width/3, 0, 400, height);
    image(BGIMG, width/2, height/2);
    push();
    translate(width/2, 160);
    rotate(radians(random(-10, 10)));
    image(ARNOLD_HEAD, 0, 0);

    translate(0, -50);
    rotate(radians(random(-10, 10)));
    image(ARNOLD_TYPE, 0, 0, random(200, 450), random(45, 150));

    pop();
}

function draw() {
    if (TRIGGER) {
        loud();

        if (mouseIsPressed) {
            TRIGGER = false;
            RECORDS = [0, 0, 0, 0];

        }
    } else {
        normalTest();
    }


//    loud();
}


function windowResized() {
     resizeCanvas(windowWidth, windowHeight);
 }
