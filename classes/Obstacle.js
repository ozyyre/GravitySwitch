class Obstacle {
  constructor() {
    this.size = random(30, 60);
    this.x = width + this.size;
    if (random(1) < 0.5) {
      this.y = random(this.size, height / 3);
    } else {
      this.y = random(2 * height / 3, height - this.size);
    }
    this.speed = 5;
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.05, 0.05);
  }
  update() {
    this.x = this.x - this.speed;
    this.angle = this.angle + this.rotationSpeed;
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
    return this.x + this.size / 2 < 0;
  }
  hits(player) {
    let rect = player.getRect();
    let closestX = constrain(rect.x, this.x - this.size / 2, this.x + this.size / 2);
    let closestY = constrain(rect.y, this.y - this.size / 2, this.y + this.size / 2);
    return dist(rect.x, rect.y, closestX, closestY) < this.size / 2;
  }
}
