// this code was modified based off of Anna Wasson pong gmae. 
// https://editor.p5js.org/annawasson/sketches/BQFIoo6s2

// Random Ball Placement
var xBall = 200; // Start in center
var yBall = 200;
var xSpeed = (2, 7);
var ySpeed = (-7, -2);



// Scores for all players
var scoreTop = 0;    // Player 1
var scoreBottom = 0; // Player 2
var scoreLeft = 0;   // Player 3
var scoreRight = 0;  // Player 4

// Paddle positions
var paddle2X = 155;  // Top paddle
var paddle1X = 0;
var leftPaddleY = 155;  // Left paddle
var rightPaddleY = 155; // Right paddle

// Canvas
function setup() {
  createCanvas(800, 600);
  textStyle();
  textFont('Helvetica');
}

function draw() {
  // Background
  background('green');

  fill('black');           // Set the text color
  textSize(32);            // Set the text size
  textAlign(CENTER, CENTER); // Align text to the center horizontally and vertically

  text("4 PONG!", width / 2, height / 2); 
  
  // Draw all paddles
  fill('#ffffff');

  // Bottom paddle (mouse controlled)
  rect(paddle1X, 575, 90, 15);
  
  // Top paddle (left/right arrows)
  rect(paddle2X, 10, 90, 15);
  
  // Left paddle (w/s keys)
  rect(10, leftPaddleY, 15, 90);
  
  // Right paddle (up/down arrows)
  rect(775, rightPaddleY, 15, 90);
  
  // Control top paddle
  if (keyIsDown(LEFT_ARROW)) {
    paddle2X = max(0, paddle2X - 5);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddle2X = min(width - 90, paddle2X + 5);
  }

  //bottom paddle 
  if (keyIsDown(86)) {
    paddle1X = max(0, paddle1X - 5);
  }

  if (keyIsDown(66)) {
    paddle1X = min(width - 90, paddle1X + 5);
  }

  // Control left paddle (W/S keys)
  if (keyIsDown(87)) { // W key
    leftPaddleY = max(0, leftPaddleY - 5);
  }
  if (keyIsDown(83)) { // S key
    leftPaddleY = min(height - 90, leftPaddleY + 5);
  }
  
  // Control right paddle (up/down arrows)
  if (keyIsDown(UP_ARROW)) {
    rightPaddleY = max(0, rightPaddleY - 5);
  }
  if (keyIsDown(DOWN_ARROW)) {
    rightPaddleY = min(height - 90, rightPaddleY + 5);
  }
  
  // Game functions
  move();
  display();
  bounce();
  paddleCollision();
  
  // Display scores
  fill('black');
  textSize(24);
  
  // Top player score
  text("Top: " + scoreTop, width/2 - 335, 43);

  // Bottom player score
  text("Bottom: " + scoreBottom, width/2 - -320, height - 40);

  // Left player score
  push();
  translate(42, height/2 - -235);
  rotate(-PI/2);
  text("Left: " + scoreLeft, 0, 0);
  pop();

  // Right player score
  push();
  translate(width - 42, height/2 - 230);
  rotate(PI/2);
  text("Right: " + scoreRight, 0, 0);
  pop();
}

function move() {
  xBall += xSpeed;
  yBall += ySpeed;
}

function bounce() {
  // Score and reset when ball hits edges
  if (xBall < 0) {
    scoreRight++;
    resetBall();
  }
  if (xBall > width) {
    scoreLeft++;
    resetBall();
  }
  if (yBall < 0) {
    scoreBottom++;
    resetBall();
  }
  if (yBall > height) {
    scoreTop++;
    resetBall();
  }
}

function resetBall() {
  xBall = width/2;
  yBall = height/2;
  // Randomize initial direction
  xSpeed = random(2, 7) * (random() > 0.5 ? 1 : -1);
  ySpeed = random(2, 7) * (random() > 0.5 ? 1 : -1);
}

function display() {
  fill('yellow');
  ellipse(xBall, yBall, 20, 20);
}

function paddleCollision() {
  paddle1X
  if ((xBall > paddle1X && xBall < paddle1X + 90) && (yBall + 10 >= 575)) {
    ySpeed *= -1;
    xSpeed *= random(0.9, 1.1); // Add some randomness to prevent loops
  }

  
  // Top paddle collision
  if ((xBall > paddle2X && xBall < paddle2X + 90) && (yBall - 10 <= 25)) {
    ySpeed *= -1;
    xSpeed *= random(0.9, 1.1);
  }
  
  // Left paddle collision
  if ((yBall > leftPaddleY && yBall < leftPaddleY + 90) && (xBall - 10 <= 25)) {
    xSpeed *= -1;
    ySpeed *= random(0.9, 1.1);
  }
  
  // Right paddle collision
  if ((yBall > rightPaddleY && yBall < rightPaddleY + 90) && (xBall + 10 >= 775)) {
    xSpeed *= -1;
    ySpeed *= random(0.9, 1.1);
  }
}