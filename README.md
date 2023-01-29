# Smol

*Smol* is a tiny virtual machine for education.

The overall goal is to demystify virtual machines and encourage developers to dig lower
in their abstractions and learn more about how their systems work. It is written
in plain Javascript to appeal to as many people in this cohort as possible. This will eventually
have some material, probably a talk and slides, to go along with it.

My priorities are for the machine itself to be as small and easy
to understand as possible. Layers can be added with software written
in assembly or its own language. Performance and capabilties are not important,
but changes would be considered if they do not add much cognitive load.
I may also make a second, more advanced version that is backwards compatible so
some new concepts can be introduced without adding too much friction for the beginner.

# Using

For now you need [node.js](https://nodejs.org/en/) to run the vm 
and [customasm](https://github.com/hlorenzi/customasm) if you want to write programs 
in assembly. *Note*: you can write them in raw bytecode form.

```
# compile with customasm
# fib.asm computes fibonacci number of 10

customasm asm/fib.asm -o asm/fib.smol
# => customasm v0.11.15 (aarch64-apple-darwin)
# => assembling `asm/fib.asm`...
# => writing `asm/fib.smol`...
# => success after 1 iteration

# run with node

node index.js asm/fib.smol
# => 55
```


