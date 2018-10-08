class Perceptron {
    constructor(n_input) {
        this.learning_rate = 0.0001;
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
        let derivative = actual_output>0? 1 : 0;
        let error = desired_output - actual_output;
        this.bias += this.learning_rate * error * derivative;
        for(let i=0; i<this.n_input; i++) {
            this.weight[i] += this.learning_rate * error * input[i] * derivative;
        }
    }

    getError(error) {
        let w_sum = 0;
        w_sum += this.bias;
        for(let i=0; i<this.n_input; i++) {
            w_sum += this.weight[i];
        }
        let w_error = [];
        for(let i=0; i<this.n_input; i++) {
            w_error.push(error * this.weight[i] / w_sum);
        }
        return w_error;
    }
}

