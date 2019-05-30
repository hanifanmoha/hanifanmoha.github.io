let capture;

let pixelPerWidth = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	capture = createCapture(VIDEO);

	let captureScale = pixelPerWidth / capture.width;
	capture.size(captureScale * capture.width, captureScale * capture.height)
	capture.hide();
	pixelDensity(1);
}

function draw() {
	background(0);

	const BLOCK_SIZE = width / pixelPerWidth;

	capture.loadPixels();
	for (let y = 0; y < capture.height; y++) {
		for (let x = 0; x < capture.width; x++) {
			let index = (x + y * capture.width) * 4;

			let r = capture.pixels[index + 0];
			let g = capture.pixels[index + 1];
			let b = capture.pixels[index + 2];
			let gray = (r + g + b) / 3;

			fill(255)
			noStroke()
			ellipseMode(CENTER)
			let ellipseWidth = map(gray, 0, 255, 0, BLOCK_SIZE)
			ellipse(x * BLOCK_SIZE + BLOCK_SIZE / 2, y * BLOCK_SIZE + BLOCK_SIZE / 2, ellipseWidth, ellipseWidth)
		}
	}
	capture.updatePixels();
}