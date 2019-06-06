const MAX_SPEED = 3
const MAX_FORCE = 0.1
const N_SENSOR = 12

class Vehicle {

  constructor(x, y, parent) {
    this.pos = createVector(x, y)
    this.vel = createVector(-1, 1)
    this.acc = createVector()
    this.alive = true
    this.brain = new Brain(N_SENSOR + 2, N_SENSOR, 4)
    this.sensing = Array(N_SENSOR + 2).fill(100)
    this.score = 0
    if (parent) {
      this.brain.inherit(parent.brain)
    }
  }

  steerForce() {
    let [xp, xn, yp, yn] = this.brain.predict(this.sensing)
    if(xp - xn === 0 && yp - yn === 0) {
      xp += 0.1
      yp += 0.1
    }
    let desired = createVector(xp - xn, yp - yn)
    desired.normalize()
    desired.mult(MAX_SPEED)

    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(MAX_FORCE)
    return steer
  }

  update() {
    this.acc.add(this.steerForce())
    this.vel.add(this.acc).limit(MAX_SPEED)
    this.pos.add(this.vel)
    this.acc.mult(0)
    this.updateScore()
  }

  updateScore() {
    push()
    let posDir = p5.Vector.sub(this.pos, createVector(width/2, height/2))
    let newAngle = (posDir.heading() + 360) % 360
    if(newAngle - this.score < 0) this.alive = false
    else if(newAngle > this.score) this.score = newAngle
    pop()
  }

  show(walls) {
    // Triangle
    push()
    angleMode(DEGREES)
    translate(this.pos.x, this.pos.y)
    let a = this.vel.copy().setMag(20)
    let b = this.vel.copy().setMag(10).rotate(120)
    let c = this.vel.copy()
    let d = this.vel.copy().setMag(10).rotate(240)
    fill(0, 255, 0, 150)
    noStroke()
    beginShape()
    vertex(a.x, a.y)
    vertex(b.x, b.y)
    vertex(c.x, c.y)
    vertex(d.x, d.y)
    endShape(CLOSE)
    stroke(255)
    strokeWeight(10)
    pop()
    // Sensor
    let sensing = []
    for (let i = 0; i < N_SENSOR; i++) {
      let angle = i * 360 / N_SENSOR
      let sensor = new Sensor(this.pos.x, this.pos.y, angle)
      let distance = sensor.show(walls)
      sensing.push(distance)
    }
    if (min(sensing) < 3) {
      this.alive = false
    }
    this.sensing = [this.vel.x, this.vel.y, ...sensing]
  }

}