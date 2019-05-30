class Shape {

    constructor() {
        this.points = [];
    }

    addPoint(x, y) {
        this.points.push(createVector(x, y));
    }

    show() {
        noFill();
        stroke(255, 0, 0);
        strokeWeight(3);
        beginShape();
        for(let point of this.points) {
            vertex(point.x, point.y);
        }
        endShape();
    }

    reset() {
        this.points = [];
    }

}