const { yespower } = require('../index');

const tests = 30;
const timeStart = Date.now();

for (let i = 0; i < tests; ++i) {
    const buf = Buffer.allocUnsafe(4);
    buf.writeUint32BE(i)
    console.log(yespower(buf).toString('hex'));
}

const timeTook = Date.now() - timeStart;
const hps = Math.floor(1000 * tests / timeTook);

console.log(`${tests} Tests: ${Date.now() - timeStart}ms (${hps}H/s)`);