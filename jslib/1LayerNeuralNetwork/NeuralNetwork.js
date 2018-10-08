class NeuralNetwork {
    constructor(n_input, n_output) {
        this.n_input = n_input;
        this.n_output = n_output;
        this.output_layer = [];
        for(let i=0; i<n_output; i++) {
            this.output_layer[i] = new Perceptron(n_input);
        }
    }

    test(input) {
        let output = [];
        for(let i=0; i<this.n_output; i++) {
            output[i] = this.output_layer[i].test(input);
        }
        return output;
    }

    train(input, output) {
        for(let i=0; i<this.n_output; i++) {
            this.output_layer[i].train(input, output[i]);
        }
    }
}

let train_data = [
    {
        in : [0, 0],
        out : 0
    },{
        in : [0, 1],
        out : 0
    },{
        in : [1, 0],
        out : 0
    },{
        in : [1, 1],
        out : 1
    }
]

let p1 = new Perceptron(2);
for(let i=0; i<5000; i++) {
    let index = Math.floor(Math.random() * train_data.length);
    p1.train(train_data[index].in, train_data[index].out);
}

for(let i=0; i<train_data.length; i++) {
    console.log(p1.test(train_data[i].in));
}