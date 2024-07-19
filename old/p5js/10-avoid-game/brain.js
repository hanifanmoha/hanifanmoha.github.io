class Brain {

  constructor(nInput, nHidden1, nOutput) {
    this.nInput = nInput
    this.nHidden1 = nHidden1
    this.nOutput = nOutput

    this.wIH1 = []
    for (let i = 0; i < nHidden1; i++) {
      this.wIH1.push([])
      for (let j = 0; j < nInput; j++) {
        this.wIH1[i].push(random(-1, 1))
      }
    }

    this.wHO = []
    for (let i = 0; i < nOutput; i++) {
      this.wHO.push([])
      for (let j = 0; j < nHidden1; j++) {
        this.wHO[i].push(random(-1, 1))
      }
    }
  }

  inherit(parentBrain) {
    for (let i = 0; i < this.nHidden1; i++) {
      for (let j = 0; j < this.nInput; j++) {
        if (random() < MUTATION_RATE) {
          this.wIH1[i][j] =  this.wIH1[i][j] + random(-1, 1)
        } else {
          this.wIH1[i][j] = parentBrain.wIH1[i][j]
        }
      }
    }

    for (let i = 0; i < this.nOutput; i++) {
      for (let j = 0; j < this.nHidden1; j++) {
        if (random() < MUTATION_RATE) {
          this.wHO[i][j] = this.wHO[i][j] + random(-1, 1)
        } else {
          this.wHO[i][j] = parentBrain.wHO[i][j]
        }
      }
    }
  }

  predict(input) {

    let oHidden1 = []
    for (let wHidden1 of this.wIH1) {
      let sum = 0
      for (let i = 0; i < this.nInput; i++) {
        sum += wHidden1[i] * input[i]
      }
      oHidden1.push(1 / (1 + exp(-sum)))
    }

    let oOutput = []
    for (let wOutput of this.wHO) {
      let sum = 0
      for (let i = 0; i < this.nHidden1; i++) {
        sum += wOutput[i] * oHidden1[i]
      }
      oOutput.push(1 / (1 + exp(-sum)))
    }

    return oOutput

  }

}