# v0

v0 is meant to be the simplest instructions needed to add 2 numbers and print. The stack, return stack, memory, and code are all kept in separate
javascript arrays. This gives you nice methods like pop() and push() and makes the logic very clear. We will eventually get to unifying the memory
in v2.


I'd recommend going to the end of [vm.js](vm.js) and writing some programs by hand before you try the assembler.

```javascript
// code can just be an array of ints
// this small program pushes 2 numbers onto the stack
// adds and prints it
const code = [
  I.PUSH, 20,
  I.PUSH, 22,
  I.ADD,
  I.EMIT
]
smol(code)
```

```bash
node vm.js
# => 42
```

When you are ready to look at assembly you can compile and run like this:

```bash
# compile
customasm asm/add.asm -o bin/add.smol

# run
node vm.js bin/add.smol
# => 42
```
