import { rangeOfUint32 } from "@signver/assert/numbers"
import { BufferStream } from "../../../tools/buffer-stream"

export abstract class ProtocolHeader {
  private protocolHeaderLength = 0

  protected packetLength(): number
  protected packetLength(len: number): ThisType<ProtocolHeader>
  protected packetLength(len?: number) {
    if (typeof len === 'number') {
      this.protocolHeaderLength = rangeOfUint32(len)
      return this
    }
    return this.protocolHeaderLength
  }

  protected get bytes() {
    return new BufferStream({ size: 6 }).seek(2).littleEndian.uint32(this.protocolHeaderLength)
  }

  public constructor(len: number) {
    this.packetLength(len)
  }

}