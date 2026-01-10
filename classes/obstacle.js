class Obstacle {
    constructor() {
        this.w = 50;
        this.h = random(100, 300);
        this.x = width;
        this.y = random(this.h / 2, height - this.h / 2);
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
        return (
            player.x + player.size / 2 > this.x - this.w / 2 &&
            player.x - player.size / 2 < this.x + this.w / 2 &&
            player.y + player.size / 2 > this.y - this.h / 2 &&
            player.y - player.size / 2 < this.y + this.h / 2
        );
    }
}
