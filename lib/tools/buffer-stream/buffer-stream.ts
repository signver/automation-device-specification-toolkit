import { BufferStreamBase } from './buffer-stream-base'
import { IBufferStreamIOOP, IBufferStreamOptions, IBufferStreamIO } from './common'

export class BufferStream extends BufferStreamBase implements IBufferStreamIO {
    constructor(options: IBufferStreamOptions) {
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
    
    uint8(): number
    uint8(value: number): IBufferStreamIO
    uint8(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 1, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    uint16(): number
    uint16(value: number): IBufferStreamIO
    uint16(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 2, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    uint32(): number
    uint32(value: number): IBufferStreamIO
    uint32(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 4, unsigned: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    int8(): number
    int8(value: number): IBufferStreamIO
    int8(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 1, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    int16(): number
    int16(value: number): IBufferStreamIO
    int16(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 2, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    int32(): number
    int32(value: number): IBufferStreamIO
    int32(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 4, unsigned: false }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    float(): number
    float(value: number): IBufferStreamIO
    float(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 4, floatingPoint: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }

    double(): number
    double(value: number): IBufferStreamIO
    double(value ?: number) {
        const options: IBufferStreamIOOP = { bytes: 8, floatingPoint: true }
        if (typeof value === 'number') {
            this.write(value, options)
            return this as IBufferStreamIO
        }
        return this.read(options)
    }
}
