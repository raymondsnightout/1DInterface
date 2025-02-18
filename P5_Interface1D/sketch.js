/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////

let displaySize = 30;   // how many pixels are visible in the game
let pixelSize = 20;     // how big each 'pixel' looks on screen

let alien;    // Adding 2 players to the game
let cow;

let display;      // Aggregates our final visual output before showing it on the screen

let controller;   // This is where the state machine and game logic lives

let collisionAnimation;   // Where we store and manage the collision animation

let score;        // Where we keep track of score and winner

function setup() {
  createCanvas((displaySize*pixelSize), pixelSize);     // dynamically sets canvas size

  display = new Display(displaySize, pixelSize);        //Initializing the display

  // Initialize players in random, non-overlapping positions
  alien = new Player(color(128,128,128), parseInt(random(0,displaySize-2)), displaySize, 3); // Gray color, 3 pixels wide
  do {
    cow = new Player(color(255,255,255), parseInt(random(0,displaySize)), displaySize, 1); // White color, 1 pixel wide
  } while (alien.checkOverlap(cow));

  collisionAnimation = new Animation();     // Initializing animation

  controller = new Controller();            // Initializing controller

  score = {max:3, winner:color(0,0,0)};     // score stores max number of points, and color 
}

function draw() {
  background(0, 0, 0);
  controller.update();
  display.show();
}

function keyPressed() {
  if (key == 'A' || key == 'a') {
    alien.move(-1);
  }
  if (key == 'D' || key == 'd') {
    alien.move(1);
  }
  if (key == 'J' || key == 'j') {
    cow.move(-1);
  }
  if (key == 'L' || key == 'l') {
    cow.move(1);
  }
  if (key == ' ') {
    controller.checkCapture();
  }
  if (key == 'R' || key == 'r') {
    controller.gameState = "PLAY";
    alien.score = 0;
    cow.score = 0;
    alien.position = parseInt(random(0,displaySize-2));
    cow.position = parseInt(random(0,displaySize));
    while (alien.checkOverlap(cow)) {
      cow.position = parseInt(random(0,displaySize));
    }
  }
}
