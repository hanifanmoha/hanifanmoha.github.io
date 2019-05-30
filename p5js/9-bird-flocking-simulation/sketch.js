let birds = [];
let predators = [];

let POPULATION;
const PREDATOR_POPULATION = 3;
const RADIUS = 50;

function setup() {
	POPULATION = windowWidth / 15;
	console.log(windowWidth, POPULATION)
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < POPULATION; i++) {
		birds.push(new Bird());
	}
	for (let i = 0; i < PREDATOR_POPULATION; i++) {
		predators.push(new Predator());
	}
}

function draw() {
	background(0);
	for (let predator of predators) {
		predator.update();
		predator.show();
	}
	for (let bird of birds) {
		bird.align(birds, RADIUS);
		bird.separate(birds, RADIUS);
		bird.cohesion(birds, RADIUS);
		for (let predator of predators) {
			bird.avoid(predator, RADIUS);
		}
		bird.doRandom();
		bird.update();
		bird.show();
	}
}