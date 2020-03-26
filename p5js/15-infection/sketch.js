const STATUS_NONE = 1111
const STATUS_INFECTED = 2222
const STATUS_CURED = 3333

let INFECTION_PERIOD = 500
const INFECTION_PROBABILITY = 0.4
const INITIAL_INFECTION = 2
const SLIT = 5
const MAX_RECORDS = 300

let N = 120
let arenas = []
let records = []
let arenaSize = 0
let index = 0

function setup() {
	let size = windowHeight < windowWidth ? windowHeight : windowWidth
	INFECTION_PERIOD = size / 2
	arenaSize = size / 2
	createCanvas(size + 1, size + 1)
	arenas = [
		new Arena(arenaSize, 0, arenaSize, 0),
		new Arena(0, arenaSize, arenaSize, 1),
		new Arena(arenaSize, arenaSize, arenaSize, 6),
	]
}

function draw() {
	index++
	background(0)

	// for(let arena of arenas) print(arena)
	for (let arena of arenas) arena.update()
	for (let arena of arenas) arena.show()

	let r0 = arenas[0].calculateInfected()
	let r1 = arenas[1].calculateInfected()
	let r2 = arenas[2].calculateInfected()
	if (index % 4 === 0 && records.length < MAX_RECORDS) {
		records.push([r0, r1, r2])
	}

	stroke(255)
	strokeWeight(1)
	fill(0)
	rect(0, 0, arenaSize, arenaSize)

	// Draw Chart
	let x1 = 20
	let x2 = arenaSize - 20
	let y = arenaSize - 50

	let c0 = 0
	let c1 = 0
	let c2 = 0
	let ww = (x2 - x1) / MAX_RECORDS
	for (let i = 0; i < records.length; i += 1) {
		let mm = 3
		let v0 = records[i][0] * mm
		let v1 = records[i][1] * mm
		let v2 = records[i][2] * mm
		strokeWeight(2)
		stroke(255, 0, 0)
		line(x1 + ww * i, y - c0, x1 + ww * (i + 1), y - v0)
		stroke(0, 0, 255)
		line(x1 + ww * i, y - c1, x1 + ww * (i + 1), y - v1)
		stroke(0, 255, 0)
		line(x1 + ww * i, y - c2, x1 + ww * (i + 1), y - v2)
		c0 = v0
		c1 = v1
		c2 = v2
	}
}

class Arena {
	constructor(x, y, s, w) {
		this.x = x
		this.y = y
		this.s = s
		this.w = w
		this.walls = []

		this.turtles = []
		for (let i = 0; i < N; i++) {
			this.turtles.push(
				new Turtle(
					random(this.x, this.x + this.s),
					random(this.y, this.y + this.s),
				)
			)
		}
		this.turtles.slice(0, INITIAL_INFECTION).map(t => {
			t.status = STATUS_INFECTED
		})

		for (let i = 0; i <= this.w; i++) {
			for (let j = 0; j <= this.w; j++) {
				let x = (i + 1) / (this.w + 1) * this.s
				let y1 = (j + 0) / (this.w + 1) * this.s
				let y2 = (j + 1) / (this.w + 1) * this.s
				this.walls.push(new Wall(this.x + x, this.y + y1 + SLIT, this.y + y2 - SLIT, true))
				this.walls.push(new Wall(this.y + x, this.x + y1 + SLIT, this.x + y2 - SLIT, false))
			}
		}

	}

	calculateInfected() {
		return this.turtles
			.filter(t => t.status === STATUS_INFECTED)
			.length
	}

	update() {
		let infectedTurtles = this.turtles.filter(t => t.status === STATUS_INFECTED)
		for (let turtle of this.turtles) {
			turtle.update()
			turtle.edge(this.x, this.x + this.s, this.y, this.y + this.s)
			turtle.hit(this.walls)
		}
		for (let turtle of this.turtles.filter(t => t.status === STATUS_NONE)) {
			turtle.infect(infectedTurtles)
		}

	}

	show() {

		// Draw Border
		stroke(255)
		fill(0)
		strokeWeight(1)
		rect(this.x, this.y, this.s, this.s)

		// Draw walls
		stroke(255)
		strokeWeight(1)
		for (let wall of this.walls) wall.show()

		for (let turtle of this.turtles) turtle.show()
	}
}

class Wall {
	constructor(s, a, b, isVertical) {
		this.s = s
		this.a = a
		this.b = b
		this.isVertical = isVertical
	}

	hit(x, y) {
		if (this.isVertical) {
			if (y > this.a && y < this.b && abs(x - this.s) <= 1) {
				return true
			}
		} else {
			if (x > this.a && x < this.b && abs(y - this.s) <= 1) {
				return true
			}
		}
		return false
	}

	show() {
		stroke(255)
		strokeWeight(1)
		if (this.isVertical) {
			line(this.s, this.a, this.s, this.b)
		} else {
			line(this.a, this.s, this.b, this.s)
		}
	}
}

class Turtle {
	constructor(x, y) {
		this.pos = createVector(x, y)
		this.vel = p5.Vector.random2D();
		this.vel.setMag(1)
		this.size = 4
		this.infectionTime = 0
		this.status = STATUS_NONE
	}

	update() {
		this.pos.add(this.vel)
		if (this.status === STATUS_INFECTED) {
			this.infectionTime += 1
		}
		if (this.infectionTime > INFECTION_PERIOD) {
			this.status = STATUS_CURED
		}
	}

	infect(infectedTurtles) {
		if (this.status != STATUS_NONE) return
		for (let inf of infectedTurtles) {
			let d = dist(this.pos.x, this.pos.y, inf.pos.x, inf.pos.y)
			if (d <= this.size * 1 && random() < INFECTION_PROBABILITY) {
				this.status = STATUS_INFECTED
			}
		}
	}

	edge(minX, maxX, minY, maxY) {
		if (this.pos.x < minX || this.pos.x > maxX) {
			this.vel.x *= -1
		}
		if (this.pos.y < minY || this.pos.y > maxY) {
			this.vel.y *= -1
		}
	}

	hit(walls) {
		let vers = walls.filter(w => w.isVertical)
		for (let verWall of vers) {
			if (verWall.hit(this.pos.x, this.pos.y)) {
				this.vel.x *= -1
				return
			}
		}

		let hors = walls.filter(w => !w.isVertical)
		for (let horWall of hors) {
			if (horWall.hit(this.pos.x, this.pos.y)) {
				this.vel.y *= -1
				return
			}
		}
	}

	show() {
		if (this.status === STATUS_CURED) {
			stroke(0, 255, 0)
		} else if (this.status === STATUS_INFECTED) {
			stroke(255, 0, 0)
		} else {
			stroke(255)
		}
		strokeWeight(this.size)
		point(this.pos.x, this.pos.y)
	}
}