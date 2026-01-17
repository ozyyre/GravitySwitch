class EnemyShip {
  constructor(x, y, img) {
    this.x = x;
    this.img = img;
    this.w = 60;
    this.h = 45;
    this.y = random() < 0.5 ? this.h / 2 : height - this.h / 2;
    this.speedX = 4;
    this.speedY = 0;
    this.laserSpeed = 8;
    this.lasers = [];
  }
  update() {
    this.x -= this.speedX;
    if (frameCount % 100 === 0) {
      this.lasers.push({ x: this.x, y: this.y, speed: this.laserSpeed });
    }
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      this.lasers[i].x -= this.lasers[i].speed;
      if (this.lasers[i].x < 0) {
        this.lasers.splice(i, 1);
      }
    }
    if (this.x < -100) {
      this.x = width + 200;
      this.y = random() < 0.5 ? this.h / 2 : height - this.h / 2;
    }
  }
  show() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
    fill(255, 0, 0);
    noStroke();
    for (let l of this.lasers) {
      rectMode(CENTER);
      rect(l.x, l.y, 20, 5);
    }
  }
  checkCollision(player) {
    const pw = player.size / 2;
    const ph = player.size * 0.4;
    
    if (
      player.x + pw > this.x - this.w / 2 &&
      player.x - pw < this.x + this.w / 2 &&
      player.y + ph > this.y - this.h / 2 &&
      player.y - ph < this.y + this.h / 2
    ) return true;

    for (let i = 0; i < this.lasers.length; i++) {
      const l = this.lasers[i];
      if (
        player.x + pw > l.x - 10 &&
        player.x - pw < l.x + 10 &&
        player.y + ph > l.y - 2.5 &&
        player.y - ph < l.y + 2.5
      ) return true;
    }
    return false;
  }
}