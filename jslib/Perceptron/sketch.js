let box = 50;
let circle_w = 50;
let p1, p2;
let perceptron;
let slider;
let sliderText;

function setup() {
    createCanvas(400, 400);
    createP('');
    slider = createSlider(0, box * box, 100);
    sliderText = createP('Number of training per frame : ' + slider.value());
    perceptron = new Perceptron(2);

    p1 = {
        x : 0,
        y : random(0, height)
    }

    p2 = {
        x : width,
        y : random(0, height)
    }
}

function draw() {
    background(0);

    sliderText.html('Number of training per frame : ' + slider.value())

    //Train Perceptron using 100 points
    for(let i=0; i<slider.value(); i++) {
        let train_x = random(0, width);
        let train_y = random(0, height);
        let input = [train_x / width, train_y / height];
        let desired_output = getLabel(train_x, train_y);
        perceptron.train(input, desired_output);
    }
    
    //Draw box and get color from perceptron
    for(let i=0; i<box; i++) {
        for(let j=0; j<box; j++) {
            let w = width / box;
            let pos_x = j*w + w/2;
            let pos_y = i*w + w/2;
            let input = [pos_x / width, pos_y / height];
            let guess = perceptron.test(input);
            stroke(0);
            strokeWeight(1);
            fill(guess * 255, (1-guess) * 255, 0);
            // if(guess) {
            //     fill(255, 0, 0);
            // } else {
            //     fill(0, 255, 0);
            // }
            rectMode(CENTER);
            rect(pos_x, pos_y, w, w);
        }
    }

    //Draw line separator
    stroke(255, 255, 0);
    strokeWeight(5);
    line(p1.x, p1.y, p2.x, p2.y);

    //Draw circle to adjust line
    rectMode(CENTER);
    fill(0, 0, 255);

    if(isCircleHighlighted(p1)) {
        stroke(255, 255, 0);
    } else {
        noStroke();
    }
    ellipse(p1.x, p1.y, circle_w, circle_w);

    if(isCircleHighlighted(p2)) {
        stroke(255, 255, 0);
    } else {
        noStroke();
    }
    ellipse(p2.x, p2.y, circle_w, circle_w);
}

function getLabel(x, y) {
    /*
    * line equation of two points
    * (y - y1) / (y2 - y1) = (x - x1) / (x2 - x1)
    * y = (x - x1) * (y2 - y1) / (x2 - x1) + y1
    */

    let line_y = (x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;
    return y > line_y ? 1 : 0;
}

function mouseDragged() {
    if(isCircleHighlighted(p1)) {
        if(mouseY >= 0 && mouseY <= height) {
            p1.y = mouseY;
        }
    } else if(isCircleHighlighted(p2)) {
        if(mouseY >= 0 && mouseY <= height) {
            p2.y = mouseY;
        }
    }
}

function isCircleHighlighted (point) {
    if(dist(mouseX, mouseY, point.x, point.y) <= circle_w * 2) {
        return true;
    } else {
        return false;
    }
}