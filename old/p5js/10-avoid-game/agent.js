class Agent {

  constructor(nEnemy, parent) {
    this.brain = new Brain(nEnemy * 4, nEnemy, 4)

    this.pos = createVector(random(width), random(height))
    this.vel = createVector()
    this.hue = random(100)
    this.size = 10
    this.age = 0
    this.alive = true
    if (parent) {
      this.brain.inherit(parent.brain)
      this.hue = (parent.hue + random(-2, 2)) % 100
    }
  }

  update(enemies) {
    this.age += 1
    let input = enemies.reduce(
      (temp, enemy) => [
        ...temp,
        enemy.pos.x - this.pos.x,
        enemy.pos.y - this.pos.y,
        enemy.vel.x,
        enemy.vel.y
      ],
      []
    )
    let [pdx, ndx, pdy, ndy] = this.brain.predict(input)
    let acc = createVector(pdx - ndx, pdy - ndy)
    this.vel.add(acc)
    this.vel.limit(2)
    this.pos.add(this.vel)

    this.pos.x = (this.pos.x + width) % width
    this.pos.y = (this.pos.y + height) % height
  }

  show() {
    noStroke()
    push()
    colorMode(HSB, 100)
    fill(this.hue, 100, 100)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    pop()
  }

  check(enemies) {
    for (let enemy of enemies) {
      if (dist(enemy.pos.x, enemy.pos.y, this.pos.x, this.pos.y) < (this.size + enemy.size) / 2) {
        this.alive = false
      }
    }
  }

}