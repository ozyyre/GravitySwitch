class Player {
  constructor() {
    this.x = 64;
    this.y = height / 2;
    this.w = 50;
    this.h = 50;
    this.vel = 0;
  }

  update() {
    this.vel += gravity;
    this.y += this.vel;
    
    // Omezení pohybu
    this.y = constrain(this.y, 0, height - this.h);
    
    // Odraz
    if (this.y <= 0 || this.y >= height - this.h) {
      this.vel *= -0.2;
    }
  }

  show() {
    image(rocketImg, this.x, this.y, this.w, this.h);
  }

  getRect() {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    };
  }
} // <--- Tahle závorka tady musí být jako úplně poslední
