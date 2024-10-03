console.log('viruses.js loaded');
export class Virus {
  constructor(name, description, contagionProbability, recoveryProbability, deceaseProbability) {
      this.name = name;
      this.description = description;
      this.contagionProbability = contagionProbability;
      this.recoveryProbability = recoveryProbability;
      this.deceaseProbability = deceaseProbability;
  }
}