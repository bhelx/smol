#bits 32

#ruledef
{
    const {value: i32} => 0x00000001 @ value
    add => 0x00000002
    mul => 0x00000003
    emit => 0x00000004
    halt => 0x00000005
    call {value} => 0x00000006 @ value`32
    return => 0x00000007
    jnz  {address} => 0x00000008 @ address`32
    jmp  {address} => 0x00000009 @ address`32
    store {address} => 0x0000000a @ address`32
    load {address} => 0x0000000b @ address`32
    dup => 0x0000000c
    swap => 0x0000000d
    key => 0x0000000e
}

; You need a _start to jump to
; this is your main entry point
jmp _start
