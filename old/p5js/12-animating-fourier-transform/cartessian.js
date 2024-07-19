const C_ORI_X = 70;
const C_ORI_Y = 150;
const C_X_MAX = 4;
const C_Y_MAX = 0.5;
const C_UNIT_PIXEL = 200;

class Cartessian {

  v_start = createVector(C_ORI_X, C_ORI_Y - C_Y_MAX * C_UNIT_PIXEL);
  v_end = createVector(C_ORI_X, C_ORI_Y + C_Y_MAX * C_UNIT_PIXEL);
  h_start = createVector(C_ORI_X, C_ORI_Y);
  h_end = createVector(C_ORI_X + C_X_MAX * C_UNIT_PIXEL, C_ORI_Y);

  constructor(f1, f2, f3) {
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    let divider = (f1 ? 1 : 0) + (f2 ? 1 : 0) + (f3 ? 1 : 0);
    this.points = [];
    let yx = y(f1, f2, f3);
    for (let x = 0; x < C_X_MAX; x += 0.01) {
      this.points.push(createVector(x, yx(x) / (2 * divider)))
    }
  }

  show(rps) {
    let spr = 1 / rps;

    // Draw Coordinate
    strokeWeight(3);
    stroke(200);
    fill(200);
    line(this.h_start.x, this.h_start.y, this.h_end.x, this.h_end.y);
    line(this.v_start.x, this.v_start.y, this.v_end.x, this.v_end.y);
    customTriangle(this.v_start.x, this.v_start.y, 15, 0);
    customTriangle(this.h_end.x, this.h_end.y, 15, HALF_PI);

    // Y axis grid
    for (let j = -0.5; j <= 0.5; j += 0.25) {
      let l = j === floor(j) ? 10 : 5;
      line(
        C_ORI_X - l,
        C_ORI_Y + j * C_UNIT_PIXEL,
        C_ORI_X + l,
        C_ORI_Y + j * C_UNIT_PIXEL
      )
    }

    // X axis grid
    for (let i = 0; i <= C_X_MAX; i += 0.25) {
      let l = i === floor(i) ? 10 : 5;
      line(
        C_ORI_X + i * C_UNIT_PIXEL,
        C_ORI_Y - l,
        C_ORI_X + i * C_UNIT_PIXEL,
        C_ORI_Y + l
      )
    }

    // X label
    push();
    noStroke();
    for (let i = 1; i <= C_X_MAX; i++) {
      textAlign(CENTER, TOP);
      textSize(16);
      text(i, C_ORI_X + i * C_UNIT_PIXEL, C_ORI_Y + 15);
    }
    textAlign(LEFT);
    textSize(30);
    text('Intensity', this.v_start.x + 10, this.v_start.y - 10);
    textAlign(CENTER);
    text('Time', this.h_end.x, this.h_end.y + 40);
    pop();

    // Draw Curve
    strokeWeight(3);
    stroke(230, 230, 0);
    noFill();
    beginShape();
    for (let p of this.points) {
      vertex(C_ORI_X + p.x * C_UNIT_PIXEL, C_ORI_Y + p.y * C_UNIT_PIXEL)
    }
    endShape();

    // Draw Line Indicator
    stroke(255, 255, 255, 150);
    for (let i = spr; i <= C_X_MAX; i += spr) {
      dashline(
        C_ORI_X + i * C_UNIT_PIXEL,
        C_ORI_Y - C_Y_MAX * C_UNIT_PIXEL,
        C_ORI_X + i * C_UNIT_PIXEL,
        C_ORI_Y + C_Y_MAX * C_UNIT_PIXEL + 20,
        5
      )
    }
  }


}