
class Circle {

    constructor(x, y, w, speed, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.speed = speed;
        this.angle = 0 - HALF_PI;
        this.type = type;
    }

    update() {
        this.angle += 0.01 * this.speed;
        return this;
    }

    get px() {
        return this.x + this.w/2 * cos(this.angle);
    }

    get py() {
        return this.y + this.w/2 * sin(this.angle);
    }

    show() {
        ellipseMode(CENTER);
        noFill();
        stroke(150, 150, 0);
        strokeWeight(2);
        ellipse(this.x, this.y, this.w, this.w);

        strokeWeight(10);
        stroke(0, 255, 0);
        let px = this.px;
        let py = this.py;
        point(px, py);

        strokeWeight(1);
        stroke(255, 255, 255, 100);
        if(this.type) {
            line(0, this.py, width, this.py);
        } else {
            line(this.px, 0, this.px, height);
        }
    }


}