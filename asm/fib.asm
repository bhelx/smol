#include "smol.asm"

fib:
  ; vars
  n2 = 0
  count = 1

  ; store this in count
  store count

  ; start the sequence with [0, 1]
  const 0
  const 1

  .loop:
    ; store the second n but preserve stack
    dup
    store n2

    add
    load n2
    swap

    ; decrement count
    load count
    const 1
    sub
    dup
    store count

    ; jump back to loop if we have not hit zero
    jnz .loop

  load n2
  return

  
_start:
  const 10
  call fib
  emit
  halt
