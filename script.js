let player, enemy, rocketImg, meteorImg, enemyImg;
let gravity = 0.5;
let score = 0;
let obstacles = [];

function preload() {
  rocketImg = loadImage('images/rocketImg.png');
  meteorImg = loadImage('images/meteor.png');
  enemyImg = loadImage('images/enemyShip.png');
}
function setup() {
  createCanvas(1240, 620);
  player = new Player();
  enemy = new EnemyShip(width + 1000, height / 2, enemyImg);
}
function draw() {
  background(0);
  player.update();
  player.show();
  if (frameCount % 90 === 0) {
    obstacles.push(new Obstacle());
  }
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    if (obstacles[i].hits(player)) {
      noLoop();
    }
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
      document.getElementById('score').innerText = score;
    }
  }
  enemy.update();
  enemy.show();

  if (enemy.checkCollision(player)) {
    noLoop();
  }
}
function keyPressed() {
  if (key === ' ') {
    gravity *= -1;
  }
}
class Player {
  constructor() {
    this.x = 64;
    this.y = height / 2;
    this.w = 50;
    this.h = 50;
    this.velocity = 0;
  }
  update() {
    this.velocity += gravity;
    this.y += this.velocity;
    this.y = constrain(this.y, 0, height - this.h);
    if (this.y === 0 || this.y === height - this.h) {
      this.velocity = 0;
    }
  }
  show() {
    image(rocketImg, this.x, this.y, this.w, this.h);
  }
}
