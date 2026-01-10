class Player {
    constructor() {
        this.size = 50;
        this.x = 100;
        this.y = height / 2;
        this.velocity = 0;
    }

    update() {
        this.velocity += gravity;
        this.y += this.velocity;

        // Omezit pohyb na canvas
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
