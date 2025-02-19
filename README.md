Yespower for Node.js
============================

## Prerequisites

* Node.js LTS

## Install

```bash
$ yarn add yespower
```

## Build

```bash
$ yarn
```

## Example Code

```js
const { yespower } = require('yespower');

const data = new Buffer("7000000001e980924e4e1109230383e66d62945ff8e749903bea4336755c00000000000051928aff1b4d72416173a8c3948159a09a73ac3bb556aa6bfbcad1a85da7f4c1d13350531e24031b939b9e2b", "hex");
console.log(yespower(data).toString('hex'));
```
