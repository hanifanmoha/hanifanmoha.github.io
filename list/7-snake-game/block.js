class Block {
    
    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
    }

    show(){
        if(this.x < 0 ||
            this.x >= BOARD_W ||
            this.y < 0 ||
            this.y >= BOARD_H) return;
        rectMode(CENTER);
        fill(this.r, this.g, this.b);
        strokeWeight(0);
        rect(
            this.x * (SIZE + SPACE) + SIZE / 2 + SPACE,
            this.y * (SIZE + SPACE) + SIZE / 2 + SPACE + H_OFFSET,
            SIZE,
            SIZE,
            5,5,5,5
        )
    }
}