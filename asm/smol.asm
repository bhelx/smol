#ruledef
{
    const {value} => 0x01 @ value`8
    add => 0x02
    sub => 0x03
    mul => 0x04
    emit => 0x05
    halt => 0x06
    call {value} => 0x07 @ value`8
    return => 0x08
    jnz  {address} => 0x09 @ address`8
    jmp  {address} => 0x0a @ address`8
    store {address} => 0x0b @ address`8
    load {address} => 0x0c @ address`8
    dup => 0x0d
    swap => 0x0e
    key => 0x0f
}

; You need a _start to jump to
; this is your main entry point
jmp _start
