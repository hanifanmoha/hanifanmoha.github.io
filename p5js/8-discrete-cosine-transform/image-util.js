class ImageUtil {

    static postLoad = img => {
        let grayImg = [];
        img.loadPixels();
        for (let i = 0; i < img.pixels.length; i += 4) {
            let sum = img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2];
            grayImg.push(sum / 3);
        }
        img.updatePixels();

        // Reshape
        let reshaped = [];
        for (let r = 0; r < img.height; r++) {
            reshaped[r] = []
            for (let c = 0; c < img.width; c++) {
                reshaped[r][c] = grayImg[c + r * img.width];
            }
        }
        return reshaped;
    } 

    static show = (img, posX, posY, title='') => {
        noStroke();
        for (let row = 0; row < img.length; row++) {
            for (let col = 0; col < img[row].length; col++) {
                fill(img[row][col]);
                rect(posX + col, posY + row, 1, 1);
            }
        }
        fill(255,0,74);
        textSize(32);
        text(title, posX + 20, posY + 50);
    }

    static dft = (img, BLOCK_SIZE = 8) => {
        console.log(`Running DFT (${BLOCK_SIZE}) ...`);

        let h = img.length;
        let w = img[0].length;

        let result = new Array(h).fill(0)
            .map(() => new Array(w).fill(0));

        for (let M = 0; M < h / BLOCK_SIZE; M++) {
            for (let N = 0; N < w / BLOCK_SIZE; N++) {

                for (let u = 0; u < BLOCK_SIZE; u++) {
                    for (let v = 0; v < BLOCK_SIZE; v++) {

                        console.log(u, v);

                        let sigma = 0;
                        for (let i = 0; i < BLOCK_SIZE; i++) {
                            for (let j = 0; j < BLOCK_SIZE; j++) {
                                let val = cos(((2 * i + 1) * u * PI) / (2 * BLOCK_SIZE));
                                val *= cos(((2 * j + 1) * v * PI) / (2 * BLOCK_SIZE))
                                val *= img[M * BLOCK_SIZE + i][N * BLOCK_SIZE + j];
                                sigma += val;
                            }
                        }

                        result[M * BLOCK_SIZE + u][N * BLOCK_SIZE + v] = 2 * ImageUtil.C(u) * ImageUtil.C(v) / sqrt(BLOCK_SIZE * BLOCK_SIZE) * sigma
                    }
                }
            }
        }

        return result;
    }

    static idft = (dftImg, BLOCK_SIZE = 8) => {
        console.log(`Running Inverse DFT (${BLOCK_SIZE}) ...`);
        let h = dftImg.length;
        let w = dftImg[0].length;

        let result = new Array(h).fill(0)
            .map(() => new Array(w).fill(0));

        for (let M = 0; M < h / BLOCK_SIZE; M++) {
            for (let N = 0; N < w / BLOCK_SIZE; N++) {

                for (let u = 0; u < BLOCK_SIZE; u++) {
                    for (let v = 0; v < BLOCK_SIZE; v++) {

                        console.log(u, v);

                        let sigma = 0;
                        for (let i = 0; i < BLOCK_SIZE; i++) {
                            for (let j = 0; j < BLOCK_SIZE; j++) {
                                let val = 2 * ImageUtil.C(u) * ImageUtil.C(v) / sqrt(BLOCK_SIZE * BLOCK_SIZE);
                                val *= cos(((2 * i + 1) * u * PI) / (2 * BLOCK_SIZE));
                                val *= cos(((2 * j + 1) * v * PI) / (2 * BLOCK_SIZE))
                                val *= dftImg[M * BLOCK_SIZE + i][N * BLOCK_SIZE + j];
                                sigma += val;
                            }
                        }

                        result[M * BLOCK_SIZE + u][N * BLOCK_SIZE + v] = sigma
                    }
                }
            }
        }

        return result;
    }

    static C = (x) => {
        if (x === 0) return 1 / sqrt(2);
        else return 1;
    }
}