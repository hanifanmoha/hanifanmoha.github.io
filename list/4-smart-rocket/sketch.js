const lifeSpan = 200;
const N = 200;
const mutationRate = 0.001;
let rockets = [];
let obs = [];
let currentLife = 0;
let target;

function setup() {
	createCanvas(500, 300);
	createObs();
	rockets = [];
	for(let i=0; i<N; i++) {
		rockets.push(new Rocket());
	}
}

function draw() {
	background(0);
	text(currentLife, 450, 20);
	fill(0, 255, 0);
	rect(width-10,0,10,height);
	for(let i=0; i<obs.length; i++) {
		obs[i].show();
	}

	if(currentLife < 200) {
		for(let i=0; i<N; i++) {
			rockets[i].checkObs(obs);
			rockets[i].update();
			rockets[i].show();
		}
		currentLife++;
	} else {
		currentLife = 0;
		createRockets();
	}
}

function createRockets() {
	totalPoints = 0;
	for(let i=0; i<N; i++) {
		totalPoints += rockets[i].pos.x * 50;
	}
	for(let i=0; i<N; i++) {
		rockets[i].point = 5000 * rockets[i].pos.x / totalPoints;
	}
	let pools = [];
	for(let i=0; i<N; i++) {
		for(let j=0; j<rockets[i].point; j++) {
			pools.push(rockets[i].dna);
		}
	}
	console.log(pools.length);
	rockets = [];
	for(let i=0; i<N; i++) {
		let newRocket = new Rocket(random(pools), random(pools));
		newRocket.mutate(mutationRate);
		rockets.push(newRocket);
	}
}

function createObs() {
	obs.push(new Obstacle(100, 0, 20, 100));
	obs.push(new Obstacle(100, 200, 20, 100));
	obs.push(new Obstacle(250, 80, 20, 140));
	obs.push(new Obstacle(400, 0, 20, 100));
	obs.push(new Obstacle(400, 200, 20, 100));
}