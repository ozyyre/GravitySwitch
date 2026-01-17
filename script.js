let player, enemy;
let rocketImg, meteorImg, enemyImg; // Obrázky
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
  // Tady pozor, pokud tvoje EnemyShip classa vyžaduje jiné parametry, uprav je:
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
      console.log("Game Over - Meteor");
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
      let scoreEl = document.getElementById('score');
      if (scoreEl) scoreEl.innerText = score;
    }
  }

  enemy.update();
  enemy.show();

  if (enemy.checkCollision(player)) {
    noLoop();
    console.log("Game Over - Enemy");
  }
}

function keyPressed() {
  if (key === ' ' || keyCode === 32) {
    gravity *= -1;
  }
}
