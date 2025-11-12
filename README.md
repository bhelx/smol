# Smol

> *Note*: See [the video](https://www.youtube.com/watch?v=D7GxyHxyYA8) where I live code this project
> as the first talk for [below-c-level](https://belowclevel.org).

*Smol* is a tiny virtual machine for education.

The overall goal is to demystify virtual machines and encourage developers to dig lower
in their abstractions and learn more about how their systems work. It is written
in plain Javascript to appeal to as many people in this cohort as possible. This will eventually
have some material, probably a talk and slides, to go along with it.

My priorities are for the machine itself to be as small and easy
to understand as possible. Layers can be added with software written
in assembly or its own language. Performance and capabilities are not important,
but changes would be considered if they do not add much cognitive load.

I'm trying to make small advancements to the VM one step at a time starting with v0.
v0 and v1 are designed to be as easy to understand as follow. Things will get a little more complicated
as it evolves, but they should be bite sized steps.

To run this vm, you need [nodejs](https://nodejs.org/en/).
To run the assembler, you need [customasm](https://github.com/hlorenzi/customasm).

See the Readme for each version:

* [v0 Basic Adding Machine](v0/)
* [v1 Turing complete instruction set](v1/)
* [v2 Create unified memory architecture](v2/)
* [v3 Add a syscall interface](v3/)


