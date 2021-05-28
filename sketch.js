var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1, car2, car3, car4
var cars
var img1, img2, img3, img4
var finishedPlayers
var xVelocity = 0
var yVelocity = 0
var passed = 0

var form, player, game;

function preload() {
  img1 = loadImage("images/car1.png")
  img2 = loadImage("images/car2.png")
  img3 = loadImage("images/car3.png")
  img4 = loadImage("images/car4.png")
  backgroundImage = loadImage("images/track.jpg")
}

function setup() {

  canvas = createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw() {

  if (playerCount === 4) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
  }
  if (finishedPlayers === 4) {
    gameState = 2
  }
  if (gameState === 2) {
    game.end();
  }

  //drawSprites();
}
