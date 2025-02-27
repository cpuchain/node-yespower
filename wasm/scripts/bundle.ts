import { readFile, writeFile } from 'fs/promises';
import { bytesToBase64 } from '../src/utils';

async function bundle() {
    const wasm = new Uint8Array((await readFile('./src/yespower_wasm.wasm')).buffer);

    await writeFile('./src/bundled.ts', `export const bundled = "${bytesToBase64(wasm)}"`);

    console.log('Wrote ./src/bundled.ts with bundled wasm file');
}
bundle();
