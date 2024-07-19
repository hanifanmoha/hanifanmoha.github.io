const BOARD_W = 31;
const BOARD_H = 31;
const H_OFFSET = 50;
const SIZE = 15;
const SPACE = 1;

let board;
let snake;
let gameOver;

let food;
let score;
let highScore;

function setup() {
	highScore = localStorage.highScore || 0;
	let w = BOARD_W * (SIZE + SPACE) + SPACE;
	let h = BOARD_H * (SIZE + SPACE) + SPACE + H_OFFSET;
	createCanvas(w, h);
	board = [];
	for (let i = 0; i < BOARD_H; i++) {
		board.push([]);
		for (let j = 0; j < BOARD_W; j++) {
			board[i].push(new Block(i, j));
		}
	}
	gameOver = false;
	snake = new Snake(BOARD_W/2, BOARD_H/2);
	createFood();
	score = 0;
}

function draw() {
	background(30);
	for (row of board) {
		for (block of row) {
			block.show();
		}
	}
	food.show();
	snake.update();
	if(snake.hitWall() || snake.hitSelf()) {
		if(!gameOver) {
			gameOver = true;
			snake.kill();
			if(score > highScore) {
				localStorage.highScore = score;
			}
		}
	}

	snake.show();
	
	if(snake.eat(food.x, food.y)) {
		createFood();
		score++;
	}
	drawScoreBoard();
	drawGameOver();
	frameRate(10);
}

function drawScoreBoard() {
	fill(0);
	rectMode(CORNER);
	rect(0, 0, width, H_OFFSET);
	fill(255);
	// SCORE
	textSize(36);
	textAlign(RIGHT, TOP)
	text(score, width, 5);
	// TITLE
	textSize(20);
	textAlign(LEFT, TOP);
	text('BORING SIMPLE SILLY SNAKE GAME', 0, 5);
	textSize(12);
	text(`Highest Score : ${highScore}`, 0, 30);

}

function drawGameOver() {
	if(!gameOver) return;
	rectMode(CENTER);
	stroke(50);
	strokeWeight(3);
	fill(0);
	rect(width/2, height/2, width - 100, 200);
	textAlign(CENTER, CENTER);
	fill(255);
	textSize(24);
	let str = 'GAME OVER \n\n Press ENTER to restart.'
	text(str, width/2, height/2);
}

function createFood() {
	let fx = floor(random(BOARD_W - 1));
	let fy = floor(random(BOARD_H - 1));
	while(snake.reserve(fx, fy)) {
		fx = floor(random(BOARD_W - 1));
		fy = floor(random(BOARD_H - 1));
	}
	food = new Block(fx, fy, 0, 255, 0);
}

function keyPressed() {
	switch (keyCode) {
		case LEFT_ARROW:
			snake.setDir(DIRS.LEFT);
			break;
		case RIGHT_ARROW:
			snake.setDir(DIRS.RIGHT);
			break;
		case UP_ARROW:
			snake.setDir(DIRS.UP);
			break;
		case DOWN_ARROW:
			snake.setDir(DIRS.DOWN);
			break;
		case ENTER:
			if(gameOver) setup();
			break;
	}
}