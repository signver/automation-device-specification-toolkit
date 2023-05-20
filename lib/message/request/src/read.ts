import { MessageHeader } from '@signver/ads-message-core'
import { BufferStream } from '@signver/buffer-stream'

export class MessageRequestRead extends MessageHeader {
  private dataIndexGroup = 0
  private dataIndexOffset = 0
  private dataReadLength = 0


  public constructor() {
    super(12)
  }

  public override write(stream: BufferStream): BufferStream {
    super
      .write(stream)
      .uint32(this.dataIndexGroup)
      .uint32(this.dataIndexOffset)
      .uint32(this.dataReadLength)
    return stream
  }

  public override packetLength(): number
  public override packetLength(len: number): never
  public override packetLength(len?: number | undefined) {
    if (typeof len === 'number') {
      throw new Error(/**@todo */)
    }
    return 0 as number
  }

  public indexGroup(): number
  public indexGroup(n: number): MessageRequestRead
  public indexGroup(n?: number | undefined) {
    if (typeof n === 'number') {
      this.dataIndexGroup = n
      return this as MessageRequestRead
    }
    return this.dataIndexGroup
  }

  public indexOffset(): number
  public indexOffset(n: number): MessageRequestRead
  public indexOffset(n?: number | undefined) {
    if (typeof n === 'number') {
      this.dataIndexGroup = n
      return this as MessageRequestRead
    }
    return this.dataIndexOffset
  }

  public readLength(): number
  public readLength(n: number): MessageRequestRead
  public readLength(n?: number | undefined) {
    if (typeof n === 'number') {
      this.dataIndexGroup = n
      return this as MessageRequestRead
    }
    return this.dataReadLength
  }
}