const { webcrypto: crypto } = require('crypto');
const { yespower } = require('../index');

const getRandomHex = () => Buffer.from(crypto.getRandomValues(new Uint8Array(32)));

const pers = 'pers';

const num = 5;

function createCases() {
    const cases = [];

    for (let i = 0; i < num; ++i) {
        const input = getRandomHex();
        const output = yespower(input, pers);
        
        cases.push({
            input: input.toString('hex'),
            output: output.toString('hex'),
        });
    }

    console.log(cases);
}

createCases();