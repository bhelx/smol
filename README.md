# Smol

*Smol* is a tiny virtual machine for education.

The overall goal is to demystify virtual machines and encourage developers to dig lower
in their abstractions and learn more about how their systems work. It is written
in plain Javascript to appeal to as many people in this cohort as possible. This will eventually
have some material, probably a talk and slides, to go along with it.

My priorities are for the machine itself to be as small and easy
to understand as possible. Layers can be added with software written
in assembly or its own language. Performance and capabilities are not important,
but changes would be considered if they do not add much cognitive load.

I'm considering the idea of making advancements to the VM a step at a time and
incrementing the version number. They should be roughly backwards compatible but
add new capabilities and tricks along the way.

Right now I have [v1](/v1) and [v2](/v2).

# Using

For now you need [node.js](https://nodejs.org/en/) to run the VM
and [customasm](https://github.com/hlorenzi/customasm) if you want to write programs 
in assembly. *Note*: you can write them in raw bytecode form.

```
customasm v1/asm/fib.asm -o v1/bin/fib.smol
customasm v2/asm/hello_world.asm -o v2/bin/hello_world.smol
customasm v2/asm/guess.asm -o v2/bin/guess.smol

# run with node

node v1/vm.js v1/bin/fib.smol
# => 55

node v2/vm.js v2/bin/hello_world.smol
# => Hello World!
# => 


node v2/vm.js v2/bin/guess.smol
Input Guess: 1
Incorrect! Try again!
Input Guess: 4
Incorrect! Try again!
Input Guess: 7
Correct!
```


