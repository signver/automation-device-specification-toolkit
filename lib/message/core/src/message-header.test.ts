import { BufferStream } from '@signver/buffer-stream'
import { MessageHeader } from './message-header'

class MessageHeaderTest extends MessageHeader { }

describe("MessageHeader", () => {
  it("should have a default protocol packet length", () => {
    const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
    const hdr = new MessageHeaderTest(0)
    hdr.write(buf)
    expect(buf.littleEndian.seek(2, true).uint32()).toStrictEqual(32)
  })

  describe(".packetLength", () => {
    it("should automatically add the base length", () => {
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.packetLength(8).write(buf)
      expect(buf.seek(2, true).uint32()).toStrictEqual(40)
    })

    it("should write to the correct position in the buffer", () => {
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.packetLength(8).write(buf)
      expect(hdr.packetLength()).toStrictEqual(8)
      expect(buf.seek(6, true).seek(20).uint32()).toStrictEqual(8)
    })

  })

  describe(".from", () => {
    it("should write to the correct position in the buffer", () => {
      const id = [192, 168, 0, 1, 1, 1]
      const port = 100
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.from(id.join('.'), port).write(buf)
      expect(hdr.from().octet()).toEqual(expect.arrayContaining(id))
      expect(hdr.from().port()).toStrictEqual(port)
      buf.seek(6, true)
      id.forEach(x => {
        expect(buf.uint8()).toStrictEqual(x)
      })
      expect(buf.uint16()).toStrictEqual(port)
    })
  })

  describe(".to", () => {
    it("should write to the correct position in the buffer", () => {
      const id = [192, 168, 0, 1, 1, 1]
      const port = 100
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.to(id.join('.'), port).write(buf)
      expect(hdr.to().octet()).toEqual(expect.arrayContaining(id))
      expect(hdr.to().port()).toStrictEqual(port)
      buf.seek(6, true).seek(8)
      id.forEach(x => {
        expect(buf.uint8()).toStrictEqual(x)
      })
      expect(buf.uint16()).toStrictEqual(port)
    })
  })

  describe(".command", () => {
    it("should write to the correct position in the buffer", () => {
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.command(8).write(buf)
      expect(hdr.command()).toStrictEqual(8)
      expect(buf.seek(6, true).seek(16).uint16()).toStrictEqual(8)
    })
  })

  describe(".flags", () => {
    it("should write to the correct position in the buffer", () => {
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.flags(8).write(buf)
      expect(hdr.flags()).toStrictEqual(8)
      expect(buf.seek(6, true).seek(18).uint16()).toStrictEqual(8)
    })
  })

  describe(".errorCode", () => {
    it("should write to the correct position in the buffer", () => {
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.errorCode(8).write(buf)
      expect(hdr.errorCode()).toStrictEqual(8)
      expect(buf.seek(6, true).seek(24).uint32()).toStrictEqual(8)
    })
  })

  describe(".invokeID", () => {
    it("should write to the correct position in the buffer", () => {
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.invokeID(8).write(buf)
      expect(hdr.invokeID()).toStrictEqual(8)
      expect(buf.seek(6, true).seek(28).uint32()).toStrictEqual(8)
    })
  })
})