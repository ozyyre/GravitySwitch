let player;
let gravity = 0.5;
let score = 0;
let obstacles = [];

function setup() {
    const topOffset = document.querySelector('.container').offsetHeight + 20; // prostor pro HTML
    createCanvas(windowWidth, windowHeight - topOffset);
    player = new Player();
    obstacles.push(new Obstacle());
}

function draw() {
    background(34);

    // Hráč
    player.update();
    player.show();

    // Překážky
    if (frameCount % 90 === 0) {
        obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].show();

        if (obstacles[i].hits(player)) {
            noLoop();
            alert("Game Over! Skóre: " + score);
        }

        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);
            score++;
            document.getElementById('score').innerText = score;
        }
    }
}

// Změna gravitace mezerníkem
function keyPressed() {
    if (key === ' ' || key === 'Spacebar') {
        gravity *= -1;
    }
}

// Přizpůsobení canvas při změně velikosti okna
function windowResized() {
    const topOffset = document.querySelector('.container').offsetHeight + 20;
    resizeCanvas(windowWidth, windowHeight - topOffset);
}
