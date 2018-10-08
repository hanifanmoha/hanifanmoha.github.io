let box = 50;
let circle_w = 50;
let p1, p2, p3, p4;
let slider;
let sliderText;

function setup() {
    createCanvas(400, 400);
    createP('');
    slider = createSlider(0, box * box, 100);
    sliderText = createP('Number of training per frame : ' + slider.value());

    p1 = {
        x : 0,
        y : random(0, height),
        highlight : false
    }
    p2 = {
        x : random(0, width),
        y : 0,
        highlight : false
    }
    p3 = {
        x : width,
        y : random(0, height),
        highlight : false
    }
    p4 = {
        x : random(0, width),
        y : height,
        highlight : false
    }
}

function draw() {
    background(0);

    sliderText.html('Number of training per frame : ' + slider.value())
    
    //Draw box and get color from perceptron
    for(let i=0; i<box; i++) {
        for(let j=0; j<box; j++) {
            let w = width / box;
            let pos_x = j*w + w/2;
            let pos_y = i*w + w/2;
            let input = [pos_x / width, pos_y / height];
            let guess = getLabel(pos_x, pos_y);
            
            stroke(0);
            strokeWeight(1);
            if(guess) {
                fill(255, 0, 0);
            } else {
                fill(0, 255, 0);
            }
            rectMode(CENTER);
            rect(pos_x, pos_y, w, w);
        }
    }

    //Draw line separator
    stroke(255, 255, 0);
    strokeWeight(5);
    line(p1.x, p1.y, p2.x, p2.y);
    line(p3.x, p3.y, p4.x, p4.y);
    drawCircle(p1);
    drawCircle(p2);
    drawCircle(p3);
    drawCircle(p4);
}

function getLabel(x, y) {
    /*
    * line equation of two points
    * (y - y1) / (y2 - y1) = (x - x1) / (x2 - x1)
    * y = (x - x1) * (y2 - y1) / (x2 - x1) + y1
    */

    let y1 = (x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;
    let y2 = (x - p3.x) * (p4.y - p3.y) / (p4.x - p3.x) + p3.y;
    return y > y1 && y < y2? 1 : 0;
}

function mousePressed() {
    if(isCircleHighlighted(p1)) {
        p1.highlight = true;
    } else if(isCircleHighlighted(p2)) {
        p2.highlight = true;
    } if(isCircleHighlighted(p3)) {
        p3.highlight = true;
    } else if(isCircleHighlighted(p4)) {
        p4.highlight = true;
    } 
}

function mouseReleased() {
    p1.highlight = false;
    p2.highlight = false;
    p3.highlight = false;
    p4.highlight = false;
}

function mouseDragged() {
    if(p1.highlight) {
        if(mouseY >= 0 && mouseY <= height) {
            p1.y = mouseY;
        }
    } else if(p2.highlight) {
        if(mouseX >= 0 && mouseX <= width) {
            p2.x = mouseX;
        }
    } else if(p3.highlight) {
        if(mouseY >= 0 && mouseY <= height) {
            p3.y = mouseY;
        }
    } else if(p4.highlight) {
        if(mouseX >= 0 && mouseX <= width) {
            p4.x = mouseX;
        }
    } 
}

function drawCircle(point) {
    //Draw circle to adjust line
    rectMode(CENTER);
    fill(0, 0, 255);

    if(point.highlight) {
        stroke(255, 255, 0);
    } else {
        noStroke();
    }
    ellipse(point.x, point.y, circle_w, circle_w);
}

function isCircleHighlighted (point) {
    if(dist(mouseX, mouseY, point.x, point.y) <= circle_w) {
        return true;
    } else {
        return false;
    }
}