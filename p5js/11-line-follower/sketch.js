const POPULATION = 50
const MUTATION_RATE = 0.1
const START_ANGLE = 1

let track
let vehicles = []
let startPosition
let maxScore = 0
let slider


function setup() {
	angleMode(DEGREES)
	slider = createSlider(1, 100, 1);
  slider.position(20, 20);
	createCanvas(1000, 700)
	track = new Track()
	startPosition = createVector(width / 2, height / 2).add(createVector(1, 0).rotate(START_ANGLE).setMag(280))
	for (let i = 0; i < POPULATION; i++) {
		vehicles.push(new Vehicle(startPosition.x, startPosition.y))
	}
}

function getParents() {
	return vehicles.sort((a, b) => b.score - a.score).slice(0, 10)
}

function getParent(val, parents) {
	for (let p of parents) {
		if (val < p.tempScore) {
			return p
		}
		else val -= p.tempScore
	}

}

function reborn() {
	let parents = vehicles.sort((a, b) => b.score - a.score)
	parents = parents.map((p, index) => ({
		tempScore: p.score + (POPULATION - index) / 2,
		...p
	}))
	let sumScore = parents
		.reduce((sum, p) => sum + p.tempScore, 0)
	let newVehicles = []
	for (let i = 0; i < POPULATION - 1; i++) {
		let val = random(sumScore)
		let parent = getParent(val, parents)
		newVehicles.push(new Vehicle(startPosition.x, startPosition.y, parent))
	}
	let lastBest = new Vehicle(startPosition.x, startPosition.y)
	lastBest.brain = parents[0].brain
	newVehicles.push(lastBest)
	vehicles = newVehicles
}

function draw() {
	background(0)
	track.show()

	let len = 0

	for (let i = 0; i < slider.value(); i++) {
		for (let vehicle of vehicles) {
			if (vehicle.alive) {
				vehicle.update()
				vehicle.show(track.walls)
			}
		}
		len = vehicles.filter(v => v.alive).length
		let tempScore = max(vehicles.map(v => v.score))
		if (len === 0) {
			if (tempScore > maxScore) {
				maxScore = tempScore
			}
			reborn()
		}
	}

	push()
	translate(width / 2, height / 2)
	textAlign(CENTER, CENTER)
	fill(255)
	textSize(40)
	text(len, 0, -20)
	textSize(20)
	text(`Record : ${maxScore.toFixed(2)}`, 0, 20)
	let x = createVector(1, 0).setMag(350).rotate(maxScore)
	fill(255, 200)
	line(0, 0, x.x, x.y)
	pop()
}