import { MessageRequestRead } from './read'

describe("MessageRequestRead", () => {
  it("should set the packet length", () => {
    const msg = new MessageRequestRead()
    const buf = msg.write()
    expect(buf.seek(2, true).uint32()).toStrictEqual(32 + 12)
    expect(buf.seek(20).uint32()).toStrictEqual(12)
  })

  describe(".packetLength", () => {
    it("should not be supported", () => {
      const msg = new MessageRequestRead()
      expect(msg.packetLength()).toStrictEqual(0)
      expect(() => { msg.packetLength(0xfe) }).toThrow()
      expect(msg.write().seek(2, true).uint32()).toStrictEqual(32 + 12)
    })

  })

  describe(".indexGroup", () => {
    it("should set the value correctly", () => {
      const msg = new MessageRequestRead().indexGroup(0xfe)
      expect(msg.indexGroup()).toStrictEqual(0xfe)
    })

    it("should write to the correct buffer position", () => {
      const msg = new MessageRequestRead().indexGroup(0xfe)
      expect(msg.write().seek(38, true).uint32()).toStrictEqual(msg.indexGroup())
    })

  })

  describe(".indexOffset", () => {
    it("should set the value correctly", () => {
      const msg = new MessageRequestRead().indexOffset(0xfe)
      expect(msg.indexOffset()).toStrictEqual(0xfe)
    })

    it("should write to the correct buffer position", () => {
      const msg = new MessageRequestRead().indexOffset(0xfe)
      expect(msg.write().seek(42, true).uint32()).toStrictEqual(msg.indexOffset())
    })
  })

  describe(".readLength", () => {
    it("should set the value correctly", () => {
      const msg = new MessageRequestRead().readLength(0xfe)
      expect(msg.readLength()).toStrictEqual(0xfe)
    })

    it("should write to the correct buffer position", () => {
      const msg = new MessageRequestRead().readLength(0xfe)
      expect(msg.write().seek(46, true).uint32()).toStrictEqual(msg.readLength())
    })
  })
})