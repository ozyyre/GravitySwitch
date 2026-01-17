let player, enemy, rocketImg, meteorImg, enemyImg;
let gravity = 0.5;
let score = 0;
let bestScore = 0;
let obstacles = [];
let stars = [];

function preload() {
    rocketImg = loadImage('images/rocketImg.png');
    meteorImg = loadImage('images/meteor.png');
    enemyImg = loadImage('images/enemyShip.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight - 200); 
    player = new Player();
    enemy = new EnemyShip(width, height / 2, enemyImg);
    for (let i = 0; i < 50; i++) stars.push(new BackgroundObject());
    document.getElementById('restartBtn').onclick = restartGame;   
}

function draw() {
    background(0);
    for (let s of stars) { s.update(); s.show(); }
    
    player.update();
    player.show();

    if (frameCount % 90 === 0) obstacles.push(new Obstacle());

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].show();
        
        if (obstacles[i].hits(player)) gameOver();

        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);
            score++;
            document.getElementById('score').innerText = score;
        }
    }

    enemy.update();
    enemy.show();
    if (enemy.checkCollision(player)) gameOver();
}

function keyPressed() {
    if (key === ' ') gravity *= -1;
}

function restartGame() {
    score = 0;
    obstacles = [];
    gravity = 0.5;
    player = new Player();
    enemy = new EnemyShip(width, height / 2, enemyImg);
    document.getElementById('score').innerText = score;
    loop();
}

function gameOver() {
    noLoop();
    if (score > bestScore) bestScore = score;
    document.getElementById('bestScore').innerText = bestScore;
    alert("Konec hry! Skóre: " + score);
}