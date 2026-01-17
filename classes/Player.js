class Player {
    constructor() {
        this.size = 80;
        this.x = 100;
        this.y = height / 2;
        this.vel = 0;
    }
    update() {
    this.vel += gravity;
    this.y = constrain(this.y + this.vel, 0, height - this.h);
    if (this.y <= 0 || this.y >= height - this.h) {
        this.vel *= -0.2; 
    }
}
    }

    show() {
        push();
        translate(this.x, this.y);
        rotate(HALF_PI); 
        imageMode(CENTER);
        image(rocketImg, 0, 0, this.size, this.size);
        pop();
    }

    getRect() {
        return { x: this.x, y: this.y, w: this.size, h: this.size * 0.8 };
    }
}







