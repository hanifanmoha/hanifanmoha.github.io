class Tentacle {
    constructor(x, y, n) {
        this.origin = createVector(x, y);
        this.sections = [];
        this.n = n;
        for(let i=1; i<=n; i++) {
            this.sections.push(new Section(50, i*3));
        }
        this.sections.reverse();
    }

    show(x, y) {
        this.sections[this.n-1].follow(createVector(x, y));
        for(let i=this.n-2; i>=0; i--) {
            this.sections[i].follow(this.sections[i+1].a);
        }
        this.sections[0].show(this.origin);
        for(let i=1; i<this.n; i++) {
            this.sections[i].show(this.sections[i-1].b);
        }	
    }
}