#include "smol.asm"

buff_ptr = 0xff

open_file:
  push 0x00
  push flags
  push hello_file
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

outbuff = 0xff

_start:

  push 0x01
  push 0   ; position
  push 11   ; buf len
  push outbuff ; buffptr
  ;push 0x00 ; stdin
  call open_file ; push fd
  push 4 ; 4 arguments
  sys_call ; pushes num bytes read on the stack

  ; push 0x03
  ; push 24
  ; push 1
  ; sys_call

  push outbuff
  call print_str

  halt


hello_file:
  #d utf32be("/tmp/hello.txt\0")
  
flags:
  #d utf32be("rs\0")

message_to_write:
  #d utf32be("hallo")
