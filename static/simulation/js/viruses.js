console.log('viruses.js loaded');
export class Virus {
  constructor(name, description, contagionProbability, recoveryProbability, deceaseProbability) {
      this.name = name;
      this.description = description;
      this.contagionProbability = contagionProbability;
      this.recoveryProbability = recoveryProbability;
      this.deceaseProbability = deceaseProbability;
  }

  mutate(increaseContagionProbability=0.1, increaseDeceaseProbability=0.1) {
    this.contagionProbability = Math.min(this.contagionProbability * (1 + increaseContagionProbability), 1);
    this.deceaseProbability = Math.min(this.deceaseProbability * (1 + increaseDeceaseProbability), 1);
  }
} 