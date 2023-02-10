#bits 32

#ruledef
{
    push {value: i32} => 0x00000001 @ value
    add => 0x00000002
    mul => 0x00000003
    halt => 0x00000004
    call {value} => 0x00000005 @ value`32
    return => 0x00000006
    jnz  {address} => 0x00000007 @ address`32
    jmp  {address} => 0x00000008 @ address`32
    store => 0x00000009
    load => 0x0000000a
    dup => 0x0000000c
    swap => 0x0000000c
    sys_call => 0x0000000d
}

; You need a _start to jump to
; this is your main entry point
jmp _start
