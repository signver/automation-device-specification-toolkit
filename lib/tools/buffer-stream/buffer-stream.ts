import { BufferStreamBase } from './buffer-stream-base'
import { IBufferStreamIOOP, IBufferStreamOptions, IBufferStreamIO } from './common'

export class BufferStream extends BufferStreamBase implements IBufferStreamIO {
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
    public uint8(value: number): IBufferStreamIO
    public uint8(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 1, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    public uint16(): number
    public uint16(value: number): IBufferStreamIO
    public uint16(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 2, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    public uint32(): number
    public uint32(value: number): IBufferStreamIO
    public uint32(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 4, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    public int8(): number
    public int8(value: number): IBufferStreamIO
    public int8(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 1, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    public int16(): number
    public int16(value: number): IBufferStreamIO
    public int16(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 2, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    public int32(): number
    public int32(value: number): IBufferStreamIO
    public int32(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 4, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    public float(): number
    public float(value: number): IBufferStreamIO
    public float(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 4, floatingPoint: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    public double(): number
    public double(value: number): IBufferStreamIO
    public double(value?: number) {
        const options: IBufferStreamIOOP = { bytes: 8, floatingPoint: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }
}
