class Section {
    constructor(len, w) {
        this.len = len;
        this.w = w;
        this.a = createVector(0, 0);
        this.b = createVector(0, 0);
        this.dir = createVector(0, 0);
    }

    follow(target) {
        this.b = target.copy();
        this.dir = this.a.sub(target);
        this.dir = this.dir.setMag(this.len);
        this.a = target.add(this.dir);
    }

    show(point) {
        this.a = point.copy();
        this.b = point.copy().sub(this.dir);

        strokeWeight(this.w);
        stroke(220, 220, 50, 230);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}