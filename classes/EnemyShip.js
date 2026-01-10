class EnemyShip {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 30;
        this.speedX = 5;
        this.speedY = 2;
        this.directionY = 1;
        this.img = img;
        this.lasers = [];
        this.fireRate = 90;
    }

    update() {
        // pohyb lodě
        this.x -= this.speedX;
        this.y += this.speedY * this.directionY;
        if (this.y < this.height/2 || this.y > height - this.height/2) this.directionY *= -1;

        // střelba
        if (frameCount % this.fireRate === 0) this.lasers.push({x: this.x, y: this.y, speed: 8});

        // pohyb laserů a odstranění mimo canvas
        this.lasers = this.lasers.filter(l => {
            l.x -= l.speed;
            return l.x + 10 > 0;
        });
    }

    show() {
        imageMode(CENTER);
        if (this.img) image(this.img, this.x, this.y, 80, 50);
        else {
            fill(150,0,255);
            rectMode(CENTER);
            rect(this.x, this.y, this.width, this.height);
        }

        fill(255,0,0);
        this.lasers.forEach(l => rect(l.x, l.y, 20, 5));
    }

    checkCollision(player) {
        const rect = player.getRect();

        // kolize s lodí
        if (rect.x+rect.w/2 > this.x-this.width/2 &&
            rect.x-rect.w/2 < this.x+this.width/2 &&
            rect.y+rect.h/2 > this.y-this.height/2 &&
            rect.y-rect.h/2 < this.y+this.height/2) return true;

        // kolize s lasery
        return this.lasers.some(l => 
            rect.x+rect.w/2 > l.x-10 &&
            rect.x-rect.w/2 < l.x+10 &&
            rect.y+rect.h/2 > l.y-2.5 &&
            rect.y-rect.h/2 < l.y+2.5
        );
    }
}
