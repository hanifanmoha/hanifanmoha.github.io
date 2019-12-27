const REPEAT = 12
const MIRROR = true

let SIZE

let myCanvas

function reset() {
	background(0)
	stroke(255)
	fill(0)
	strokeWeight(1)
	ellipse(SIZE, SIZE, 2 * SIZE, 2 * SIZE)
}

function setup() {
	if(windowWidth < windowHeight) {
		SIZE = windowWidth / 2 - 10
	} else {
		SIZE = windowHeight / 2 - 40
	}
	myCanvas = createCanvas(SIZE*2, SIZE*2)
	myCanvas.parent('canvasContainer')
	angleMode(DEGREES)
	reset()
}

function draw() {
	push()
	translate(SIZE, SIZE)
	stroke(255)
	strokeWeight(3)
	if (isDraw()) {
		for (let i = 0; i < REPEAT; i++) {
			rotate(360 / REPEAT)
			if (i % 2 == 1 || !MIRROR) {
				line(pmouseX - SIZE, pmouseY - SIZE, mouseX - SIZE, mouseY - SIZE)
			} else {
				push()
				rotate(360 / REPEAT)
				scale(-1, 1)
				line(pmouseX - SIZE, pmouseY - SIZE, mouseX - SIZE, mouseY - SIZE)
				pop()
			}
		}
	}
	pop()
}

function isDraw() {
	if (!mouseIsPressed) return false
	let r1 = dist(mouseX, mouseY, SIZE, SIZE)
	if (r1 > SIZE) return false
	let r2 = dist(pmouseX, pmouseY, SIZE, SIZE)
	if (r2 > SIZE) return false
	return true
}