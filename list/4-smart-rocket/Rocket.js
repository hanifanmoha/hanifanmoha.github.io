class Rocket {
    constructor(dna1, dna2) {
        this.life = 0;
        this.pos = createVector(0, height/2);
        this.vel = createVector(0, 0);
        this.dna = [];
        this.point = 0;
        if(!dna1 || !dna2) {
            for(let i=0; i<lifeSpan; i++) {
                this.dna.push(createVector(random(-1, 1), random(-1, 1)));
            }
        } else {
            let limit = random(lifeSpan);
            this.dna = dna1.slice(0, limit);
            this.dna = this.dna.concat(dna2.slice(limit));
        }
    }

    mutate(rate) {
        for(let i=0; i<this.dna.length; i++) {
            if(random(1) < rate) {
                this.dna[i] = createVector(random(-1, 1), random(-1, 1));
            }
        }
    }

    checkObs(obs) {
        for(let i=0; i<obs.length; i++) {
            if(this.isIntersect(obs[i])) {
                this.life = 200;
            }
        }
    }

    update() {
        if(this.life < this.dna.length) {
            this.vel.add(this.dna[this.life]);
            this.pos.add(this.vel);
            this.life++;
        }
        if(this.pos.x<0 || this.pos.x>width || this.pos.y<0 || this.pos.y>height) {
            this.life = 200;
        }
    }

    show() {
        fill(255, 255, 0);
        noStroke();
        let dot1 = p5.Vector.add(this.pos, this.vel.copy().setMag(1).mult(5));
        let dot2 = p5.Vector.sub(this.pos, this.vel.copy().setMag(1).mult(5));
        let dot3 = p5.Vector.add(dot2, this.vel.copy().rotate(PI/2).setMag(1).mult(3));
        let dot4 = p5.Vector.sub(dot2, this.vel.copy().rotate(PI/2).setMag(1).mult(3));
        beginShape();
        vertex(dot1.x, dot1.y);
        vertex(dot3.x, dot3.y);
        vertex(dot4.x, dot4.y);
        endShape(CLOSE);
    }

    isIntersect(ob) {
        if(this.pos.x<ob.x) return false;
        if(this.pos.x>ob.x+ob.w) return false;
        if(this.pos.y<ob.y) return false;
        if(this.pos.y>ob.y+ob.h) return false;
        return true;
    }

}