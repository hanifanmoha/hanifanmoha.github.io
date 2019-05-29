let process = 2;
let gallery = {
	raw: null,
	img: null,
	dft: null,
	idft: null
}

function preload() {
	gallery.raw = loadImage('lena.png');
}

function setup() {
	createCanvas(1000, 2000);
	background(0);
	runGPUTesting();
}

// function draw() {
// 	gallery.img = ImageUtil.postLoad(gallery.raw);
// 	ImageUtil.show(gallery.img, 0, 0, 'Original image');
// 	noLoop();
// }

// function mouseClicked() {
// 	switch (process) {
// 		case 2:
// 			gallery.dft = ImageUtil.dft(gallery.img, 400);
// 			gallery.idft = ImageUtil.idft(gallery.dft, 400);
// 			ImageUtil.show(gallery.idft, 400, 0, 'Inverse DCT');
// 			break;
// 	}
// 	process += 1;
// }

function runGPUTesting() {
	// Generate Matrices
	const matrices = generateMatrices();
	const A = matrices.A;
	const B = matrices.B;

	//CPU
	const startCPU = window.performance.now();
	const cpuResult = cpuMatMult(A, B);
	const endCPU = window.performance.now();
	const cpuTime = endCPU - startCPU;
	console.log(`CPU: ${cpuTime}ms`);

	// //GPU
	const startGPU = window.performance.now();
	const result = gpuMatMult(A, B);
	const endGPU = window.performance.now();
	const gpuTime = endGPU - startGPU;
	console.log(`GPU: ${gpuTime}ms`);

	//Diff
	const diff = (cpuTime - gpuTime) / (gpuTime);
	console.log(`%c ${diff}`, 'color: red;', `times faster!`);
}