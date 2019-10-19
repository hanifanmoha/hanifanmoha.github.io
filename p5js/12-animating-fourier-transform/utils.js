const y = (f1, f2, f3) => (x) => sin(x * TWO_PI * f1) + sin(x * TWO_PI * f2) + sin(x * TWO_PI * f3)

function customTriangle(x, y, w, theta) {
  push();
  translate(x, y);
  rotate(theta);
  strokeWeight(0);
  triangle(-0.5 * w, 0, 0.5 * w, 0, 0, -w);
  pop();
}

function dashline(x1, y1, x2, y2, repeat) {
  let start = createVector(x1, y1);
  let end = createVector(x2, y2);
  let dir = end.sub(start).div(repeat * 2);
  for(let i=0; i<repeat; i++) {
    let p1 = start;
    let p2 = start.copy().add(dir);
    line(p1.x, p1.y, p2.x, p2.y);
    start.add(dir).add(dir);
  }
}