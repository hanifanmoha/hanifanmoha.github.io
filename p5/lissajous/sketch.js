let width = 500;
let height = 500;

let w = width / 5;
let hor = [];
let ver = [];
let shapes = [];

let angle = 0;

function setup() {
	createCanvas(width, height);

	for(let i=0; i<4; i++) {
		let pos = i * w + 1.5*w;
		hor.push(new Circle(pos, w/2, 80, i+1, 0));
		ver.push(new Circle(w/2, pos, 80, i+1, 1));
	}

	for(let i=0; i<4; i++) {
		shapes.push([]);
		for(let j=0; j<4; j++) {
			shapes[i].push(new Shape());
		}
	}
}

function draw() {
	background(0);
	showCircle();
	addPoint();

	angle += 0.01;
	if(angle > TWO_PI) {
		resetShape();
		angle = 0;
	}
}

function showCircle() {
	for(let i=0; i<4; i++) {
		hor[i].update().show();
		ver[i].update().show();
	}
}

function addPoint() {
	for(let i=0; i<4; i++) {
		for(let j=0; j<4; j++) {
			shapes[i][j].addPoint(hor[i].px, ver[j].py);
			shapes[i][j].show();
		}
	}
}

function resetShape() {
	for(let i=0; i<4; i++) {
		for(let j=0; j<4; j++) {
			shapes[i][j].reset();
		}
	}
}