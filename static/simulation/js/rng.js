export class RandomNumberGenerator {
  constructor(batchSize = 100000) {
    this.batchSize = batchSize;
    this.batch = [];
    this.index = 0;
    this.generateBatch();
  }

  generateBatch() {
    for (let i = 0; i < this.batchSize; i++) {
      this.batch[i] = Math.random();
    }
  }

  next() {
    if (this.index >= this.batchSize) {
      this.generateBatch();
      this.index = 0;
    }
    return this.batch[this.index++];
  }
}