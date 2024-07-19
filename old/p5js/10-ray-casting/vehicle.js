class Vehicle {
  constructor() {
    this.pos = createVector()
    this.nSensor = 360
  }
  show(walls) {
    this.pos = createVector(mouseX, mouseY)
    for(let i=0; i<this.nSensor; i++) {
      let angle = i * 360 / this.nSensor
      let sensor = new Sensor(this.pos.x, this.pos.y, angle)
      sensor.show(walls)
    }
  }
}