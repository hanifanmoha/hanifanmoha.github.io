// const strTarget = 'to be or not to be that is the question';
const strTarget = 'what doesnt kill you makes you stronger.';
const target = strTarget.split('');
// const target = 'hello world'.split('');
const len = target.length;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}|. '.split('');
const spacing = 25;
const horizontalSpacing = 18;
const N = 2000;
let mutationRate = 0.003;
let samples = [];
let pools = [];

function setup() {
	createCanvas(800, 500);

	let y = 100;
	for(let i=0; i<N/2; i++) {
		samples.push(new Sample(30, y));
		samples.push(new Sample(400, y));
		y+=spacing;
	}
}

function draw() {
	background(230, 230, 230);

	createPools();
	createNewSample();
	mutateSamples(mutationRate);

	let best;
	let bestScore = 0;
	let ix = 0;
	for(let sample of samples) {
		if(sample.score > bestScore) {
			best = sample;
		}
		if(ix < 30) sample.show();
		ix++;
	}

	fill(0);
	textSize(35);
	textAlign(LEFT, TOP);
	let x = 30;
	for(let i=0; i<len; i++) {
		text(best.str[i], x, 30);
		x += textWidth(target[i]);
	}
	// stroke(0)
	line(30, 63, width - 100, 63);
	
	let finish = true;
	for(let i=0; i<len; i++) {
		if(best.str[i] != target[i]) finish = false;
	}
	if(finish) {
		// mutationRate = map(best.score, 0, len, 0.003, 0);
		mutationRate = 0;
	}
	// frameRate(20);
}

function createPools() {
	let sumScore = 0;
	pools = [];
	for(let sample of samples) {
		let score = sample.score;
		for(let i=0; i<score; i++) {
			pools.push(sample);
		}
	}
}

function getCrossover() {
	let p1 = random(pools);
	let p2 = random(pools);
	let index = Math.floor(random(len));
	let str = [];
	for(let i=0; i<index; i++) {
		str.push(p1.str[i]);
	}
	for(let i=index; i<len; i++) {
		str.push(p2.str[i]);
	}
	return str;
}

function createNewSample() {
	samples = [];
	let y = 100;
	for(let i=0; i<N/2; i++) {
		samples.push(new Sample(30, y, getCrossover()));
		samples.push(new Sample(400, y, getCrossover()));
		y+=spacing;
	}
}

function mutateSamples(rate) {
	for(let sample of samples) {
		sample.mutate(rate);
	}
}

class Sample {
	constructor(x, y, str) {
		this.x = x;
		this.y = y;
		if(!str) {
			this.str = [];
			for(let i=0; i<len; i++) {
				this.str.push(random(chars));
			}
		} else {
			this.str = str;
		}
	}

	mutate(rate) {
		for(let i=0; i<len; i++) {
			if(random() < rate) {
				this.str[i] = random(chars);
			}
		}
	}

	get score() {
		let sum = 0;
		for(let i=0; i<len; i++) {
			if(target[i] === this.str[i]) sum+=1;
		}
		return sum;
	}

	show() {
		fill(100);
		textSize(15);
		textAlign(LEFT, TOP);
		text(`${this.str.join('')}`, this.x, this.y);
	}
}