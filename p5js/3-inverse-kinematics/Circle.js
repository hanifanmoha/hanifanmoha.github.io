class Circle{
    
    constructor(x, y, w, angle, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.angle = angle;
        this.speed = speed;
    }

    update() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
        if(this.y - this.w /2 <= 0 || this.y + this.w/2 >= height) {
            this.angle = TWO_PI - this.angle;
        }
        if(this.x - this.w/2  <= 0 || this.x + this.w/2 >= width) {
            this.angle = PI - this.angle;
        }
    }

    show() {
        noStroke();
        ellipseMode(CENTER);
        fill(255,0,0);
        ellipse(this.x, this.y, this.w, this.w);
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.w/4, this.w/4);
    }

}