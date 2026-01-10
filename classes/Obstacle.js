class Obstacle {
    constructor() {
        this.size = random(30, 60);
        this.x = width + this.size;
        this.y = random(this.size/2, height - this.size/2);
        this.speed = 5;
        this.angle = random(TWO_PI);   // počáteční úhel
        this.rotationSpeed = random(-0.05, 0.05); // rychlost rotace
    }

    update() {
        this.x -= this.speed;
        this.angle += this.rotationSpeed;
    }

    show() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(meteorImg, 0, 0, this.size, this.size);
        pop();
    }

    offscreen() {
        return this.x + this.size/2 < 0;
    }

    hits(player) {
        const rect = player.getRect();
        const closestX = constrain(rect.x, this.x - this.size/2, this.x + this.size/2);
        const closestY = constrain(rect.y, this.y - this.size/2, this.y + this.size/2);
        return dist(rect.x, rect.y, closestX, closestY) < this.size/2;
    }
}
