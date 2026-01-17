class EnemyShip {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.w = 60;
    this.h = 40;
    this.speedX = 3;
    this.speedY = 2;
    this.directionY = 1;
    this.lasers = [];
    this.fireRate = 90;
  }

  update() {
    this.x -= this.speedX;
    this.y += this.speedY * this.directionY;

    // Odraz od okrajů
    if (this.y < 20 || this.y > height - 20) {
      this.directionY *= -1;
    }

    // Střelba
    if (frameCount % this.fireRate === 0) {
      this.lasers.push({ x: this.x, y: this.y, speed: 8 });
    }

    // Pohyb laserů
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      this.lasers[i].x -= this.lasers[i].speed;
      if (this.lasers[i].x < -50) {
        this.lasers.splice(i, 1);
      }
    }

    // Respawn lodi
    if (this.x < -100) {
      this.x = width + random(200, 1000);
      this.y = random(50, height - 50);
    }
  }

  show() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);

    fill(255, 0, 0);
    noStroke();
    for (let l of this.lasers) {
      rectMode(CENTER);
      rect(l.x, l.y, 20, 5);
    }
    pop();
  }

  checkCollision(player) {
    let p = player.getRect();
    
    // Kolize s lodí (jednoduchý obdélník)
    if (p.x < this.x + this.w/2 && p.x + p.w > this.x - this.w/2 &&
        p.y < this.y + this.h/2 && p.y + p.h > this.y - this.h/2) {
      return true;
    }

    // Kolize s lasery
    for (let l of this.lasers) {
      if (p.x < l.x + 10 && p.x + p.w > l.x - 10 &&
          p.y < l.y + 2 && p.y + p.h > l.y - 2) {
        return true;
      }
    }
    return false;
  }
}
