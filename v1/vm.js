const {
  readByteCode,
  Logger,
} = require("./lib")

const logger = new Logger()

const I = {
  PUSH: 1,
  ADD: 2,
  MUL: 3,
  EMIT: 4,
  HALT: 5,
  CALL: 6,
  RETURN: 7,
  JNZ: 8,
  JMP: 9,
  STORE: 10,
  LOAD: 11,
  DUP: 12,
  SWAP: 13,
};

function smol(code) {
  let ip = 0
  const stack = []
  const returnStack = []
  const memory = []
  logger.log(Array.from(code))

  async function run() {
    while (ip < code.length) {
      const instruction = code[ip++]
      switch (instruction) {
        case I.PUSH: {
          const op_value = code[ip++]
          logger.log(`PUSH ${op_value}`)
          stack.push(op_value)
          break
        }
        case I.ADD: {
          const op1 = stack.pop()
          const op2 = stack.pop()
          logger.log(`ADD ${op1} ${op2}`)
          stack.push(op1 + op2)
          break
        }
        case I.MUL: {
          const op1 = stack.pop()
          const op2 = stack.pop()
          stack.push(op1 * op2)
          break
        }
        case I.EMIT: {
          const value = stack.pop()
          logger.log(`EMIT ${value}`)
          // TODO should emit the char
          //process.stdout.write(String.fromCharCode(value))
          console.log(value)
          break
        }
        case I.HALT: {
          logger.log("HALT")
          return
        }
        case I.CALL: {
          let jmpto = code[ip]
          logger.log(`CALL ${jmpto}`)
          returnStack.push(ip + 1)
          ip = jmpto
          break
        }
        case I.RETURN: {
          logger.log("RETURN")
          ip = returnStack.pop()
          break
        }
        case I.JNZ: {
          const op_address = code[ip++]
          const value = stack.pop()
          logger.log(`JNZ ${op_address} ${value}`)
          if (value !== 0) {
            ip = op_address
          }
          break
        }
        case I.JMP: {
          const op_address = code[ip++]
          logger.log(`JMP ${op_address}`)
          ip = op_address
          break
        }
        case I.STORE: {
          const address = stack.pop()
          const value = stack.pop()
          logger.log(`STORE ${address} ${value}`)
          memory[address] = value
          break
        }
        case I.LOAD: {
          const address = stack.pop()
          logger.log(`LOAD ${address}`)
          stack.push(memory[address])
          break
        }
        case I.DUP: {
          logger.log("DUP")
          stack.push(stack[stack.length-1])
          break
        }
        case I.SWAP: {
          logger.log("SWAP")
          const top = stack.pop()
          const nxt = stack.pop()
          stack.push(top)
          stack.push(nxt)
          break
        }
        default:
          throw new Error(`Unknown instruction: ${instruction}.`)
      }
    }
  }

  return {
    run,
  };
}

//const code = readByteCode()
const code = [
  I.PUSH, 20,
  I.PUSH, 22,
  I.ADD,
  I.EMIT
]
let vm = smol(code)
vm.run()

