let img_raw;

function preload() {
	img_raw = loadImage('image.jpg');
}

function setup() {
	createCanvas(windowWidth, 2000);
	background(0);
}

function draw() {
	let img = ImageUtil.postLoad(img_raw);
	ImageUtil.show(img, 0, 0);
	let dftImage = ImageUtil.dft(img);
	let idftImage = ImageUtil.idft(dftImage);
	ImageUtil.show(idftImage, 0, 400);
	noLoop();
}