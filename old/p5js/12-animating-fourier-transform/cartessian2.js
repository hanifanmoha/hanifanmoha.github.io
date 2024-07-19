const C2_ORI_X = 450;
const C2_ORI_Y = 470;
const C2_X_MAX = 12;
const C2_Y_MIN = 2;
const C2_Y_MAX = 3;
const C2_X_UNIT_PIXEL = 40;
const C2_Y_UNIT_PIXEL = 40;

class Cartessian2 {

  v_start = createVector(C2_ORI_X, C2_ORI_Y - C2_Y_MAX * C2_Y_UNIT_PIXEL);
  v_end = createVector(C2_ORI_X, C2_ORI_Y + C2_Y_MIN * C2_Y_UNIT_PIXEL);
  h_start = createVector(C2_ORI_X, C2_ORI_Y);
  h_end = createVector(C2_ORI_X + C2_X_MAX * C2_X_UNIT_PIXEL, C2_ORI_Y);

  show(coms) {

    stroke(0,200,200);
    rect(400, 290, 580, 320);

    textAlign(LEFT);
    noStroke(0);
    textSize(30);
    fill(200, 50, 50);
    text(`Distance of center of mass to origin`, this.h_start.x + 30, this.v_start.y);

    // Draw Coordinate
    strokeWeight(2);
    stroke(200);
    fill(200);
    line(this.h_start.x, this.h_start.y, this.h_end.x, this.h_end.y);
    line(this.v_start.x, this.v_start.y, this.v_end.x, this.v_end.y);
    customTriangle(this.v_start.x, this.v_start.y, 15, 0);
    customTriangle(this.h_end.x, this.h_end.y, 15, HALF_PI);

    // Y axis grid
    for (let j = -C2_Y_MAX; j <= C2_Y_MIN; j += 1) {
      line(
        C2_ORI_X - 5,
        C2_ORI_Y + j * C2_Y_UNIT_PIXEL,
        C2_ORI_X + 5,
        C2_ORI_Y + j * C2_Y_UNIT_PIXEL
      )
    }

    // X axis grid
    for (let i = 0; i <= C2_X_MAX; i += 0.5) {
      let l = i === floor(i) ? 10 : 5;
      line(
        C2_ORI_X + i * C2_X_UNIT_PIXEL,
        C2_ORI_Y - l,
        C2_ORI_X + i * C2_X_UNIT_PIXEL,
        C2_ORI_Y + l
      )
    }

    // X label
    for (let i = 1; i <= C2_X_MAX; i++) {
      push();
      textAlign(CENTER, TOP);
      textSize(16);
      fill(200);
      text(i, C2_ORI_X + i * C2_X_UNIT_PIXEL, C2_ORI_Y + 15);
      pop();
    }
    textAlign(RIGHT);
    noStroke();
    textSize(20);
    fill(200);
    text(`Frequency`, this.h_end.x, this.h_end.y + 50);

    // Draw Curve
    noFill();
    strokeWeight(4);
    stroke(200, 50, 50);
    beginShape();
    for(let p of coms) {
      vertex(C2_ORI_X + p.x * C2_X_UNIT_PIXEL, C2_ORI_Y + p.y * C2_Y_UNIT_PIXEL * -15)
    }
    endShape();
  }

}