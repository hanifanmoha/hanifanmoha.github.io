const DIRS = {
    UP : { dx : 0, dy : -1 },
    DOWN : { dx : 0, dy : 1 },
    LEFT : { dx : -1, dy : 0 },
    RIGHT : { dx : 1, dy : 0 }
}

DIRS.UP.X = DIRS.DOWN;
DIRS.DOWN.X = DIRS.UP;
DIRS.LEFT.X = DIRS.RIGHT;
DIRS.RIGHT.X = DIRS.LEFT;

class Snake {

    constructor(x, y) {
        this.x = floor(x);
        this.y = floor(y);
        this.n = 2;
        this.dir = DIRS.RIGHT;
        this.body = [];
        this.append = false;
        this.last = null;
        this.alive = true;
        this.transition = false;

        let tempX = this.x;
        let tempY = this.y;
        for(let i=0; i<this.n; i++) {
            this.body.push(new Block(tempX, tempY, 255, 0, 0));
            tempX += DIRS.LEFT.dx;
            tempY += DIRS.LEFT.dy;
        }
    }
    

    setDir(dir) {
        if(this.transition || dir === this.dir.X) return;
        this.dir = dir;
        this.transition = true;
    }

    eat(x, y) {
        if(this.x === x && this.y === y) {
            this.append = true;
            return true;
        } else {
            return false;
        }
    }

    hitWall() {
        if(this.x < 0 || this.x >= BOARD_W ||
        this.y < 0 || this.y >= BOARD_H) {
            return true;
        } else {
            return false;
        }
    }

    hitSelf() {
        let blocks = this.body.slice(1);
        for(let block of blocks) {
            if(block.x === this.x && block.y === this.y) {
                return true;
            }
        }
        return false;
    }

    reserve(x, y) {
        for(let block of this.body) {
            if(block.x === x && block.y === y) {
                return true;
            }
        }
        return false;
    }

    kill() {
        this.unUpdate();
        this.alive = false;
    }

    update() {
        if(!this.alive) return;
        this.x += this.dir.dx;
        this.y += this.dir.dy;
        this.body.unshift(new Block(this.x, this.y, 255, 0, 0));
        if(!this.append) {
            this.last = this.body.pop();
        }
        this.append = false;
        this.transition = false;
    }

    unUpdate() {
        if(!this.alive) return;
        this.body.shift();
        this.body.push(this.last);
    }

    show() {
        for(let block of this.body) {
            block.show();
        }
    }

}