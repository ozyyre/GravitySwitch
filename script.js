let player;
let enemy;
let gravity = 0.5;
let score = 0;
let bestScore = 0;
let meteorCount = 0;
let obstacles = [];
let backgroundObjects = [];
let rocketImg;
let meteorImg;
let enemyImg;

function preload() {
  rocketImg = loadImage('images/rocketImg.png');
  meteorImg = loadImage('images/meteor.png');
  enemyImg = loadImage('images/enemyShip.png');
}
function setup() {
  let container = document.querySelector('.container');
  let topOffset = container ? container.offsetHeight + 20 : 80;
  let cnv = createCanvas(windowWidth, windowHeight - topOffset);
  cnv.style('display', 'block');
  player = new Player();
  enemy = new EnemyShip(width, height / 3, enemyImg);
  for (let i = 0; i < 100; i++) {
    backgroundObjects.push(new BackgroundObject());
  }
  document.getElementById('restartBtn').onclick = restartGame;
}
function draw() {
  background(0);
  for (let i = 0; i < backgroundObjects.length; i++) {
    backgroundObjects[i].update();
    backgroundObjects[i].show();
  }
  player.update();
  player.show();
  if (frameCount % 90 == 0) {
    obstacles.push(new Obstacle());
  }
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    if (obstacles[i].hits(player)) {
      gameOver();
    }
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score = score + 1;
      meteorCount = meteorCount + 1;
      document.getElementById('score').innerText = score;

      if (meteorCount % 10 == 0) {
        if (random(1) < 0.7) {
          enemy = new EnemyShip(width, random(height / 4, 3 * height / 4), enemyImg);
        }
        for (let j = 0; j < obstacles.length; j++) {
          obstacles[j].speed = obstacles[j].speed + 0.5;
        }
        enemy.speedX = enemy.speedX + 0.5;
        enemy.speedY = enemy.speedY + 0.2;
      }
    }
  }
  enemy.update();
  enemy.show();

  if (enemy.checkCollision(player)) {
    gameOver();
  }
}
function keyPressed() {
  if (key == ' ' || key == 'Spacebar') {
    gravity = gravity * -1;
  }
}
function windowResized() {
  let container = document.querySelector('.container');
  let topOffset = container ? container.offsetHeight + 20 : 80;
  resizeCanvas(windowWidth, windowHeight - topOffset);
}
function restartGame() {
  score = 0;
  meteorCount = 0;
  obstacles = [];
  player = new Player();
  enemy = new EnemyShip(width, height / 3, enemyImg);
  document.getElementById('score').innerText = score;
  loop();
}

function gameOver() {
  noLoop();
  if (score > bestScore) {
    bestScore = score;
  }
  document.getElementById('bestScore').innerText = bestScore;
  document.getElementById('score').innerText = "Game Over! Skóre: " + score;
}
