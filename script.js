let player;
let enemy;
let gravity = 0.5;
let score = 0;
let bestScore = 0;
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
  const container = document.querySelector('.container');
  const topOffset = container ? container.offsetHeight + 20 : 80;
  const cnv = createCanvas(windowWidth, windowHeight - topOffset);
  cnv.style('display', 'block');
  player = new Player();
  enemy = new EnemyShip(width + 1000, height / 2, enemyImg);
  backgroundObjects = [];
  for (let i = 0; i < 100; i++) {
    backgroundObjects.push(new BackgroundObject());
  }
  const restartBtn = document.getElementById('restartBtn').blur();
  if (restartBtn) restartBtn.onclick = restartGame;
}
function draw() {
  background(0);
  for (const bg of backgroundObjects) {
    bg.update();
    bg.show();
  }
  player.update();
  player.show();
  if (frameCount % 90 === 0) {
    obstacles.push(new Obstacle());
  }
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.update();
    obs.show();
    if (obs.hits(player)) {
      gameOver();
      return;
    }
    if (obs.offscreen()) {
      obstacles.splice(i, 1);
      score++;
      const scoreEl = document.getElementById('score');
      if (scoreEl) scoreEl.innerText = score;
      if (enemy.x < -100 && random() < 0.15) {
        enemy.x = width + 100;
        enemy.y = random(height * 0.25, height * 0.75);
      }
      if (score % 10 === 0) {
        obstacles.forEach(o => o.speed += 1);
        enemy.speedX += 1;
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
  if (keyCode === 32) {
    gravity *= -1;
  }
}
function windowResized() {
  const container = document.querySelector('.container');
  const topOffset = container ? container.offsetHeight + 20 : 80;
  resizeCanvas(windowWidth, windowHeight - topOffset);
}
function restartGame() {
  score = 0;
  gravity = 0.5;
  obstacles = [];
  player = new Player();
  enemy = new EnemyShip(width + 1000, height / 2, enemyImg);
  const scoreEl = document.getElementById('score');
  if (scoreEl) scoreEl.innerText = score;
  loop();
}
function gameOver() {
  noLoop();
  if (score > bestScore) {
    bestScore = score;
  }
  const bestEl = document.getElementById('bestScore');
  const scoreEl = document.getElementById('score');
  if (bestEl) bestEl.innerText = bestScore;
  if (scoreEl) scoreEl.innerText = `Game Over! Skóre: ${score}`;
}

