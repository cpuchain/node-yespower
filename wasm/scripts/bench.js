const { Yespower } = require('../lib');

const tests = 30;

async function bench() {
    const yespower = await Yespower.init();

    const timeStart = Date.now();
    
    for (let i = 0; i < tests; ++i) {
        const buf = Buffer.allocUnsafe(4);
        buf.writeUint32BE(i)
        yespower.Hash(buf);
    }

    const timeTook = Date.now() - timeStart;
    const hps = Math.floor(1000 * tests / timeTook);

    console.log(`${tests} Tests: ${Date.now() - timeStart}ms (${hps}H/s)`);
}
bench();