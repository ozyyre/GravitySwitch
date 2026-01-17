class Obstacle {
    constructor() {
        this.size = random(30, 60);
        this.x = width + this.size;
        this.y = random(this.size/2, height - this.size/2);
        this.speed = 5;  
        this.angle = random(TWO_PI);
    }

    update() {
        this.x -= this.speed;
        this.angle += 0.05; 
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
        const r = player.getRect();
        const dx = Math.max(Math.abs(r.x - this.x) - r.w/2, 0);
        const dy = Math.max(Math.abs(r.y - this.y) - r.h/2, 0);
        const rad = this.size / 2;
        return dx * dx + dy * dy < rad * rad;
    }
}
