import { bundled } from './bundled';
import { base64ToBytes } from './utils';
import yespower_wasm, { MainModule } from './yespower_wasm.js';

export * from './utils';

type yespower_wasm = (input: number, inputLen: number, pers: string, persLen: number) => number;

export class Yespower {
    nByte: number;
    Module: MainModule;
    yespower_wasm: yespower_wasm;

    constructor(Module: MainModule) {
        this.nByte = 1;
        this.Module = Module;
        this.yespower_wasm = this.Module.cwrap('yespower_wasm', undefined, [
            'number',
            'number',
            'string',
            'number',
        ]) as yespower_wasm;
    }

    static async init() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (globalThis as any).WebAssembly === 'undefined') {
            throw new Error('WebAssembly is not enabled with this browser');
        }

        const wasmBinary = base64ToBytes(bundled);

        const module = await yespower_wasm({
            wasmBinary,
            locateFile: (file: string) => file,
        });

        return new Yespower(module);
    }

    // https://stackoverflow.com/questions/41875728/pass-a-javascript-array-as-argument-to-a-webassembly-function
    // Takes an Uint8Array, copies it to the heap and returns a pointer
    arrayToPtr(array: Uint8Array): number {
        const ptr = this.Module._malloc(array.length * this.nByte);
        this.Module.HEAPU8.set(array, ptr / this.nByte);
        return ptr;
    }

    // Takes a pointer and  array length, and returns a Uint8Array from the heap
    ptrToArray(ptr: number, length: number): Uint8Array {
        const array = new Uint8Array(length);
        const pos = ptr / this.nByte;
        array.set(this.Module.HEAPU8.subarray(pos, pos + length));
        return array;
    }

    freePtr(ptr: number) {
        this.Module._free(ptr);
    }

    Hash(input: Uint8Array, pers = ''): Uint8Array {
        const inputPtr = this.arrayToPtr(input);
        const ptr = this.yespower_wasm(inputPtr, input.length, pers, pers.length);
        const hash = this.ptrToArray(ptr, 32);
        this.freePtr(inputPtr);
        this.freePtr(ptr);
        return hash;
    }
}
