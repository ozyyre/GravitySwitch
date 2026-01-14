let player, enemy;
let gravity = 0.5;
let score = 0;
let bestScore = 0;
let meteorCount = 0;
let obstacles = [];
let backgroundObjects = [];
let rocketImg, meteorImg, enemyImg;

function preload() {
    rocketImg = loadImage('images/rocketImg.png'); 
    meteorImg = loadImage('images/meteor.png');
    enemyImg = loadImage('images/enemyShip.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight - 100);
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

    enemy.update();
    enemy.show();

    if (enemy.checkCollision(player)) {
        gameOver();
    }

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
                    enemy = new EnemyShip(width, random(50, height - 50), enemyImg);
                }
                for (let j = 0; j < obstacles.length; j++) {
                    obstacles[j].speed = obstacles[j].speed + 0.5;
                }
            }
        }
    }
}
function keyPressed() {
    if (key == ' ') {
        gravity = gravity * -1;
    }
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
