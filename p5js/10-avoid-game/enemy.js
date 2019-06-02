class Enemy {

  constructor() {
    this.pos = createVector(random(width), random(height))
    this.vel = createVector(random(-1, 1), random(-1, 1)).setMag(3)
    this.size = 30
  }

  update() {
    this.pos.add(this.vel)
    this.pos.x = (this.pos.x + width) % width
    this.pos.y = (this.pos.y + height) % height
    // if(this.pos.x > width || this.pos.x < 0) this.vel.x *= -1
    // if(this.pos.y > height || this.pos.y < 0) this.vel.y *= -1
  }

  show() {
    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
  }

}