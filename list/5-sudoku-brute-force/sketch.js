let sudoku;

let isFix = [];
let fRow = [];
let fColumn = [];
let fBlock = [];
let r, c;
let forward = true;
let sliderFrameRate;
let sliderIteration;
let resetButton;

function preload() {
	font = loadFont('OperatorMono-Medium.otf');
}

function setup() {
	createCanvas(600, 600);
	textFont(font);
	initButtonSlider();
	initSudoku();
}

function initSudoku() {
	sudoku = getSudoku();
	initFlag();
	initDraw();
	r = 1;
	c = 1;
	noLoop();
	loop();
}

// Draw Approach
function draw() {
	for (let i = 0; i < sliderIteration.value(); i++) {
		if (r < 1) {
			r = 1;
			c = 1;
			drawAll();
			console.log('failed');
			noLoop();
			return;
		}
		if (r > 9) {
			r = 10;
			c = 0;
			drawAll();
			console.log('finish');
			noLoop();
			return;
		}

		// If cell is filled by problem
		if (isFix[r][c]) {
			if (forward) {
				goForward();
			} else {
				goBack();
			}
			continue;
		}

		// Get new number
		if (forward) {
			sudoku[r][c] = 0;
		} else {
			let num = sudoku[r][c];
			fRow[r][num] = false;
			fColumn[c][num] = false;
			fBlock[ceil(r / 3)][ceil(c / 3)][num] = false;
		}

		let num;
		let status = true;
		while (status) {
			num = ++sudoku[r][c];
			if (num > 9) {
				sudoku[r][c] = 0;
				break;
			};
			status = fRow[r][num];
			status = status || fColumn[c][num];
			status = status || fBlock[ceil(r / 3)][ceil(c / 3)][num];
		}

		fRow[r][num] = true;
		fColumn[c][num] = true;
		fBlock[ceil(r / 3)][ceil(c / 3)][num] = true;

		if (num > 9) {
			// Go back
			goBack();
			forward = false;
		} else {
			// Go forward
			goForward();
			forward = true;
		}
	}
	frameRate(sliderFrameRate.value());
	drawAll();
}

function drawAll() {
	let activeRow, activeCol;
	if(forward) {
		activeRow = before().r;
		activeCol = before().c;
	} else {
		activeRow = r;
		activeCol = c;
	}
	for(let i=1; i<=9; i++) {
		for(let j=1; j<=9; j++) {
			let text = sudoku[i][j] > 0 ? sudoku[i][j] : '';
			drawRect(i, j, text, activeRow, activeCol);
		}
	}
}

function goBack() {
	c -= 1;
	if (c < 1) {
		c = 9;
		r -= 1;
	}
}

function goForward() {
	c += 1;
	if (c > 9) {
		c = 1;
		r += 1;
	}
}

function before() {
	let bR = r;
	let bC = c - 1;
	if(bC < 1) {
		bR = r-1;
		bC = 9;
	}
	return { r : bR, c : bC };
}

function initButtonSlider() {
	fill(0);
	textSize(20);
	text('# of Iteration', 50, 535);
	sliderIteration = createSlider(1, 1000, 10);
	sliderIteration.position(50, 550);
	text('Frame Rate', 250, 535);
	sliderFrameRate = createSlider(1, 60, 60);
	sliderFrameRate.position(250, 550);
	resetButton = createButton('RESET');
	resetButton.position(420, 525);
	resetButton.mousePressed(initSudoku)
}

function drawRect(row, col, num, activeRow, activeCol) {
	push();
	noStroke();
	if(row === activeRow && col === activeCol) {
		fill(255, 255, 0);
	} else if(isFix[row][col]) {
		fill(230);
	} else {
		fill(255);
	}
	rectMode(CENTER);
	let x = col * 55 + 5 * ceil(col / 3) - 25;
	let y = row * 55 + 5 * ceil(row / 3) - 25;
	rect(x, y, 48, 48, 5, 5, 5, 5);
	if(isFix[row][col]) {
		fill(0);
	} else {
		fill(0);
	}
	textAlign(CENTER, CENTER);
	textSize(isFix[row][col] ? 32 : 24);
	text(num, x, y-5);
	pop();
}

function initDraw() {
	for (let i = 1; i <= 9; i++) {
		for (let j = 1; j <= 9; j++) {
			let text = sudoku[i][j];
			if (text === 0) text = '';
			drawRect(i, j, text);
		}
	}
}

function initFlag() {
	for (let i = 1; i <= 9; i++) {
		fRow[i] = [];
		fColumn[i] = [];
		isFix[i] = [];
		for (let j = 1; j <= 9; j++) {
			fRow[i][j] = false;
			fColumn[i][j] = false;
			isFix[i][j] = false;
		}
	}
	for (let i = 1; i <= 3; i++) {
		fBlock[i] = [];
		for (let j = 1; j <= 3; j++) {
			fBlock[i][j] = [];
			for (let k = 1; k <= 9; k++) {
				fBlock[i][j][k] = false;
			}
		}
	}
	for (let i = 1; i <= 9; i++) {
		for (let j = 1; j <= 9; j++) {
			let num = sudoku[i][j];
			if (num > 0) {
				isFix[i][j] = true;
				fRow[i][num] = true;
				fColumn[j][num] = true;
				fBlock[ceil(i / 3)][ceil(j / 3)][num] = true;
			}
		}
	}
}