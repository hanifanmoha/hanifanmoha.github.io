let particles = []
let arrows = []
let dusts = []
let dustNumber = 1000
let particleRadius = 50
let gridSize = 50
let maxForce

function setup() {
	createCanvas(windowWidth, windowHeight);

	// Init particles
	particles = [
		new Particle(
			random(particleRadius, width / 3),
			random(particleRadius, height - particleRadius),
			false
		),
		new Particle(
			random(width / 3, 2 * width / 3),
			random(particleRadius, height - particleRadius),
			true
		),
		new Particle(
			random(2 * width / 3, width - particleRadius),
			random(particleRadius, height - particleRadius),
			false
		),
	]

	// Init arrows
	for (let y = 0; y < height + gridSize; y += gridSize) {
		for (let x = 0; x < width + gridSize; x += gridSize) {
			arrows.push(new Arrow(x, y))
		}
	}

	// Init dusts
	while (dusts.length < dustNumber) {
		let dust = new Dust(
			random(width),
			random(height)
		)
		dusts.push(dust)
	}

	maxForce = 1 / (gridSize * gridSize)
}

function draw() {
	background(0)

	// draw grids
	for (let y = 0; y < height; y += gridSize) {
		for (let x = 0; x < width; x += gridSize) {
			noFill()
			strokeWeight(1)
			stroke(255, 50)
			rect(x, y, gridSize, gridSize)
		}
	}

	// draw forces
	for (let arrow of arrows) {
		arrow.show()
	}

	let dustToAdd = dustNumber - dusts.length
	// add dusts from random
	for (i = 0; i < dustToAdd / 2; i++) {
		let dust = new Dust(
			random(width),
			random(height)
		)
		dusts.push(dust)
	}

	// add dusts from positives
	let positives = particles.filter(p => p.positive)
	for (i = 0; i < dustToAdd / 2; i++) {
		let p = random(positives)
		let dust = new Dust(
			random(p.pos.x - particleRadius, p.pos.x + particleRadius),
			random(p.pos.y - particleRadius, p.pos.y + particleRadius)
		)
		dusts.push(dust)
	}

	// show dusts
	for (let dust of dusts) {
		dust.update(particles.filter(p => !p.positive))
		dust.show()
	}
	dusts = dusts.filter(d => d.active)

	// show particles
	for (let particle of particles) {
		// particle.update()
		particle.show()
	}

	// noLoop()
	frameRate(20)

}

function calcVec(x, y) {
	let result = createVector(0, 0)
	let vecPos = createVector(x, y)
	for (let particle of particles) {
		let r = dist(x, y, particle.pos.x, particle.pos.y)
		let dir = particle.positive ? p5.Vector.sub(vecPos, particle.pos) : p5.Vector.sub(particle.pos, vecPos)
		if (r === 0) r = 0.000000000000001
		dir.setMag(1 / (r * r))
		result.add(dir)
	}
	return result
}

function drawArrow(base, vec, myColor) {
	push();
	stroke(myColor);
	strokeWeight(3);
	fill(myColor);
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	let arrowSize = 7;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
}

// Classes

class Dust {
	constructor(x, y) {
		this.prevPos = createVector(x, y)
		this.pos = createVector(x, y)
		this.active = true
	}
	update(sinks) {
		this.prevPos = this.pos.copy()

		let force = calcVec(this.pos.x, this.pos.y)
		force.setMag(5)
		this.pos.add(force)
		for (let sink of sinks) {
			let d = dist(this.pos.x, this.pos.y, sink.pos.x, sink.pos.y)
			if (d < particleRadius / 2) {
				this.active = false
			}
		}
		if (this.pos.x < -width || this.pos.x > width * 2 |
			this.y < -height || this.y > height * 2) {
			this.active = false
		}
	}
	show() {
		stroke(63, 224, 208)
		strokeWeight(2)
		line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y)
	}
}

class Arrow {
	constructor(x, y) {
		this.pos = createVector(x, y)
	}
	show() {
		let force = calcVec(this.pos.x, this.pos.y)
		let forceMagnitude = force.mag()
		force.setMag(gridSize / 2)
		push()
		colorMode(HSB, 100)
		let H = map(forceMagnitude, 0, maxForce, 0, 100 / 3, true)
		let c = color(H, 100, 100)
		drawArrow(this.pos, force, c)
		pop()
	}
}

class Particle {
	constructor(x, y, positive) {
		this.pos = createVector(x, y)
		this.vel = createVector(random(-1, 1), random(-1, 1)).setMag(2)
		this.positive = positive
	}
	update() {
		this.pos.add(this.vel)
		if (this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1
		}
		if (this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1
		}
	}
	show() {
		ellipseMode(CENTER)
		noStroke()
		if (this.positive) {
			fill(255, 51, 51)
		} else {
			fill(31, 127, 249)
		}
		ellipse(this.pos.x, this.pos.y, particleRadius, particleRadius)
		fill(255)
		textAlign(CENTER, CENTER)
		textSize(40)
		if (this.positive) {
			text('+', this.pos.x, this.pos.y + 3)
		} else {
			text('-', this.pos.x, this.pos.y)
		}
	}
}