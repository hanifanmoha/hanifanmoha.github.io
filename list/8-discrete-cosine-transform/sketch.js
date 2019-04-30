let img;

function preload() {
	img = loadImage('image.jpg');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0)
	let gray = rgb2gray(img);
	gray = reshape(gray, 400, 400);
	showImg(gray, 0, 0);
	let dft = dfTransform(gray);
	showImg(dft, 400, 0);
}

function dfTransform(grayImg, ) {
	let dft = new Array(grayImg.length).fill(0)
		.map((row, i) => new Array(grayImg[i].length).fill(125));
	for (let M = 0; M < grayImg.length / 8; M++) {
		for (let N = 0; N < grayImg[0].length / 8; N++) {
			for (let u = 0; u < 8; u++) {
				for (let v = 0; v < 8; v++) {
					let sigma = 0;
					for (let i = 0; i < 8; i++) {
						for (let j = 0; j < 8; j++) {
							sigma += cos(((2 * i + 1) * u * PI) / 16) * cos(((2 * j + 1) * v * PI) / 16) * (grayImg[M * 8 + i][N * 8 + j] - 128);
						}
					}
					dft[M * 8 + u][N * 8 + v] = C(u) * C(v) / 4 * sigma
				}
			}
		}
	}
	console.log(dft)
	return dft;
}

function rgb2gray(img) {
	let grayImg = [];
	img.loadPixels();
	for (let i = 0; i < img.pixels.length; i += 4) {
		let sum = img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2];
		grayImg.push(sum / 3);
	}
	img.updatePixels();
	return grayImg;
}

function reshape(arr, w, h) {
	let res = [];
	for (let r = 0; r < h; r++) {
		res[r] = []
		for (let c = 0; c < w; c++) {
			res[r][c] = arr[c + r * w];
		}
	}
	return res;
}

function showImg(grayImg, posX, posY) {
	for (let row = 0; row < grayImg.length; row++) {
		for (let col = 0; col < grayImg[row].length; col++) {
			noStroke();
			fill(grayImg[row][col]);
			rect(posX + col, posY + row, 1, 1);
		}
	}
}

function C(x) {
	if (x === 0) return 1 / sqrt(2);
	else return 1;
}