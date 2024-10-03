export class VaccinationCenter {
  constructor(size, x, y, p) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = 'blue';
    this.p = p;
  }
  
  display() {
    this.p.fill(this.color);
    this.p.ellipse(this.x, this.y, this.size);
  }
}