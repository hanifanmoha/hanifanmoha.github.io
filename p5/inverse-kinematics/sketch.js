
let target;
let tentacles = [];

function setup() {
	createCanvas(600, 400);
	target = new Circle(width/2, height/2, 50, PI/2, 4);
	tentacles.push(new Tentacle(width/2, 0, 6));
	tentacles.push(new Tentacle(0, height, 5));
	tentacles.push(new Tentacle(width, height, 5));
}

function mousePressed() {
	target.x = mouseX;
	target.y = mouseY;
}

function draw() {
	background(0, 0, 255);

	target.update();
	target.show();
	for(let i=0; i<tentacles.length; i++) {
		tentacles[i].show(target.x, target.y);
	}
	
}