class Sensor {

  constructor(x, y, angle) {
    this.x = x
    this.y = y
    this.angle = angle
  }

  calculateY(x) {
    angleMode(DEGREES)
    return tan(this.angle) * (this.x - x) + this.y
  }

  rayLine() {
    angleMode(DEGREES)
    return {
      a: createVector(this.x, this.y),
      b: createVector(this.x, this.y).add(createVector(1000, 0).rotate(this.angle))
    }
  }

  getNearest(walls) {
    let minDist = Infinity
    let nearest = createVector()
    for (let wall of walls) {
      let p = wall.intersect(this.x, this.y, this.angle)
      let d = dist(this.x, this.y, p.x, p.y)
      if(d < minDist) {
        minDist = d
        nearest = p
      }
    }
    return {
      p : nearest,
      dist: minDist
    }
  }

  show(walls) {
    strokeWeight(1)
    stroke(255)
    let {p, dist} = this.getNearest(walls)
    line(this.x, this.y, p.x, p.y)
  }

}