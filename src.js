((d, window) => {
  // Initialize
  // ========================================================

  const canvas = d.querySelector('canvas');
  const c = canvas.getContext('2d');

  const w = window.innerWidth <= 480 ? 300 : 600;
  const h = window.innerWidth <= 480 ? 200 : 400;
  canvas.width = w;
  canvas.height = h;


  // Helper
  // ========================================================

  const rand = (min, max = 1) => Math.floor(Math.random() * ((max - min) + 1)) + min;
  const posOrNeg = () => (rand(2) === 1 ? -1 : 1);


  // Constant
  // ========================================================

  const GRAVITY = 1;


  // Frog class
  // ========================================================

  class Frog {
    constructor() {
      this.pos = {
        x: rand(w),
        y: h,
      };
      this.size = rand(10, 5);
      this.jump = false;
      this.vx = 5 * posOrNeg();
      this.vy = 10;
    }

    move() {
      const randomJump = rand(240);
      if (this.jump === true) {
        this.pos.x += this.vx;
        this.pos.y -= this.vy;
        this.vy -= GRAVITY;
        // bounce back if frog hit the wall
        if (this.pos.x + this.size >= w || this.pos.x <= 0) {
          this.vx = -this.vx;
        }
      }

      // new velocity if frog is on the ground
      if (this.pos.y >= h) {
        this.jump = false;
        this.pos.y = h;
        this.vx = rand(10, 5) * (this.vx / Math.abs(this.vx));
        this.vy = rand(15, 5);
        if (randomJump > 235) {
          this.jump = true;
        }
      }
      c.fillRect(this.pos.x, this.pos.y - this.size, this.size, this.size);
    }
  }


  // Frogs
  // ========================================================

  const frogs = [];
  for (let i = 0; i < 3; i += 1) {
    frogs[i] = new Frog();
  }


  // Draw
  // ========================================================

  function draw() {
    c.clearRect(0, 0, w, h);
    frogs.forEach(frog => frog.move());
    requestAnimationFrame(draw);
  }


  // Start
  // ========================================================

  draw();
})(document, window);
