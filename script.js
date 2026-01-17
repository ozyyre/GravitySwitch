let player, enemy;
let rocketImg, meteorImg, enemyImg;
let gravity = 0.5;
let score = 0;
let obstacles = [];
let stars = [];

function preload() {
  rocketImg = loadImage('images/rocketImg.png');
  meteorImg = loadImage('images/meteor.png');
  enemyImg = loadImage('images/enemyShip.png');
}

function setup() {
  createCanvas(1240, 620);
  document.getElementById('restartBtn').onclick = () => {
    score = 0;
    obstacles = [];
    gravity = 0.5;
    player = new Player();
    enemy = new EnemyShip(width + 1000, height / 2, enemyImg);
    loop(); 
  };
  player = new Player();
  enemy = new EnemyShip(width + 1000, height / 2, enemyImg);
  
  for (let i = 0; i < 50; i++) {
    stars.push(new BackgroundObject());
  }
}

function draw() {
  background(0);
  for (let star of stars) {
    star.update();
    star.show();
  }
  player.update();
  player.show();
  if (frameCount % 90 === 0) {
    obstacles.push(new Obstacle());
  }
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    if (obstacles[i].hits(player)) noLoop();
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
      let scoreEl = document.getElementById('score');
      if (scoreEl) scoreEl.innerText = score;
    }
  }
  enemy.update();
  enemy.show();
  if (enemy.checkCollision(player)) noLoop();
}

function keyPressed() {
  if (key === ' ' || keyCode === 32) gravity *= -1;
}

