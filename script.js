let player, enemy, gravity = 0.5, score = 0, bestScore = 0, meteorCount = 0;
let obstacles = [], backgroundObjects = [], rocketImg, meteorImg, enemyImg;

function preload() {
    rocketImg = loadImage('images/rocketImg.png'); 
    meteorImg = loadImage('images/meteor.png');
    enemyImg = loadImage('images/enemyShip.png');
}

function setup() {
    const container = document.querySelector('.container');
    const topOffset = container ? container.offsetHeight + 20 : 80;
    
    // Vytvoření plátna a odstranění mezery pod ním
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

    backgroundObjects.forEach(obj => { obj.update(); obj.show(); });

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
            meteorCount++;
            document.getElementById('score').innerText = score;

            if (meteorCount % 10 === 0 && random() < 0.7) {
                enemy = new EnemyShip(width, random(height/4, 3*height/4), enemyImg);
            }

            if (score % 10 === 0) {
                obstacles.forEach(obs => obs.speed += 0.5);
                enemy.speedX += 0.5;
                enemy.speedY += 0.2;
                if (enemy.lasers) enemy.lasers.forEach(l => l.speed += 0.2);
            }
        }
    }

    enemy.update();
    enemy.show();

    if (enemy.checkCollision(player)) gameOver();
}

function keyPressed() {
    if (key === ' ' || key === 'Spacebar') gravity *= -1;
}

function windowResized() {
    const container = document.querySelector('.container');
    const topOffset = container ? container.offsetHeight + 20 : 80;
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
    if (score > bestScore) bestScore = score;
    document.getElementById('bestScore').innerText = bestScore;
    document.getElementById('score').innerText = "Game Over! Skóre: " + score;
}
