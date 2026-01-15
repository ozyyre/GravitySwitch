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
    this.x = this.x - this.speedX;
    this.y = this.y + (this.speedY * this.directionY);
    if (this.y < 20 || this.y > height - 20) {
      this.directionY = this.directionY * -1;
    }
    if (frameCount % this.fireRate == 0) {
      this.lasers.push({ x: this.x, y: this.y, speed: 8 });
    }
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      this.lasers[i].x = this.lasers[i].x - this.lasers[i].speed;
      if (this.lasers[i].x < -50) {
        this.lasers.splice(i, 1);
      }
    }
    if (this.x < -100) {
      this.x = width + random(200, 1000);
      this.y = random(50, height - 50);
    }
  }
  show() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, 80, 50);
    fill(255, 0, 0);
    for (let i = 0; i < this.lasers.length; i++) {
      let l = this.lasers[i];
      rectMode (CENTER);
      rect(l.x, l.y, 20, 5);
    }
  }
  checkCollision(player) {
    let p = player.getRect();
    if (p.x + p.w / 2 > this.x - 30 && p.x - p.w / 2 < this.x + 30 &&
        p.y + p.h / 2 > this.y - 15 && p.y - p.h / 2 < this.y + 15) {
      return true;
    }
    for (let i = 0; i < this.lasers.length; i++) {
      let l = this.lasers[i];
      if (p.x + p.w / 2 > l.x - 10 && p.x - p.w / 2 < l.x + 10 &&
          p.y + p.h / 2 > l.y - 2 && p.y - p.h / 2 < l.y + 2) {
        return true;
      }
    }
    return false;
  }
}

