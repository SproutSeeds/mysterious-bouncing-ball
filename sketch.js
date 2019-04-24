let x = 0;
let y = 0;
let xSpeed = 3;
let ySpeed = 3;
let points = 0;
let count = 1;
let colorCount = 0;
let colorCount2 = 0;
let colorCount3 = 0;
let finalStage = 0;
let finalColorCountR = 0;
let finalColorCountG = 0;
let finalColorCountB = 0;
let lastR = 255;
let lastG = 255;
let lastB = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (points > 100000) {
    foo();

    createCanvas(windowWidth, windowHeight, WEBGL);

    background(finalColorCountR, finalColorCountG, finalColorCountB);
    finalColorCountR += 1;
    if (finalColorCountR > 255) {
      finalColorCountG += 1;
    }
    if (finalColorCountG > 255) {
      finalColorCountB += 1;
    }
    if (
      finalColorCountR > 255 &&
      finalColorCountG > 255 &&
      finalColorCountB > 255
    ) {
      background((lastR -= 1), (lastG -= 1), (lastB -= 1));
    }
    rotateY(frameCount * 0.01);

    for (let j = 0; j < 5; j++) {
      push();
      for (let i = 0; i < 80; i++) {
        translate(
          sin(frameCount * 0.001 + j) * 350,
          sin(frameCount * 0.001 + j) * 350,
          i * 0.1
        );
        rotateZ(frameCount * 0.0008);
        push();
        sphere(32, 24, 16);
        pop();
      }
      pop();
    }
  } else {
    if (points == 0) {
      c = color(0, 100, 200);
    } else if (points / 100000 > 1) {
      c = color(0, 0, 0);
      textSize(50);

      text('ABCD', 50, 30);
      textAlign(CENTER);
      finalStage += 5;
      count += 1;
    } else if (points / 50000 > 1) {
      c = color(finalStage, 0, 0);
      finalStage += 5;
      count += 1;
    } else if (points / 1000 == count) {
      c = color(2 + colorCount, 2 + colorCount2, 200 - colorCount3);
      count += 1;
      colorCount += 5;
      colorCount2 += 5;
      colorCount3 += 5;
    }

    background(c);
    textSize(26);
    text(`Points: ${points}`, 10, 30);
    stroke(255);
    strokeWeight(4);
    ellipse(x, y, 100, 100);

    if (y >= height) {
      ySpeed *= -1.01;
      points -= 1000;
      console.log(points);
    } else if (mouseY < y && mouseIsPressed) {
      ySpeed *= -1.01;
      fillColor = color(random(0, 255), random(0, 255), random(0, 255));
      fill(fillColor);
      console.log(c);
    } else if (y < 0) {
      ySpeed *= -1.01;
      points += 500;
    }

    if (x > width || x < 0) {
      xSpeed *= -1.01;
    }
    x = x + xSpeed;
    y = y + ySpeed;
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  soundFormats('wav');
  mySound = loadSound('comp_sci_sound1.wav');
}

function noop() {}

function foo() {
  foo = noop; // swap the functions
  mySound.setVolume(0.3);
  mySound.play();
  // do your thing
}
