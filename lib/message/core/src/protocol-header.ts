import { rangeOfUint32 } from "@signver/assert/numbers"
import { BufferStream } from "@signver/buffer-stream"
import { createDefaultBuffer } from './create-default-buffer'

export abstract class ProtocolHeader {
  private protocolHeaderLength = 0

  public constructor(len: number) {
    this.protocolHeaderLength = rangeOfUint32(len)
  }

  public write(
    // unlikely to be touched by users
    /* istanbul ignore next */
    stream: BufferStream = createDefaultBuffer()
  ) {
    stream.uint16(0).uint32(this.protocolHeaderLength)
    return stream
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