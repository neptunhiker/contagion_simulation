export class Entity {
  constructor(p, x, y, virus, canvasWidth, canvasHeight, random_number_generator) {
    this.x = x;
    this.y = y;
    this.p = p;
    this.rng = random_number_generator;
    this.size = p.random(6,10); // Size of the entity
    this.is_infected = this.rng.next() < 0.2; // 20% chance of being infected initially
    this.recovered = false;
    this.virus = virus; // Virus object
    this.color = this.is_infected ? 'red' : 'white'; // Color based on infection status
    this.speed = p.random(1, 5);
    this.isDead = false;
    this.vaccinated = false;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    if (this.rng.next() < 0.5) {
      this.gender = 'male';
    } else {
      this.gender = 'female';
    }
    this.home_base_quadrant = Math.floor(this.rng.next() * 4) + 1; // Randomly assign a camp number between 1 and 4
    this.home_base_quadrant = 99;
    
    this.get_new_target();
  }
  
  die() {
    if (this.is_infected && this.rng.next() < this.virus.deceaseProbability) {
      this.is_infected = false;
      this.recovered = false;
      this.vaccinated = false;
      this.isDead = true;
      return true;
    } else {
      return false;
    }
  }
  get_new_target() {
    if(this.rng.next() < 0.001) {
      this.target_x = Math.floor(this.rng.next() * (this.canvasWidth));
      this.target_y = Math.floor(this.rng.next() * (this.canvasHeight));
      this.size = 20;
    } else {
      this.size = 6;
      if (this.home_base_quadrant === 1) {
        this.target_x = Math.floor(this.rng.next() * (this.canvasWidth/2)) + this.canvasWidth/2;
        this.target_y = Math.floor(this.rng.next() * (this.canvasHeight/2));
      } else if (this.home_base_quadrant === 2) {
        this.target_x = Math.floor(this.rng.next() * (this.canvasWidth/2));
        this.target_y = Math.floor(this.rng.next() * (this.canvasHeight/2));
      } else if (this.home_base_quadrant === 3) {
        this.target_x = Math.floor(this.rng.next() * (this.canvasWidth/2));
        this.target_y = Math.floor(this.rng.next() * (this.canvasHeight/2)) + this.canvasHeight/2;
      } else if (this.home_base_quadrant === 4) {
        this.target_x = Math.floor(this.rng.next() * (this.canvasWidth/2)) + this.canvasWidth/2;
        this.target_y = Math.floor(this.rng.next() * (this.canvasHeight/2)) + this.canvasHeight/2;
      } else {
        this.target_x = Math.floor(this.rng.next() * (this.canvasWidth));
        this.target_y = Math.floor(this.rng.next() * (this.canvasHeight));
      }
    }
  }
  
  vaccinate() {
    this.vaccinated = true;
    this.is_infected = false;
    this.speed = Math.floor(this.rng.next() * 5) + 1;
    
  }
  move() {
    // Calculate the direction vector
    const dir_x = this.target_x - this.x;
    const dir_y = this.target_y - this.y;
    const distance = Math.sqrt(dir_x * dir_x + dir_y * dir_y);
    
    if (distance < this.speed * 2) {
      this.get_new_target();
    } else {
      // Normalize the direction vector to get the unit vector
      if (distance > 0) {
        const unit_x = dir_x / distance;
        const unit_y = dir_y / distance;
        
        // Move the entity towards the target position
        this.x += unit_x * this.speed;
        this.y += unit_y * this.speed;
      }
      // Keep within canvas bounds
      this.x = this.p.constrain(this.x, 0, this.canvasWidth);
      this.y = this.p.constrain(this.y, 0, this.canvasHeight);
    }
    
  }
  
  recover() {
    if (this.is_infected && this.rng.next() < this.virus.recoveryProbability) {
      this.is_infected = false;
      this.recovered = true;
      this.speed = Math.floor(this.rng.next() * 5) + 1;
      this.get_new_target();
    }
  }
  
  display() {
    if (this.is_infected) {
      this.color = 'red';
    } else if (this.recovered) {
      this.color = 'green';
    } else if (this.vaccinated) {
      this.color = 'yellow';
    } else {
      this.color = 'white';
    }
    if (!this.isDead) {
      this.p.fill(this.color);
      this.p.ellipse(this.x, this.y, this.size);
    }
  }
  
  infect(virus) {
    if (!this.vaccinated && !this.recovered) {
      this.is_infected = true;
      this.virus = virus;
    }
  }
}