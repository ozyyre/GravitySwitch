class EnemyShip {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.w = 60;
    this.h = 40;
    this.speedX = 3;
  }
  update() {
    this.x -= this.speedX;
  }
  show() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
  checkCollision(player) {
    let r = player.getRect();
    return (this.x < r.x + r.w && this.x + this.w > r.x &&
            this.y < r.y + r.h && this.y + this.h > r.y);
  }
}
