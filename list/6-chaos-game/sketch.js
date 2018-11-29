
const radius = 100;
const nLayer = 20;
const N = 500;

let edges = [];
let angle = 0;
let currentPoint;
let previousIndex;
let currentIndex;
let indexShape;
let layers = [];
let counter = 0;
let activeShape;

function setup() {
	createCanvas(radius*2, radius*2);
	background(0);
	currentPoint = createVector(0, 0);
	currentIndex = 0;
	indexShape = 0;	
	createEdges();
	for (let i = 0; i < nLayer; i++) {
		layers.push([]);
	}
	counter = 0;
}

function draw() {
	background(0);
	fill(255);

	// Create Points
	let newLayer = [];
	for (let i = 0; i < N; i++) {
		let newIndex, target;
		do {
			newIndex = floor(random(0, activeShape.N));
			target = edges[newIndex];
		} while(
			activeShape.X.indexOf(currentIndex - newIndex) >= 0 ||
			activeShape.X2.indexOf(previousIndex - newIndex) >= 0
		)
		previousIndex = currentIndex;
		currentIndex = newIndex;
		currentPoint.x = (currentPoint.x + target.x) / 2;
		currentPoint.y = (currentPoint.y + target.y) / 2;
		currentPoint.z = edges.indexOf(target);
		newLayer.push(currentPoint.copy());
	}
	layers.shift();
	layers.push(newLayer);


	// Show Points
	translate(width / 2, height / 2);
	rotate(angle);
	for (let k=0; k<layers.length; k++) {
		let layer = layers[k];
		let alpha = 2 * k * 255 / (nLayer);
		for (let p of layer) {
			setColor(p.z, alpha);
			strokeWeight(radius / 100);
			point(p.x, p.y);
		}
	}

	// frameRate(20);
	counter += 1;
	if(counter > nLayer * 2) {
		createEdges();
		counter = 0;
	}
	angle += 0.005;
}

function createEdges() {
	edges = [];
	activeShape = shapes[indexShape];
	let offset = random(TWO_PI);
	for (let i = 0; i < activeShape.N; i++) {
		let x = radius * cos(i * TWO_PI / activeShape.N + offset);
		let y = radius * sin(i * TWO_PI / activeShape.N + offset);
		edges.push(createVector(x, y));
	}
	indexShape = (indexShape + 1) % shapes.length;
}

function setColor(index, alpha) {
	switch (index) {
		case 0: 
			stroke(255, 255, 0, alpha);
			break;
		case 1:
			stroke(255, 0, 0, alpha);
			break;
		case 2:
			stroke(0, 255, 0, alpha);
			break;
		case 3:
			stroke(0, 0, 255, alpha);
			break;
		case 4:
			stroke(255, 0, 255, alpha);
			break;
	}
	stroke(255, alpha);
}

const shapes = [
	{
		N : 4,
		X : [],
		X2 : [0]
	},
	{
		N : 5,
		X : [1, 2, -3, -4],
		X2 : []
	},
	{
		N : 4,
		X : [0],
		X2 : []
	},
	{
		N : 5,
		X : [-1, 0, 4],
		X2 : []
	},
	{
		N : 4,
		X : [1, -3],
		X2 : []
	},
	{
		N : 5,
		X : [0],
		X2 : [0]
	},
]