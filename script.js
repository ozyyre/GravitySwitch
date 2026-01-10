let player;
let gravity = 0.5; // směr gravitace dolů
let score = 0;
let obstacles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    player = new Player();
    obstacles.push(new Obstacle());
}

function draw() {
    background(34);
    
    player.update();
    player.show();

    // generování překážek
    if (frameCount % 90 === 0) {
        obstacles.push(new Obstacle());
    }

    // vykreslení překážek
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

function keyPressed() {
    if (key === ' ' || key === 'Spacebar') {
        gravity *= -1; // obrácení gravitace
    }
}

class Player {
    constructor() {
        this.x = 100;
        this.y = height / 2;
        this.size = 50;
        this.velocity = 0;
    }

    update() {
        this.velocity += gravity;
        this.y += this.velocity;

        // omezení pohybu
        if (this.y + this.size/2 > height) {
            this.y = height - this.size/2;
            this.velocity = 0;
        } else if (this.y - this.size/2 < 0) {
            this.y = this.size/2;
            this.velocity = 0;
        }
    }

    show() {
        fill(0, 255, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size);
    }
}

class Obstacle {
    constructor() {
        this.w = 50;
        this.h = random(100, 300);
        this.x = width;
        this.y = random(this.h/2, height - this.h/2);
        this.speed = 5;
    }

    update() {
        this.x -= this.speed;
    }

    show() {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(player) {
        return (player.x + player.size/2 > this.x - this.w/2 &&
                player.x - player.size/2 < this.x + this.w/2 &&
                player.y + player.size/2 > this.y - this.h/2 &&
                player.y - player.size/2 < this.y + this.h/2);
    }
}
