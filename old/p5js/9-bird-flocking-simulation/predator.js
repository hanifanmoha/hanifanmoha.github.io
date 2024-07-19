const PREDATOR_V = 0.5;
const PREDATOR_MAX_FORCE = 0.01;

class Predator {

    constructor() {
        this.pos = createVector(random() * width, random() * height);
        this.vel = createVector(random() * 2 - 1, random() * 2 - 1).setMag(PREDATOR_V);
    }

    steer(dir) {
        let steer = p5.Vector.sub(dir, this.vel);
        steer.limit(PREDATOR_MAX_FORCE);
        this.vel.add(steer).setMag(PREDATOR_V);
    }

    doRandom() {
        let dir = createVector(random() * 2 - 1, random() * 2 - 1);
        this.steer(dir);
    }

    update() {
        this.doRandom();
        this.pos.add(this.vel);
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }

    show() {
        fill(255, 0, 0);
        noStroke();
        let dot1 = p5.Vector.add(this.pos, this.vel.copy().setMag(1).mult(10));
        let dot2 = p5.Vector.sub(this.pos, this.vel.copy().setMag(1).mult(10));
        let dot3 = p5.Vector.add(dot2, this.vel.copy().rotate(PI / 2).setMag(1).mult(6));
        let dot4 = p5.Vector.sub(dot2, this.vel.copy().rotate(PI / 2).setMag(1).mult(6));
        beginShape();
        vertex(dot1.x, dot1.y);
        vertex(dot3.x, dot3.y);
        vertex(dot4.x, dot4.y);
        endShape(CLOSE);
    }

}