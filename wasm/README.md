# Yespower WebAssembly Module

Yespower WebAssembly Module for Browsers / Node.js

## Prerequisites

* Node.js LTS or Browser where WebAssembly is enabled

## Install

```bash
$ yarn add yespower-wasm
```

or on html header / body

```html
<script src="https://cdn.jsdelivr.net/npm/yespower-wasm/lib/yespower.umd.min.js"></script>
```

WASM file is fully embedded on script so that you need to load nothing (and should work with any bundlers without hassle)

## Build WASM (optional)

Requires latest [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) WASM compiler

```bash
$ yarn && yarn build:wasm
```

Will update .wasm and bundled files

## Build library (optional)

Rebuild node.js and web umd bundle files

```bash
$ yarn && yarn build

```

## Example Code

```js
const { Yespower, bytesToHex, hexToBytes } = require('yespower-wasm');

async function test() {
    const yespower = await Yespower.init();

    console.log(bytesToHex(yespower.Hash(hexToBytes('2538dad623dab29a3d5387804ab51dea411014fad9c47fb94b2d83e44358064b'), 'pers')))
}

test();
```

Also refer `yespower.html` for example of using it on browser.