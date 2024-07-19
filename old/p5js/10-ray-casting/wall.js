class Wall {
  constructor(ax, ay, bx, by) {
    this.a = createVector(ax, ay)
    this.b = createVector(bx, by)
  }

  intersect(x, y, angle) {

    angleMode(DEGREES)
    let ray = {
      a: createVector(x, y),
      b: createVector(x, y).add(createVector(5000, 0).rotate(angle))
    }
    
    let ray1 = p5.Vector.sub(ray.a, this.a)
    let ray2 = p5.Vector.sub(ray.a, this.b)
    let ray3 = p5.Vector.sub(ray.a, ray.b)
    
    if(ray1.angleBetween(ray3) + ray2.angleBetween(ray3) > ray1.angleBetween(ray2) + 1) {
      return ray.b
    }
 
    let den = (this.a.x - this.b.x) * (ray.a.y - ray.b.y) - (this.a.y - this.b.y) * (ray.a.x - ray.b.x)
    let xNum = (this.a.x * this.b.y - this.a.y * this.b.x) * (ray.a.x - ray.b.x) - (this.a.x - this.b.x) * (ray.a.x * ray.b.y - ray.a.y * ray.b.x)
    let yNum = (this.a.x * this.b.y - this.a.y * this.b.x) * (ray.a.y - ray.b.y) - (this.a.y - this.b.y) * (ray.a.x * ray.b.y - ray.a.y * ray.b.x)
    return createVector(xNum/den, yNum/den)
  }

  show() {
    stroke(255)
    strokeWeight(1)
    line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}