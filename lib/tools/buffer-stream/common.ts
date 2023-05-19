export interface IBufferStreamIOOP {
    bytes: number
    floatingPoint?: boolean
    unsigned?: boolean
}

export interface IBufferStreamOptions {
    expand?: boolean
    increment?: number
    size: number
}

export interface IBufferStream {
    endOfStream: boolean
    length: number
    shrinkwrap: ArrayBuffer
    seek(n: number, absolute?: boolean): IBufferStream
}

export interface IBufferStreamIO extends IBufferStream {
    littleEndian: IBufferStreamIO
    bigEndian: IBufferStreamIO
    seek(n: number, absolute?: boolean): IBufferStreamIO
    uint16: {
        (): number
        (value: number): IBufferStreamIO
    }
    uint32: {
        (): number
        (value: number): IBufferStreamIO
    }
    uint8: {
        (): number
        (value: number): IBufferStreamIO
    }
    int16: {
        (): number
        (value: number): IBufferStreamIO
    }
    int32: {
        (): number
        (value: number): IBufferStreamIO
    }
    int8: {
        (): number
        (value: number): IBufferStreamIO
    }
    float: {
        (): number
        (value: number): IBufferStreamIO
    }
    double: {
        (): number
        (value: number): IBufferStreamIO
    }
}
