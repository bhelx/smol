#include "smol.asm"

buff_ptr = 0xff

open_input_file:
  push 0x00
  push read_flags
  push hello_file
  push 2
  sys_call
  return

open_output_file:
  push 0x00
  push write_flags
  push output_file
  push 2
  sys_call
  return

; takes the address to the string on the stack
; warning, only works because we know 0 padding
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

  push 0x01
  push 0   ; position
  push 12   ; buf len
  push buff_ptr ; buffptr
  call open_input_file ; push fd
  push 4 ; 4 arguments
  sys_call ; pushes num bytes read on the stack

  push buff_ptr
  call print_str

  push 0x02
  push 0 ; position
  push 12 ; length
  push buff_ptr ; ptr
  call open_output_file
  push 4
  sys_call

  halt


hello_file:
  #d utf32be("./hello.txt\0")

output_file:
  #d utf32be("./hello_out.txt\0")
  
read_flags:
  #d utf32be("rs\0")

write_flags:
  #d utf32be("w\0")
