const N_ENEMY = 10
const N_AGENT = 200
const MUTATION_RATE = 0.005

let enemies = []
let agents = []
let highest = 0
let generation = 0

function setup() {
	// frameRate(1)
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < N_ENEMY; i++) {
		enemies.push(new Enemy())
	}

	for (let i = 0; i < N_AGENT; i++) {
		agents.push(new Agent(N_ENEMY))
	}
}

function getParent(val) {
	let parents = agents
	// .sort((a, b) => b.age - a.age)
	// .slice(0, 10)
	for (let agent of parents) {
		if (val < agent.age) return agent
		else val -= agent.age
	}
}

function reborn() {
	let sumAge = agents
	// .sort((a, b) => b.age - a.age)
	// .slice(0, 10)	
	.reduce((sum, agent) => sum + agent.age, 0)
	let newAgents = []
	for (let i = 0; i < N_AGENT; i++) {
		let r = random(sumAge)
		let parent = getParent(random(sumAge))
		newAgents.push(new Agent(N_ENEMY, parent))
	}
	agents = newAgents
	generation++
}

function draw() {
	background(0, 100)

	for (let enemy of enemies) {
		enemy.update()
		enemy.show()
	}

	for (let agent of agents) {
		if (agent.alive) {
			agent.update(enemies)
			agent.check(enemies)
			agent.show()
		}
	}

	let totalCurrentAgent = agents.filter(agent => agent.alive).length
	if (totalCurrentAgent <= 0) {
		reborn()
	}

	let maxAge = agents.reduce((max, agent) => Math.max(max, agent.age), 0)
	if(maxAge > highest) {
		highest = maxAge
	}

	fill(255, 255, 0)
	text(`Highest : ${highest}`, 30, 30)
	text(`Current Score : ${maxAge}`, 30, 60)
	text(`Active agent : ${totalCurrentAgent}`, 30, 90)
	text(`Generation : ${generation}`, 30, 120)

}