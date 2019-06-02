class Agent {

  constructor(nEnemy, parent) {
    this.brain = new Brain(6 + nEnemy * 4, nEnemy, nEnemy, 2)
    if(parent) this.brain.inherit(parent.brain)
    this.pos = createVector(random(width), random(height))
    this.hue = random(100)
    this.size = 10
    this.age = 0
    this.alive = true
  }

  update(enemies) {
    this.age += 1
    let input = enemies.reduce(
      (temp, enemy) => [
        ...temp,
        enemy.pos.x,
        enemy.pos.y,
        enemy.vel.x,
        enemy.vel.y
      ],
      [
        this.pos.x,
        this.pos.y,
        this.pos.x,
        this.pos.y,
        this.pos.x,
        this.pos.y,
      ]
    )
    let [dx, dy] = this.brain.predict(input)
    let vel = createVector(dx, dy)
    vel.limit(2)
    this.pos.add(vel)
    
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
    for(let enemy of enemies) {
      if(dist(enemy.pos.x, enemy.pos.y, this.pos.x, this.pos.y) < (this.size + enemy.size) / 2) {
        this.alive = false
      }
    }
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.alive = false
    }
  }

}