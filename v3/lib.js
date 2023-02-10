const fs = require('fs')
const util = require('util')
const fsp = require('node:fs/promises')
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

async function readStdin(buffer) {
  process.stdin.setRawMode(true)
  process.stdin.setEncoding('utf8')
  process.stdin.resume()
  for (let i = 0; i < Buffer.byteLength(buffer); i++) {
    let p = new Promise(resolve => {
      process.stdin.once('data',k => {
        resolve(k.charCodeAt())
      })
    })
    buffer[i] = await p
  }
  process.stdin.setRawMode(false)
  process.stdin.pause()
  return Buffer.byteLength(buffer)
}

async function writeStdout(buffer) {
  process.stdout.write(buffer)
}


function readString(memory, ptr) {
  let result = []
  let c = memory[ptr]
  // read until null char
  while (c !== 0) {
    result.push(String.fromCharCode(c))
    c = memory[++ptr]
  }
  return result.join('')
}

async function sysCall(memory, code, ...args) {
  switch (code) {
    case 0x00: { // open
      let [fileNamePtr, flagPtr] = args
      const fileName = readString(memory, fileNamePtr)
      const flags = readString(memory, flagPtr)
      const fhandle = await fsp.open(fileName, flags)
      return [fhandle.fd]
    }
    case 0x01: { // read
      const [fd, buffptr, len, position] = args
      let bytesRead = null
      const buffer = Buffer.alloc(len)
      if (fd === process.stdin.fd) {
        bytesRead = await readStdin(buffer)
      } else {
        const result = fs.readSync(fd, buffer, 0, len, position)
        bytesRead = result.bytesRead
      }
      memory.set(buffer, buffptr)
      return [bytesRead]
    }
    case 0x02: // write
      const [wfd, buffptr, len, position] = args
      const buffer = new Uint8Array(memory.slice(buffptr, buffptr+len))
      let bytesWritten = null
      if (wfd === process.stdout.fd) {
        writeStdout(buffer)
      } else {
        const write = util.promisify(fs.write)
        const result = await write(wfd, buffer, 0, len, position)
        bytesWritten = result.bytesWritten
      }
      return [bytesWritten]
    case 0x03:
      const [cfd] = args
      fs.closeSync(cfd)
      return []
    default:
      return []
  }
}

module.exports = {
  Logger,
  createMemory,
  sysCall,
}

