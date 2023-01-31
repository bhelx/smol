#include "smol.asm"

hello_world_string = 0xff

_start:
  const hello_world_string
  .loop:
    dup
    load 
    dup
    emit
    swap
    const 1
    add
    swap
    jnz .loop
    

#addr hello_world_string
#d utf32le("Hello World!\0")
  
  



