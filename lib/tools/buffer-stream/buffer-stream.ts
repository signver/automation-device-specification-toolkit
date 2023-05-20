import { BufferStreamBase } from './buffer-stream-base'
import { IBufferStreamIOOptions, IBufferStreamOptions } from './common'

export class BufferStream extends BufferStreamBase {
    public constructor(options: IBufferStreamOptions) {
        super(options)
    }

    public get littleEndian() {
        super.isLittleEndian = true
        return this
    }

    public get bigEndian() {
        super.isLittleEndian = false
        return this
    }

    public uint8(): number
    public uint8(value: number): BufferStream
    public uint8(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 1, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }

    public uint16(): number
    public uint16(value: number): BufferStream
    public uint16(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 2, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }

    public uint32(): number
    public uint32(value: number): BufferStream
    public uint32(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 4, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }

    public int8(): number
    public int8(value: number): BufferStream
    public int8(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 1, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }

    public int16(): number
    public int16(value: number): BufferStream
    public int16(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 2, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }

    public int32(): number
    public int32(value: number): BufferStream
    public int32(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 4, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }

    public float(): number
    public float(value: number): BufferStream
    public float(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 4, floatingPoint: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }

    public double(): number
    public double(value: number): BufferStream
    public double(value?: number) {
        const options: IBufferStreamIOOptions = { bytes: 8, floatingPoint: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as BufferStream
        }
        return this.read(options)
    }
}
