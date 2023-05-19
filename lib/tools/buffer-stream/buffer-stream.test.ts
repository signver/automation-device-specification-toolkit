import { BufferStream } from './buffer-stream'

describe("BufferStream", () => {
    it("should be contiguous read and write", () => {
        const data =  new BufferStream({ size: (2 * (1 + 2 + 4)) + 4 + 8, expand: false })
            .int8(1)
            .int16(2)
            .int32(3)
            .uint8(4)
            .uint16(5)
            .uint32(6)
            .float(7.5)
            .double(8.5)
            .seek(0, true)
        expect(data.int8()).toStrictEqual(1)
        expect(data.int16()).toStrictEqual(2)
        expect(data.int32()).toStrictEqual(3)
        expect(data.uint8()).toStrictEqual(4)
        expect(data.uint16()).toStrictEqual(5)
        expect(data.uint32()).toStrictEqual(6)
        expect(Math.abs(7.5 - data.float())).toBeLessThanOrEqual(0.01)
        expect(Math.abs(8.5 - data.double())).toBeLessThanOrEqual(0.01)
    })

    it("should shrink length to last position", () => {
        const b = new BufferStream({ size: 4, expand: false }).int8(1).int8(2).shrinkwrap
        const d = new DataView(b)
        expect(d.byteLength).toStrictEqual(2)
        expect(d.getUint8(0)).toStrictEqual(1)
        expect(d.getUint8(1)).toStrictEqual(2)
    })

    it("should change endianness", () => {
        const b = new BufferStream({ size: 4, expand: false }).littleEndian.int16(1).bigEndian.int16(2).shrinkwrap
        const d = new DataView(b)
        expect(d.getInt16(0, true)).toStrictEqual(1)
        expect(d.getInt16(2, false)).toStrictEqual(2)
    })

    it("should be able to change stream location", () => {
        const b = new BufferStream({ size: 4, expand: false }).int8(1).int8(2).seek(-2).int8(3).seek(3, true).int8(4).shrinkwrap
        const d = new DataView(b)
        expect(d.getUint8(0)).toStrictEqual(3)
        expect(d.getUint8(1)).toStrictEqual(2)
        expect(d.getUint8(2)).toStrictEqual(0)
        expect(d.getUint8(3)).toStrictEqual(4)
    })

    it("should throw if end of stream", () => {
        const b = new BufferStream({ size: 4, expand: false }).int32(1)
        expect(b.endOfStream).toStrictEqual(true)
        expect(() => {
            b.int8(0)
        }).toThrow()
        expect(() => {
            b.int8()
        }).toThrow()
        expect(() => {
            b.seek(-1, true)
        }).toThrow()
        expect(() => {
            b.seek(5, true)
        }).toThrow()
    })

    it("should expand if allowed", () => {
        const b = new BufferStream({ size: 1, expand: true, increment: 4 }).int8(1)
        expect(b.endOfStream).toStrictEqual(true)
        expect(() => {
            b.int32(2)
            b.int32(3)
        }).not.toThrow()
        expect(b.endOfStream).toStrictEqual(false)
        expect(b.length).toStrictEqual(1 + 4 + (2 * 4))
    })
})