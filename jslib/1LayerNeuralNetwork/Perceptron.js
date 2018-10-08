class Perceptron {
    constructor(n_input) {
        this.learning_rate = 0.01;
        this.n_input = n_input;
        this.weight = [];
        this.bias = Math.random();
        for(let i=0; i<n_input; i++) {
            this.weight[i] = Math.random();
        }
    }

    test(input) {
        let sum = 0;
        sum += this.bias;
        for(let i=0; i<this.n_input; i++) {
            sum += this.weight[i] * input[i];
        }
        return sum>0 ? sum : 0;
    }

    train(input, desired_output) {
        let actual_output = this.test(input);
        if(actual_output<0) return;
        let delta = desired_output - actual_output;
        this.bias += this.learning_rate * delta;
        for(let i=0; i<this.n_input; i++) {
            this.weight[i] += this.learning_rate * delta * input[i];
        }
    }
}

