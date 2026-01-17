class BackgroundObject {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(1, 3);
  }
  update() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = width;
      this.y = random(height);
    }
  }
  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
