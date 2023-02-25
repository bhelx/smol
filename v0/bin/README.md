# v1

v1 is meant to be the first working implementation with a turing complete ISA. The stack, return stack, memory, and code are still kept in separate
javascript arrays. We will unify the memory in v2.


I'd recommend going to the end of [vm.js](vm.js) and writing some programs by hand before you try the assembler.

```javascript
// comment out the part that reads code from the input file
//const code = readByteCode()

// code can just be an array of ints
// this small program pushes 2 numbers onto the stack
// adds and prints it
const code = [
  I.PUSH, 20,
  I.PUSH, 22,
  I.ADD,
  I.EMIT
]
let vm = smol(code)
vm.run()
```

```bash
node vm.js
# => 42
```

When you are ready to look at assembly you can compile and run like this:

```bash
# compile
customasm asm/fib.asm -o bin/fib.smol

# run
node vm.js bin/fib.smol
# => 55
```
