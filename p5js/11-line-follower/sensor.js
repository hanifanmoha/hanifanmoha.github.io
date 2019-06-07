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

  getNearest(walls) {
    angleMode(DEGREES)
    let minDist = Infinity
    let nearest = createVector(this.x, this.y).add(createVector(1, 0).rotate(this.angle).setMag(5000))
    for (let wall of walls) {
      let p = wall.intersect(this.x, this.y, this.angle)
      let d = dist(this.x, this.y, p.x, p.y)
      if (d < minDist) {
        minDist = d
        nearest = p
      }
    }
    return {
      p: nearest,
      distance: minDist
    }
  }

  show(walls) {
    strokeWeight(1)
    stroke(255, 50)
    let { p, distance } = this.getNearest(walls)
    if (sensorCheckbox.checked()) {
      line(this.x, this.y, p.x, p.y)
    }
    return distance
  }

}