const WINDOW_WIDTH = 1000;
const WINDOW_HEIGHT = 650;

let f1, f2, f3;

let cartessian;
let cartessian2;
let polar;
let rps;
let coms = [];

function setup() {
	let cvs = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
	cvs.parent('canvas-container');
	initValue();
	rps = 2;
}

function initValue() {
	let xs = [3,4,5,6,7,8,9,10,11];
	f1 = random(xs);
	xs.splice(xs.indexOf(f1),1);
	f2 = random(xs);
	xs.splice(xs.indexOf(f2),1);
	f3 = random(xs);

	cartessian = new Cartessian(f1, f2, f3);
	polar = new Polar(f1, f2, f3);
	cartessian2 = new Cartessian2();
}

function draw() {
	background(0);
	textFont('Times New Roman');
	textAlign(CENTER);
	stroke(0);
	fill(200)
	textSize(30);
	let title = `fx = sin(2\u03C0${f1}) + sin(2\u03C0${f2}) + sin(2\u03C0${f3})`
	text(title, WINDOW_WIDTH/2, 50);
	

	cartessian.show(rps);
	let m = polar.show(rps);
	coms.push(createVector(rps, m.mag()));
	cartessian2.show(coms);

	rps += 0.01
	if(rps >= 12){
		initValue();
		rps = 2;
		coms = [];
	} 
	frameRate(50)
}