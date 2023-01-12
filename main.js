const canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;

let h = canvas.height;
let w = canvas.width;
const center = {
  x: w / 2,
  y: h / 2,
};
const _2PI = 2 * Math.PI;
const ctx = canvas.getContext("2d");
function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
}

clearCanvas();

class Planet {
  constructor(x, y, r, color, parent, orbitDistance, orbitSpeed) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.radius = r;
    this.color = color;
    this.parent = parent || null;
    this.orbitDistance = parent ? orbitDistance : 0;
    this.orbitSpeed = parent ? orbitSpeed : 0;
    this.orbitAngle = 0;
  }
  draw() {
    if (this.parent) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "lightgray";
      ctx.arc(this.parent.x, this.parent.y, this.orbitDistance, 0, _2PI);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.parent ? null : this.color;
    ctx.shadowBlur = this.parent ? null : 10;
    ctx.arc(this.x, this.y, this.radius, 0, _2PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  update() {
    this.draw();
    this.orbitAngle += this.orbitSpeed;
    if (this.orbitAngle > _2PI) {
      this.orbitAngle = 0;
    }
    this.x =
      (this.parent ? this.parent.x : this.originX) +
      Math.cos(this.orbitAngle) * this.orbitDistance;
    this.y =
      (this.parent ? this.parent.y : this.originY) +
      Math.sin(this.orbitAngle) * this.orbitDistance;
  }
}

const sun = new Planet(center.x, center.y, 15, "orange");
const earth = new Planet(0, 0, 10, "green", sun, 120, 0.01);
const moon = new Planet(0, 0, 5, "gray", earth, 30, 0.05);
const animate = () => {
  clearCanvas();
  sun.update();
  earth.update();
  moon.update();
  window.requestAnimationFrame(animate);
};

animate();
