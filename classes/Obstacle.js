class Obstacle {
  constructor() {
    this.size = random(30, 60);
    this.x = width + this.size;
    let isTop = random() < 0.5;
    this.y = isTop ? random(this.size, height / 3) : random(2 * height / 3, height - this.size);
    this.speed = 5;
    this.angle = random(TWO_PI);
    this.rot = random(-0.05, 0.05);
  }
  update() {
    this.x -= this.speed;
    this.angle += this.rot;
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
    return this.x < -this.size;
  }
  hits(player) {
    let r = player.getRect();
    let closestX = constrain(this.x, r.x, r.x + r.w);
    let closestY = constrain(this.y, r.y, r.y + r.h);
    return dist(this.x, this.y, closestX, closestY) < this.size / 2;
  }
}
