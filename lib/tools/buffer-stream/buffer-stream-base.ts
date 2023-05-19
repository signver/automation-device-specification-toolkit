import { IBufferStreamIOOP, IBufferStreamOptions, IBufferStreamIO } from './common'

type DataViewMethod<Key extends keyof DataView> =  DataView[Key]
type MultiByteReadMethod = DataViewMethod<'getFloat32' | 'getFloat64' | 'getInt16' | 'getInt32' | 'getUint16' | 'getUint32'>
type SingleByteReadMethod = DataViewMethod<'getInt8' | 'getUint8'>
type MultiByteWriteMethod = DataViewMethod<'setFloat32' | 'setFloat64' | 'setInt16' | 'setInt32' | 'setUint16' | 'setUint32'>
type SingleByteWriteMethod = DataViewMethod<'setInt8' | 'setUint8'>

export abstract class BufferStreamBase {
    private static method: { [key in 'float' | 'int' | 'uint']: { [key: number]: { [key in 'get' | 'set']: keyof DataView } } } = {
        float: {
            4: { get: "getFloat32", set: "setFloat32" },
            8: { get: "getFloat64", set: "setFloat64" }
        },
        int: {
            1: { get: "getInt8", set: "setInt8" },
            2: { get: "getInt16", set: "setInt16" },
            4: { get: "getInt32", set: "setInt32" },
        },
        uint: {
            1: { get: "getUint8", set: "setUint8" },
            2: { get: "getUint16", set: "setUint16" },
            4: { get: "getUint32", set: "setUint32" },
        }
    }
    private optionLittleEndian = true
    private expandable = false
    private buffer: ArrayBuffer
    private bufferView: DataView
    private position = 0
    private increment = 128

    private expand() {
        const expanded = new ArrayBuffer(this.buffer.byteLength + this.increment)
        const expandedView = new DataView(expanded)
        for (let i = 0; i < this.buffer.byteLength; i++) {
            expandedView.setUint8(i, this.bufferView.getUint8(i))
        }
        this.buffer = expanded
        this.bufferView = expandedView
        this.increment = this.increment * 2
    }

    private tryAdvance(n: number, allowExpand?: boolean): void {
        const end = this.position + n
        if (end > this.bufferView.byteLength) {
            if (!allowExpand) throw new Error(/**@todo */)
            this.expand()
            return this.tryAdvance(n, allowExpand)
        }
        return
    }

    protected set isLittleEndian(value: boolean) {
        this.optionLittleEndian = value
    }

    protected read(options: IBufferStreamIOOP) {
        const { bytes, floatingPoint, unsigned } = options
        const method = floatingPoint ? BufferStreamBase.method.float[bytes]?.get : unsigned ? BufferStreamBase.method.uint[bytes]?.get : BufferStreamBase.method.int[bytes]?.get
        if (!method) throw new Error(/**@todo */)
        this.tryAdvance(bytes, false)
        const value = bytes > 1 ? 
            (this.bufferView[method] as MultiByteReadMethod)(this.position, this.optionLittleEndian) :
            (this.bufferView[method] as SingleByteReadMethod)(this.position)
        this.seek(bytes)
        return value
    }

    protected write(value: number, options: IBufferStreamIOOP) {
        const { bytes, floatingPoint, unsigned } = options
        const method = floatingPoint ? BufferStreamBase.method.float[bytes]?.set : unsigned ? BufferStreamBase.method.uint[bytes]?.set : BufferStreamBase.method.int[bytes]?.set
        if (!method) throw new Error(/**@todo */)
        this.tryAdvance(bytes, this.expandable)
        if (bytes > 1) (this.bufferView[method] as MultiByteWriteMethod)(this.position, value, this.optionLittleEndian)
        else (this.bufferView[method] as SingleByteWriteMethod)(this.position, value)
        this.seek(bytes)
    }

    constructor({ expand, size }: IBufferStreamOptions) {
        this.expandable = expand || false
        this.buffer = new ArrayBuffer(size)
        this.bufferView = new DataView(this.buffer)
    }

    public get endOfStream() {
        return this.position >= this.buffer.byteLength
    }

    public get shrinkwrap() {
        return this.buffer.slice(0, this.position)
    }

    public seek(n: number, absolute?: boolean) {
        const end = absolute ? n : this. position + n
        if (end < 0 || end > this.buffer.byteLength) throw new Error(/**@todo */)
        this.position = end
        return this
    }

}
