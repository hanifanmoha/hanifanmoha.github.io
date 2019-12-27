const REPEAT = 12
const MIRROR = true

let SIZE

let myCanvas

function setup() {
	if(windowWidth < windowHeight) {
		SIZE = windowWidth / 2 - 10
	} else {
		SIZE = windowHeight / 2 - 40
	}
	myCanvas = createCanvas(SIZE*2, SIZE*2)
	myCanvas.parent('canvasContainer')
	angleMode(DEGREES)
	background(0)
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
	if(mouseX < 0 || mouseX > width) return false
	if(mouseY < 0 || mouseY > height) return false
	if(pmouseX < 0 || pmouseX > width) return false
	if(pmouseY < 0 || pmouseY > height) return false
	return true
}

function saveCurrentCanvas() {
	let filename = `Snowflake_${(new Date()).getTime()}`
	saveCanvas(myCanvas, filename, 'png');
}