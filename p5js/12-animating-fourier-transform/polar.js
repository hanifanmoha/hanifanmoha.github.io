const P_ORI_X = 200;
const P_ORI_Y = 450;
const P_UNIT_PIXEL = 150;
const P_X_MAX = 2;

class Polar {

  v_start = createVector(P_ORI_X, P_ORI_Y - P_UNIT_PIXEL);
  v_end = createVector(P_ORI_X, P_ORI_Y + P_UNIT_PIXEL);
  h_start = createVector(P_ORI_X - P_UNIT_PIXEL, P_ORI_Y);
  h_end = createVector(P_ORI_X + P_UNIT_PIXEL, P_ORI_Y);

  constructor(f1, f2, f3) {
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    let divider = (f1 ? 1 : 0) + (f2 ? 1 : 0) + (f3 ? 1 : 0);
    this.points = [];
    let yx = y(f1, f2, f3);
    for (let x = 0; x < P_X_MAX; x += 0.001) {
      this.points.push(createVector(x, yx(x) / divider))
    }
  }

  show(rps) {

    fill(200);

    // Draw Coordinate
    strokeWeight(2);
    fill(200);
    stroke(200);
    line(this.h_start.x, this.h_start.y, this.h_end.x, this.h_end.y);
    line(this.v_start.x, this.v_start.y, this.v_end.x, this.v_end.y);
    customTriangle(this.v_start.x, this.v_start.y, 15, 0);
    customTriangle(this.h_end.x, this.h_end.y, 15, HALF_PI);
    customTriangle(this.v_end.x, this.v_end.y, 15, PI);
    customTriangle(this.h_start.x, this.h_start.y, 15, HALF_PI + PI);

    // Draw grid
    strokeWeight(2);
    stroke(0, 100, 100, 150);
    line(this.h_start.x, this.h_start.y - P_UNIT_PIXEL, this.h_end.x, this.h_end.y - P_UNIT_PIXEL);
    line(this.h_start.x, this.h_start.y - P_UNIT_PIXEL / 2, this.h_end.x, this.h_end.y - P_UNIT_PIXEL / 2);
    line(this.h_start.x, this.h_start.y + P_UNIT_PIXEL, this.h_end.x, this.h_end.y + P_UNIT_PIXEL);
    line(this.h_start.x, this.h_start.y + P_UNIT_PIXEL / 2, this.h_end.x, this.h_end.y + P_UNIT_PIXEL / 2);
    line(this.v_start.x - P_UNIT_PIXEL / 2, this.v_start.y, this.v_end.x - P_UNIT_PIXEL / 2, this.v_end.y);
    line(this.v_start.x - P_UNIT_PIXEL, this.v_start.y, this.v_end.x - P_UNIT_PIXEL, this.v_end.y);
    line(this.v_start.x + P_UNIT_PIXEL / 2, this.v_start.y, this.v_end.x + P_UNIT_PIXEL / 2, this.v_end.y);
    line(this.v_start.x + P_UNIT_PIXEL, this.v_start.y, this.v_end.x + P_UNIT_PIXEL, this.v_end.y);

    // text
    noStroke(0);
    textSize(30);
    text(`${rps.toFixed(2)} cycles/seconds`, this.v_start.x, this.v_start.y + 30);
    fill(200, 50, 50);
    text(`Center of Mass`, this.v_end.x, this.v_end.y - 10);

    // Draw Curve
    noFill();
    stroke(230, 230, 0);
    strokeWeight(3);
    push();
    translate(P_ORI_X, P_ORI_Y);
    beginShape();
    let sumX = 0;
    let sumY = 0;
    for (let p of this.points) {
      let angle = (p.x % rps) * TWO_PI * rps;
      let x = p.y * cos(angle);
      let y = p.y * sin(angle);
      vertex(x * P_UNIT_PIXEL, y * P_UNIT_PIXEL);
      sumX += x;
      sumY += y;
    }
    endShape();

    let mX = sumX / this.points.length;
    let mY = sumY / this.points.length;
    strokeWeight(10);
    stroke(200, 50, 50);
    point(mX * P_UNIT_PIXEL, mY * P_UNIT_PIXEL);
    pop();
    return createVector(mX, mY);
  }
}