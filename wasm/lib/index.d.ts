import yespower_wasm, { MainModule } from './yespower_wasm.js';
export * from './utils';
type yespower_wasm = (input: number, inputLen: number, pers: string, persLen: number) => number;
export declare class Yespower {
    nByte: number;
    Module: MainModule;
    yespower_wasm: yespower_wasm;
    constructor(Module: MainModule);
    static init(): Promise<Yespower>;
    arrayToPtr(array: Uint8Array): number;
    ptrToArray(ptr: number, length: number): Uint8Array;
    freePtr(ptr: number): void;
    Hash(input: Uint8Array, pers?: string): Uint8Array;
}
