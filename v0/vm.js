const fs = require('fs')
const { argv } = require('node:process');

const I = {
  PUSH: 1,
  ADD: 2,
  EMIT: 4,
  HALT: 5,
};

function smol(code) {
  let ip = 0
  const stack = []

  while (ip < code.length) {
    const instruction = code[ip++]
    switch (instruction) {
      case I.PUSH: {
        const op_value = code[ip++]
        stack.push(op_value)
        break
      }
      case I.ADD: {
        const op1 = stack.pop()
        const op2 = stack.pop()
        stack.push(op1 + op2)
        break
      }
      case I.EMIT: {
        const value = stack.pop()
        console.log(value)
        break
      }
      case I.HALT: {
        return
      }
      default:
        throw new Error(`Unknown instruction: ${instruction}.`)
    }
  }
}

// const code = fs.readFileSync(argv[2])

const code = [
  I.PUSH, 20,
  I.PUSH, 22,
  I.ADD,
  I.EMIT,
]

smol(code)

