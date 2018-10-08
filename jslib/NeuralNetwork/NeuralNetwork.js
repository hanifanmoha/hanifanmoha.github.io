class NeuralNetwork {
    constructor(n_input, n_hidden, n_output) {
        this.n_input = n_input;
        this.n_hidden = n_hidden;
        this.n_output = n_output;
        this.learning_rate = 0.5;

        this.b_hidden = [];
        this.w_hidden = [];
        for(let i=0; i<n_hidden; i++) {
            this.w_hidden[i] = [];
            this.b_hidden[i] = Math.random();
            for(let j=0; j<this.n_input; j++) {
                this.w_hidden[i][j] = Math.random();
            }
        }

        this.b_output = [];
        this.w_output = [];
        for(let i=0; i<n_output; i++) {
            this.w_output[i] = [];
            this.b_output[i] = Math.random();
            for(let j=0; j<this.n_hidden; j++) {
                this.w_output[i][j] = Math.random();
            }
        }
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    dSigmoid(x) {
        return this.sigmoid(x) * (1 - this.sigmoid(x));
    }

    test(input) {
        let net_hidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            net_hidden[i] = 0;
            net_hidden[i] += this.b_hidden[i];
            for(let j=0; j<this.n_input; j++) {
                net_hidden[i] += this.w_hidden[i][j] * input[j];
            }
        }

        let out_hidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            out_hidden[i] = this.sigmoid(net_hidden[i]);
        }

        let net_output = [];
        for(let i=0; i<this.n_output; i++) {
            net_output[i] = 0;
            net_output[i] += this.b_output[i];
            for(let j=0; j<this.n_hidden; j++) {
                net_output[i] += this.w_output[i][j] * out_hidden[j];
            }
        }

        let out_output = [];
        for(let i=0; i<this.n_output; i++) {
            out_output[i] = this.sigmoid(net_output[i]);
        }

        return out_output;
    }

    train(input, target) {
        //Forward-Pass
        let net_hidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            net_hidden[i] = 0;
            net_hidden[i] += this.b_hidden[i];
            for(let j=0; j<this.n_input; j++) {
                net_hidden[i] += this.w_hidden[i][j] * input[j];
            }
        }

        let out_hidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            out_hidden[i] = this.sigmoid(net_hidden[i]);
        }

        let net_output = [];
        for(let i=0; i<this.n_output; i++) {
            net_output[i] = 0;
            net_output[i] += this.b_output[i];
            for(let j=0; j<this.n_hidden; j++) {
                net_output[i] += this.w_output[i][j] * out_hidden[j];
            }
        }

        let out_output = [];
        for(let i=0; i<this.n_output; i++) {
            out_output[i] = this.sigmoid(net_output[i]);
        }

        let e_output = [];
        let e_total = 0;
        for(let i=0; i<this.n_output; i++) {
            e_output[i] = Math.pow((target[i] - out_output[i]), 2) / 2;
            e_total += e_output[i];
        }

        //Backward-Pass

        //Output Layer
        let dETot_dOutOutput = [];
        for(let i=0; i<this.n_output; i++) {
            dETot_dOutOutput[i] = - (target[i] - out_output[i]);
        }

        let dOutOutput_dNetOutput = [];
        for(let i=0; i<this.n_output; i++) {
            dOutOutput_dNetOutput[i] = this.dSigmoid(net_output[i]);
        }

        let dNetOutput_dWOutput = [];
        for(let i=0; i<this.n_output; i++) {
            dNetOutput_dWOutput[i] = [];
            for(let j=0; j<this.n_hidden; j++) {
                dNetOutput_dWOutput[i][j] = out_hidden[j];
            }
        }

        let dEtot_dBOutput = [];
        let dEtot_dWOutput = [];
        for(let i=0; i<this.n_output; i++) {
            dEtot_dBOutput[i] = dETot_dOutOutput[i] * dOutOutput_dNetOutput[i];
            dEtot_dWOutput[i] = [];
            for(let j=0; j<this.n_hidden; j++) {
                dEtot_dWOutput[i][j] = dETot_dOutOutput[i] * dOutOutput_dNetOutput[i] * dNetOutput_dWOutput[i][j];
            }
        }

        for(let i=0; i<this.n_output; i++) {            
            this.b_output[i] -= this.learning_rate * dEtot_dBOutput[i];
            for(let j=0; j<this.n_hidden; j++) {
                this.w_output[i][j] -= this.learning_rate * dEtot_dWOutput[i][j];
            }
        }

        //Hidden Layer

        let dETot_dOutHidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            dETot_dOutHidden[i] = 0;
            for(let j=0; j<this.n_output; j++) {
                dETot_dOutHidden[i] += dETot_dOutOutput[j] * dOutOutput_dNetOutput[j] * this.w_output[j][i];
            }
        }

        let dOutHidden_dNetHidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            dOutHidden_dNetHidden[i] = this.dSigmoid(net_hidden[i]);
        }

        let dNetHidden_dWHidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            dNetHidden_dWHidden[i] = [];
            for(let j=0; j<this.n_input; j++) {
                dNetHidden_dWHidden[i][j] = input[j];
            }
        }


        let dEtot_dBHidden = [];
        let dEtot_dWHidden = [];
        for(let i=0; i<this.n_hidden; i++) {
            dEtot_dBHidden[i] = dETot_dOutHidden[i] * dOutHidden_dNetHidden[i];
            dEtot_dWHidden[i] = [];
            for(let j=0; j<this.n_input; j++) {
                dEtot_dWHidden[i][j] = dETot_dOutHidden[i] * dOutHidden_dNetHidden[i] * dNetHidden_dWHidden[i][j];
            }
        }

        for(let i=0; i<this.n_hidden; i++) {
            this.b_hidden[i] -= this.learning_rate * dEtot_dBHidden[i];
            for(let j=0; j<this.n_input; j++) {
                this.w_hidden[i][j] -= this.learning_rate * dEtot_dWHidden[i][j];
            }
        }

    }
}

// let train_data = [
//     {
//         in : [0, 0],
//         out : [0]
//     },
//     {
//         in : [0, 1],
//         out : [1]
//     },
//     {
//         in : [1, 0],
//         out : [1]
//     },
//     {
//         in : [0, 0],
//         out : [0]
//     }
// ]

// let nn = new NeuralNetwork(2, 2, 1);
// nn.learning_rate = 0.1;
// for(let i=0; i<10000; i++) {
//     let ix = Math.floor(Math.random() * train_data.length);
//     nn.train(train_data[ix].in, train_data[ix].out);
// }

// for(let i=0; i<train_data.length; i++) {
//     let guess = nn.test(train_data[i].in);
//     console.log(guess);
// }