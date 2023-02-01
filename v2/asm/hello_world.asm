#include "smol.asm"

; takes the address to the string on the stack
print_str:
  .loop:
    dup
    load 
    dup
    emit
    swap
    push 1
    add
    swap
    jnz .loop
  return

_start:
  push hello_world_string
  call print_str
  ; newline
  push 10
  emit 
  ; newline
  push 10
  emit 
  ; newline
  push 10
  emit 
  halt
    

hello_world_string:
  #d utf32be("Hello World!\0")
  

