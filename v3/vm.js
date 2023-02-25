const {
  Logger,
  createMemory,
  sysCall,
} = require("./lib")

const logger = new Logger()

const I = {
  PUSH: 1,
  ADD: 2,
  MUL: 3,
  HALT: 4,
  CALL: 5,
  RETURN: 6,
  JNZ: 7,
  JMP: 8,
  STORE: 9,
  LOAD: 10,
  DUP: 11,
  SWAP: 12,
  SYS_CALL: 13,
};

const STACK_SIZE = 32

function smol(m) {
  const memory = m.memory

  let ip = 0
  let sp = memory.length 
  let rsp = memory.length - STACK_SIZE
  logger.log(memory)

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

