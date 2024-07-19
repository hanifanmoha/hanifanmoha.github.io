class Track {
  constructor(props) {
    this.walls = [
      // new Wall(50, 50, 750, 50),
      // new Wall(750, 50, 750, 550),
      // new Wall(750, 550, 50, 550),
      // new Wall(50, 550, 50, 50),
      // new Wall(150, 150, 650, 150),
      // new Wall(650, 150, 650, 450),
      // new Wall(650, 450, 150, 450),
      // new Wall(150, 450, 150, 150),
    ]
    for(let i=0; i<8; i++) {
      this.walls.push(new Wall(random(width), random(height), random(width), random(height)))
    }
  }

  show() {
    for (let wall of this.walls) {
      wall.show()
    }
  }
}