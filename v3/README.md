# v3

v3 adds a sys call interface. Still a work in progress but right now you can open, close, and read files. We also removed `KEY` and `EMIT` 
since we can read and write to stdout through the syscall interface.

## SYS_CALLs


### Code 0x00 Open

```asm
push 0x00       ; 0 is code for open
push read_flags ; ptr to null terminated string of file open flags, [see node docs]
push file_path  ; ptr to null terminated string of file path
push 2          ; all sys calls must specify the numbe of args on the top of the stack
sys_call

; leaves the file descriptor on the stack

read_flags:
  #d utf32be("rs\0")

file_path:
  #d utf32be("./hello.txt\0")
```


### Code 0x01 Read

```asm
push 0x01       ; 1 is code for read
push 0          ; position to read from in the file
push 12         ; number of bytes to read from the file
push 0xff       ; ptr to some open location in memory to store the bytes
push fd         ; a file descriptor for open file, 0 for stdin, here would be a good place to call open
push 4          ; all sys calls must specify the numbe of args on the top of the stack
sys_call

; leaves number of bytes read on the stack
```

### Code 0x02 Write

```asm
push 0x02     ; 2 is for write
push 0        ; position in file to write to
push 12       ; length of data
push data     ; ptr to the data to write
push fd        ; a file descriptor for open file, 0 for stdin, here would be a good place to call open
push 4          ; all sys calls must specify the numbe of args on the top of the stack
sys_call

data:
  #d utf32be("Hello World!")
```


### Code 0x03 Close

```asm
push 0x03     ; 3 is for close
push fd       ; a file descriptor for open file
push 1        ; all sys calls must specify the numbe of args on the top of the stack
sys_call
```


