const fs = require('fs')
const { env, argv } = require('node:process');

class Logger {
  constructor() {
    if (env["VM_DEBUG"]) {
      this.logger = console
    }
  }
  log(msg) {
    if (this.logger) this.logger.log(msg)
  }
}

/**
 * Reads the file passed in to arg[2] from the command line.
 * In order to support 32 bit numbers, we are making our minimum
 * size 32 bits. We read the file 4 bytes at a time since readFile
 * presents them to us as 8-bit bytes. 
 */
function readByteCode() {
  const buffer = fs.readFileSync(argv[2])
  const len = Buffer.byteLength(buffer) / 4
  let out = new Int32Array(len)
  for (let i = 0; i < len; i++) {
    out[i] = buffer.readInt32BE(i * 4)
  }
  return out
}

module.exports = {
  Logger,
  readByteCode,
}

