const {
  Logger,
  getKeyPress,
  createMemory,
  sysCall,
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
  KEY: 14,
  SYS_CALL: 15,
};

const STACK_SIZE = 32

function smol(m) {
  const memory = m.memory

  let ip = 0
  let sp = memory.length 
  let rsp = memory.length - STACK_SIZE
  logger.log(memory)
  logger.log(memory.slice(255, 300))

  async function run() {
    while (true) {
      const instruction = memory[ip++]
      switch (instruction) {
        case I.PUSH: {
          const op_value = memory[ip++]
          logger.log(`PUSH ${op_value}`)
          memory[--sp] = op_value
          break
        }
        case I.ADD: {
          const op1 = memory[sp++]
          const op2 = memory[sp++]
          logger.log(`ADD ${op1} ${op2}`)
          memory[--sp] = op1 + op2
          break
        }
        case I.MUL: {
          const op1 = memory[sp++]
          const op2 = memory[sp++]
          logger.log(`MUL ${op1} ${op2}`)
          memory[--sp] = op1 * op2
          break
        }
        case I.EMIT: {
          const value = memory[sp++]
          logger.log(`EMIT ${value}`)
          process.stdout.write(String.fromCharCode(value))
          break
        }
        case I.HALT: {
          logger.log("HALT")
          return
        }
        case I.CALL: {
          let jmpto = memory[ip]
          logger.log(`CALL ${jmpto}`)
          memory[--rsp] = ip + 1
          ip = jmpto
          break
        }
        case I.RETURN: {
          logger.log("RETURN")
          ip = memory[rsp++]
          break
        }
        case I.JNZ: {
          const op_address = memory[ip++]
          const value = memory[sp++]
          logger.log(`JNZ ${op_address} ${value}`)
          if (value !== 0) {
            ip = op_address
          }
          break
        }
        case I.JMP: {
          const op_address = memory[ip++]
          logger.log(`JMP ${op_address}`)
          ip = op_address
          break
        }
        case I.STORE: {
          const address = memory[sp++]
          const value = memory[sp++]
          logger.log(`STORE ${address} ${value}`)
          memory[address] = value
          break
        }
        case I.LOAD: {
          const address = memory[sp++]
          logger.log(`LOAD ${address}`)
          memory[--sp] = memory[address]
          break
        }
        case I.DUP: {
          logger.log("DUP")
          let top = memory[sp]
          memory[--sp] = top
          break
        }
        case I.SWAP: {
          logger.log("SWAP")
          const top = memory[sp++]
          const nxt = memory[sp++]
          memory[--sp] = top
          memory[--sp] = nxt
          break
        }
        case I.KEY: {
          const key = await getKeyPress()
          memory[--sp] = key
          break
        }
        case I.SYS_CALL:
          // get the nmber of arguments
          const n = memory[sp++]
          const args = []
          for (let i = 0; i < n; i++) {
            args.push(memory[sp++])
          }
          const code = memory[sp++]
          logger.log(`SYS_CALL ${code} ${JSON.stringify(args)}`)
          let results = await sysCall(memory, code, ...args)
          results.forEach(v => memory[--sp] = v)
          break
        default:
          throw new Error(`Unknown instruction: ${instruction}.`)
      }
    }
  }

  return {
    run,
  }
}

let vm = smol(createMemory())
vm.run()

