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

    static show = (img, posX, posY) => {
        noStroke();
        for (let row = 0; row < img.length; row++) {
            for (let col = 0; col < img[row].length; col++) {
                fill(img[row][col]);
                rect(posX + col, posY + row, 1, 1);
            }
        }
    }

    static dft = (img) => {
        let h = img.length;
        let w = img[0].length;

        let result = new Array(h).fill(0)
            .map(() => new Array(w).fill(125));

        for (let M = 0; M < h / 8; M++) {
            for (let N = 0; N < w / 8; N++) {

                for (let u = 0; u < 8; u++) {
                    for (let v = 0; v < 8; v++) {

                        let sigma = 0;
                        for (let i = 0; i < 8; i++) {
                            for (let j = 0; j < 8; j++) {
                                let val = cos(((2 * i + 1) * u * PI) / 16);
                                val *= cos(((2 * j + 1) * v * PI) / 16)
                                val *= img[M * 8 + i][N * 8 + j];
                                sigma += val;
                            }
                        }

                        result[M * 8 + u][N * 8 + v] = ImageUtil.C(u) * ImageUtil.C(v) / 4 * sigma
                    }
                }
            }
        }

        return result;
    }

    static idft = (dftImg) => {
        let h = dftImg.length;
        let w = dftImg[0].length;

        let result = new Array(h).fill(0)
            .map(() => new Array(w).fill(125));

        for (let M = 0; M < h / 8; M++) {
            for (let N = 0; N < w / 8; N++) {

                for (let u = 0; u < 8; u++) {
                    for (let v = 0; v < 8; v++) {

                        let sigma = 0;
                        for (let i = 0; i < 8; i++) {
                            for (let j = 0; j < 8; j++) {
                                let val = ImageUtil.C(u) * ImageUtil.C(v) / 4;
                                val *= cos(((2 * i + 1) * u * PI) / 16);
                                val *= cos(((2 * j + 1) * v * PI) / 16)
                                val *= dftImg[M * 8 + i][N * 8 + j];
                                sigma += val;
                            }
                        }

                        result[M * 8 + u][N * 8 + v] = sigma
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