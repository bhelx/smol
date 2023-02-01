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


; takes a char code on top of stack and turns into a number
string_to_int:
  ; just offset the char code by 48
  push -48
  add
  return

_start:

  .loop:
    ; print prompt
    push prompt_string
    call print_str

    ; wait for a key
    key

    ; echo to them
    dup
    emit

    ; print newline
    push 10
    emit

    call string_to_int

    ; we don't have access to randomness,
    ; so the lucky number is 7
    push -7
    add

    jnz .failed
    jmp .end

    .failed:
      push incorrect_string
      call print_str
      jmp .loop

  .end:
    push correct_string
    call print_str
    halt
    

prompt_string:
  #d utf32be("Input Guess: \0")
  
correct_string:
  #d utf32be("Correct! \n\0")

incorrect_string:
  #d utf32be("Incorect! Try again! \n\0")

