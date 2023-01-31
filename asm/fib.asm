#include "smol.asm"

fib:
  ; vars
  n2 = 0
  count = 1

  ; store this in count
  const count
  store

  ; start the sequence with [0, 1]
  const 0
  const 1

  .loop:
    ; store the second n but preserve stack
    dup
    const n2
    store

    add
    const n2
    load
    swap

    ; decrement count
    const count
    load
    const -1
    add
    dup
    const count
    store

    ; jump back to loop if we have not hit zero
    jnz .loop

  const n2
  load
  return


_start:
  const 10
  call fib
  emit
  halt

