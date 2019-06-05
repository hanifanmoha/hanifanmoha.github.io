let track

function setup() {
	createCanvas(windowWidth, windowHeight)
	track = new Track()
}

function draw() {
	background(0)
	track.show()
	let vehicle = new Vehicle()
	vehicle.show(track.walls)
}