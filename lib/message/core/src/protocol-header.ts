import { rangeOfUint32 } from "@signver/assert/numbers"
import { BufferStream } from "@signver/buffer-stream"

export abstract class ProtocolHeader {
  private protocolHeaderLength = 0

  public constructor(len: number) {
    this.protocolHeaderLength = rangeOfUint32(len)
  }

  public write(stream: BufferStream) {
    stream.littleEndian.uint16(0).uint32(this.protocolHeaderLength)
  }

  public packetLength(): number
  public packetLength(len: number): ProtocolHeader
  public packetLength(len?: number) {
    if (typeof len === 'number') {
      this.protocolHeaderLength = rangeOfUint32(len)
      return this as ProtocolHeader
    }
    /* istanbul ignore next */
    return this.protocolHeaderLength
  }

}