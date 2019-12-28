const REPEAT = 12
const MIRROR = true

let SIZE
let myCanvas
let natureSound
let customMouseIsPressed = false

function reset(onload) {
	if(!onload) {
		natureSound.play()
	}
	background(0)
}

function setup() {
  natureSound = loadSound('NatureVoice.mp3');
	if(windowWidth < windowHeight) {
		SIZE = windowWidth / 2 - 10
	} else {
		SIZE = windowHeight / 2 - 80
	}
	myCanvas = createCanvas(SIZE*2, SIZE*2)
	myCanvas.parent('canvasContainer')
	angleMode(DEGREES)
	reset(true)
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
	let status = true
	status = status && customMouseIsPressed
	customMouseIsPressed = mouseIsPressed
	status = status && !(mouseX < 0 || mouseX > width)
	status = status && !(mouseY < 0 || mouseY > height)
	status = status && !(pmouseX < 0 || pmouseX > width)
	status = status && !(pmouseY < 0 || pmouseY > height)
	return status
}

function saveCurrentCanvas() {
	let filename = `Snowflake_${(new Date()).getTime()}`
	saveCanvas(myCanvas, filename, 'png');
}