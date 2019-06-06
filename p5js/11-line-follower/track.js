const SECTION = 8
const MIN_RADIUS = 240
const AVG_RADIUS = 295
const MAX_RADIUS = 350

class Track {
  constructor(props) {
    angleMode(DEGREES)
    this.inout = []
    for (let angle = 0; angle < 360; angle += 360 / SECTION) {
      this.inout.push({
        in: createVector(width / 2, height / 2)
          .add(createVector(1, 1)
            .setMag(random(MIN_RADIUS, AVG_RADIUS - 20))
            .rotate(angle)),
        out: createVector(width / 2, height / 2)
          .add(createVector(1, 1)
            .setMag(random(AVG_RADIUS + 20, MAX_RADIUS))
            .rotate(angle))
      })
    }
    this.walls = []
    for (let i = 0; i < this.inout.length; i++) {
      let j = (i + 1) % this.inout.length;
      let { in: ini, out: outi } = this.inout[i]
      let { in: inj, out: outj } = this.inout[j]
      this.walls.push(new Wall(ini.x, ini.y, inj.x, inj.y))
      this.walls.push(new Wall(outi.x, outi.y, outj.x, outj.y))
    }
  }

  show() {
    for (let wall of this.walls) {
      wall.show()
    }
  }
}