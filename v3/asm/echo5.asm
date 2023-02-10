#include "smol.asm"


; read 5 chars into stdin then print to stdout

buff_ptr = 0xff

_start:

  push 0x01 ; read
  push 0   ; position
  push 5  ; buf len
  push buff_ptr ; buffptr
  push 0 ; push stdin
  push 4 ; 4 arguments
  sys_call ; pushes num bytes read on the stack

  ;call print_str

  push 0x02 ; write
  push 0 ; position
  push 5
  push buff_ptr
  push 1 ; stdout
  push 4 ; 4 arguments
  sys_call

  halt


