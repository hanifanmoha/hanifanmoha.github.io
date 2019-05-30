const V = 1;
const MAX_FORCE = 0.01;
const SEPARATE_EFFECT = 0.5;
const AVOID_EFFECT = 10;

class Bird {

    constructor() {
        this.pos = createVector(random() * width, random() * height);
        this.vel = createVector(random() * 2 - 1, random() * 2 - 1).setMag(V);
    }

    steer(dir, maxForce=MAX_FORCE) {
        let steer = p5.Vector.sub(dir, this.vel);
        steer.limit(maxForce);
        this.vel.add(steer).setMag(V);
    }

    align(birds, R) {
        let sumVelX = 0;
        let sumVelY = 0;
        let N = 0;
        for (let bird of birds) {
            if (dist(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y) < R) {
                sumVelX += bird.vel.x;
                sumVelY += bird.vel.y;
                N++;
            }
        }
        let dir = createVector(sumVelX / N, sumVelY / N);
        this.steer(dir)
    }

    separate(birds, R) {
        for (let bird of birds) {
            if (dist(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y) < R) {
                let dir = p5.Vector.sub(this.pos, bird.pos);
                this.steer(dir.setMag(SEPARATE_EFFECT))
            }
        }
    }

    cohesion(birds, R) {
        let sumPosX = 0;
        let sumPosY = 0;
        let N = 0;
        for (let bird of birds) {
            if (dist(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y) < R) {
                sumPosX += bird.pos.x;
                sumPosY += bird.pos.y;
                N++;
            }
        }
        let pos = createVector(sumPosX / N, sumPosY / N);
        let dir = p5.Vector.sub(pos, this.pos);
        this.steer(dir)
    }

    avoid(predator, R) {
        if (dist(this.pos.x, this.pos.y, predator.pos.x, predator.pos.y) < R) {
            let dir = p5.Vector.sub(this.pos, predator.pos);
            this.steer(dir, 1);
        }
    }

    doRandom() {
        let dir = createVector(random() * 2 - 1, random() * 2 - 1);
        this.steer(dir);
    }

    update() {
        this.pos.add(this.vel);
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }

    show() {
        fill(255, 255, 0);
        noStroke();
        let dot1 = p5.Vector.add(this.pos, this.vel.copy().setMag(1).mult(5));
        let dot2 = p5.Vector.sub(this.pos, this.vel.copy().setMag(1).mult(5));
        let dot3 = p5.Vector.add(dot2, this.vel.copy().rotate(PI / 2).setMag(1).mult(3));
        let dot4 = p5.Vector.sub(dot2, this.vel.copy().rotate(PI / 2).setMag(1).mult(3));
        beginShape();
        vertex(dot1.x, dot1.y);
        vertex(dot3.x, dot3.y);
        vertex(dot4.x, dot4.y);
        endShape(CLOSE);
    }

}