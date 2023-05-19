import { BufferStream } from '@signver/buffer-stream'
import { MessageHeader } from './message-header'

class MessageHeaderTest extends MessageHeader { }

describe("MessageHeader", () => {
  it("should set have default protocol packet length", () => {
    const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
    const hdr = new MessageHeaderTest(0)
    hdr.write(buf)
    expect(hdr.packetLength()).toStrictEqual(0)
    expect(buf.littleEndian.seek(2, true).uint32()).toStrictEqual(32)
    expect(buf.seek(20).uint32()).toStrictEqual(0)
  })

  describe(".packetLength", () => {
    it("should automatically add the base header length", () => {
      const buf = new BufferStream({ size: 6, expand: true, increment: 32 })
      const hdr = new MessageHeaderTest(0)
      hdr.packetLength(8).write(buf)
      expect(hdr.packetLength()).toStrictEqual(8)
      expect(buf.seek(2, true).uint32()).toStrictEqual(40)
      expect(buf.seek(20).uint32()).toStrictEqual(8)
    })
  })
})