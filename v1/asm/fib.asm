#include "smol.asm"

fib:
  ; vars
  n2 = 0
  count = 1

  ; store this in count
  push count
  store

  ; start the sequence with [0, 1]
  push 0
  push 1

  .loop:
    ; store the second n but preserve stack
    dup
    push n2
    store

    add
    push n2
    load
    swap

    ; decrement count
    push count
    load
    push -1
    add
    dup
    push count
    store

    ; jump back to loop if we have not hit zero
    jnz .loop

  push n2
  load
  return


_start:
  push 10
  call fib
  emit
  halt

