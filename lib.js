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

// this is helpful for development but keeping them as arrays
// in the name of simplicity
// class Stack {
//   constructor() {
//     this.data = []
//   }
//   push(n) {
//     if (this.data.length >= 32) throw Error('Stack Overflow Error')
//     this.data.push(n)
//   }
//   pop() {
//     if (this.data.length == 0) throw Error('Stack Underflow Error')
//     return this.data.pop()
//   }
//   last() {
//     if (this.data.length == 0) throw Error('Stack Underflow Error')
//     return this.data[this.data.length-1]
//   }
// }

function readByteCode() {
  return fs.readFileSync(argv[2])
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
  readByteCode,
  getKeyPress,
}

