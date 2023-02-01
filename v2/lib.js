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

function createMemory() {
  const total_mem_sz = 64000
  const buffer = fs.readFileSync(argv[2])
  const len = Buffer.byteLength(buffer) / 4
  let mem = new Int32Array(len + total_mem_sz)
  for (let i = 0; i < len; i++) {
    mem[i] = buffer.readInt32BE(i * 4)
  }
  return {
    memory: mem,
    code_len: len
  }
}

function getKeyPress(){
  return new Promise(resolve => {
    process.stdin.setRawMode(true)
    process.stdin.setEncoding('utf8')
    process.stdin.resume()
    process.stdin.once('data',k => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      resolve(k.charCodeAt())
    })
  })
}

module.exports = {
  Logger,
  createMemory,
  getKeyPress,
}

