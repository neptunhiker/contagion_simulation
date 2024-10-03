import { Entity } from './entities.js';
import { Virus } from './viruses.js';
import { RandomNumberGenerator } from './rng.js';
import { VaccinationCenter } from './healthcare.js';

const sketch = (p) => {
  
  let entities = [];
  const numEntities = 200; // Total number of entities
  let virus = new Virus('Flu', 'A common flu virus', 0.001, 0.0001, 0.00001);
  let canvasWidth = 600;
  let canvasHeight = 300;
  let vaccinationCenter = new VaccinationCenter(20, canvasWidth / 2, canvasHeight / 2, p);
  let newInfected;
  let infectedChart;
  let newDataChart;
  let lastChartUpdate = 0;
  
  
  function interact(entityA, entityB) {
    let infectionOccurred = false;
    let randomNumber = Math.random();
    
    if (entityA.is_infected && !entityB.is_infected) {
      // Check contagion probability
      if (randomNumber< entityA.virus.contagionProbability) {
        entityB.infect(entityA.virus);
        infectionOccurred = true;
      }
    } else if (entityB.is_infected && !entityA.is_infected) {
      // Check contagion probability
      if (randomNumber< entityB.virus.contagionProbability) {
        entityA.infect(entityB.virus);
        infectionOccurred = true;
      }
    }
    
    return infectionOccurred;
  }
  
  
  p.setup = function() {
    // Include this in your JavaScript file
    let infectedChartCtx = document.getElementById('infectedChart').getContext('2d');
    infectedChart = new Chart(infectedChartCtx, {
      type: 'line',
      data: {
        labels: [], // This will be the turn numbers
        datasets: [{
          label: 'Number of Infected Entities',
          data: [], // This will be the number of infected entities
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Number of Vaccinated Entities',
          data: [], // This will be the number of vaccinated entities
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Number of Recovered Entities',
          data: [], // This will be the number of recovered entities
          fill: false,
          borderColor: 'rgb(75, 192, 92)',
          tension: 0.1
        },
        {
          label: 'Number of Deceased Entities',
          data: [], // This will be the number of deceased entities
          fill: false,
          borderColor: 'rgb(75, 12, 42)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Turn Number'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Entities'
            }
          }
        }
      }
    });
    let newDataChartCtx = document.getElementById('newDataChart').getContext('2d');
    newDataChart = new Chart(newDataChartCtx, {
      type: 'line',
      data: {
        labels: [], // This will be the turn numbers
        datasets: [{
          label: 'Number of New Infections',
          data: [], // This will be the number of infected entities
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
      ]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Turn Number'
          }
        },
        y: {
          title: {
            display: true,
            text: 'New Data'
          }
        }
      }
    }
  });
  let canvas = p.createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container'); // Attach the canvas to the specific div

  let rng = new RandomNumberGenerator();
  for (let i = 0; i < numEntities; i++) {
    entities.push(new Entity(p, p.random(canvasWidth), p.random(canvasHeight), virus, canvasWidth, canvasHeight, rng));
  }
}

p.draw = function() {
  p.background(2);
  vaccinationCenter.display();
  newInfected = 0;
  // Update and display entities
  let aliveEntities = entities.filter(entity => !entity.isDead);
  let entity;
  for (let i = 0; i < aliveEntities.length; i++) {
    entity = aliveEntities[i];
    entity.move(); // Assuming you have a move method in the Entity class
    entity.recover();
    // vaccinate entities
    if (collide(entity, vaccinationCenter) && !entity.is_infected) {
      console.log("Entering Vaccination Center")
      entity.vaccinate();
    }
    for (let j = i + 1; j < aliveEntities.length; j++) {

      if (collide(entity, aliveEntities[j])) {
        if (interact(entity, aliveEntities[j])){
          newInfected++;
        };
      }
    }

    if (!entity.die()) {
      entity.display(); 
    }
    
  }
  
    // Count and display the number of infected entities
    let infectedCount = entities.filter(entity => entity.is_infected).length;
    let vaccinatedCount = entities.filter(entity => entity.vaccinated).length;
    let recoveredCount = entities.filter(entity => entity.recovered).length;
    let succeptibleCount = entities.filter(entity => !entity.is_infected && !entity.recovered && !entity.vaccinated && !entity.isDead).length;
    let deceasedEntities = entities.filter(entity => entity.isDead).length;
    p.fill(255);
    p.textSize(12);
    p.textAlign(p.LEFT, p.TOP);
    p.text(`Infected Entities: ${infectedCount}`, 10, 10); // Display at top left
    p.text(`Vaccinated Entities: ${vaccinatedCount}`, 10, 30); // Display at top left
    p.text(`Recovered Entities: ${recoveredCount}`, 10, 50); // Display at top left
    p.text(`Succeptible Entities: ${succeptibleCount}`, 10, 70); // Display at top left
    p.text(`Deceased Entities: ${deceasedEntities}`, 10, 90); // Display at top left
    
    if (typeof infectedChart !== 'undefined') {
      let numInfected = entities.filter(entity => entity.is_infected).length;
      let vaccinatedCount = entities.filter(entity => entity.vaccinated).length;
      let recoveredCount = entities.filter(entity => entity.recovered).length;
      if (p.millis() - lastChartUpdate > 1000){
        if (infectedChart && infectedChart.data){
          infectedChart.data.labels.push(p.frameCount); // Assuming p.frameCount is the turn number
          infectedChart.data.datasets[0].data.push(numInfected);
          infectedChart.data.datasets[1].data.push(vaccinatedCount);
          infectedChart.data.datasets[2].data.push(recoveredCount);
          infectedChart.data.datasets[3].data.push(deceasedEntities);
          infectedChart.update();
        }
        if (typeof newDataChart !== 'undefined') {
          if (newDataChart && newDataChart.data){
            newDataChart.data.labels.push(p.frameCount); // Assuming p.frameCount is the turn number
            newDataChart.data.datasets[0].data.push(newInfected);
            newDataChart.update();
          }
        }
      lastChartUpdate = p.millis();
      }
    }
    if (p.frameCount % 500 === 0) {
      console.log(virus.contagionProbability);
      virus.mutate(0.9, 0.9);

      console.log("Virus mutated");
      // show probabilities in percent rounded to 1 decimal place
      console.log(`Contagion Probability: ${(virus.contagionProbability * 100).toFixed(3)}%`);
      console.log(`Recovery Probability: ${(virus.recoveryProbability * 100).toFixed(3)}%`);
      console.log(`Decease Probability: ${(virus.deceaseProbability * 100).toFixed(3)}%`);
    }
  }
  function collide(entity_a, entity_b) {
    // Basic distance check for collision
    let d = p.dist(entity_a.x, entity_a.y, entity_b.x, entity_b.y);
    return d < (entity_a.size + entity_b.size) / 2; // Assuming size is defined in Entity
  }
}

// Collision detection function
new p5(sketch);