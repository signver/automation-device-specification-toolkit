import { AMSNetAddress } from "@signver/ams-address";
import { ProtocolHeader } from "./protocol-header";
import { BufferStream } from "@signver/buffer-stream";
import { rangeOfUint16, rangeOfUint32 } from "@signver/assert/numbers";

export abstract class MessageHeader extends ProtocolHeader {
  private static readonly messageHeaderBaseLength = 32
  private messageHeaderFrom: AMSNetAddress = new AMSNetAddress()
  private messageHeaderTo: AMSNetAddress = new AMSNetAddress()
  private messageHeaderCommand: number = 0
  private messageHeaderFlags: number = 0
  private messageHeaderLength: number = 0
  private messageHeaderErrorCode: number = 0
  private messageHeaderInvokeID: number = 0

  public constructor(dataLength: number) {
    super(MessageHeader.messageHeaderBaseLength + dataLength)
    this.messageHeaderLength = rangeOfUint32(dataLength)
  }

  public override write(stream: BufferStream) {
    super.write(stream)

    this.messageHeaderFrom.octet().forEach(byte => {
      stream.uint8(byte)
    })
    stream.uint16(this.messageHeaderFrom.port())

    this.messageHeaderTo.octet().forEach(byte => {
      stream.uint8(byte)
    })
    stream.uint16(this.messageHeaderTo.port())

    stream.uint16(this.messageHeaderCommand)
    stream.uint16(this.messageHeaderFlags)
    stream.uint32(this.messageHeaderLength)
    stream.uint32(this.messageHeaderErrorCode)
    stream.uint32(this.messageHeaderInvokeID)
  }

  public override packetLength(): number;
  public override packetLength(len: number): MessageHeader;
  public override packetLength(len?: number | undefined) {
    if (typeof len === 'number') {
      this.messageHeaderLength = rangeOfUint32(len)
      super.packetLength(MessageHeader.messageHeaderBaseLength + len)
      return this as MessageHeader
    }
    return this.messageHeaderLength
  }

  public from(): AMSNetAddress;
  public from(id: string, port: number): MessageHeader;
  public from(id?: string, port?: number) {
    if (typeof id === 'string' && typeof port === 'number') {
      this.messageHeaderFrom.octet(id).port(port)
      return this as MessageHeader
    }
    return AMSNetAddress.clone(this.messageHeaderFrom)
  }

  public to(): AMSNetAddress;
  public to(id: string, port: number): MessageHeader;
  public to(id?: string, port?: number) {
    if (typeof id === 'string' && typeof port === 'number') {
      this.messageHeaderTo.octet(id).port(port)
      return this as MessageHeader
    }
    return AMSNetAddress.clone(this.messageHeaderTo)
  }

  public command(): number;
  public command(n: number): MessageHeader;
  public command(n?: number) {
    if (typeof n === 'number') {
      this.messageHeaderCommand = rangeOfUint16(n)
      return this as MessageHeader
    }
    return this.messageHeaderCommand
  }

  public flags(): number;
  public flags(n: number): MessageHeader;
  public flags(n?: number) {
    if (typeof n === 'number') {
      this.messageHeaderFlags = rangeOfUint16(n)
      return this as MessageHeader
    }
    return this.messageHeaderFlags
  }

  public errorCode(): number;
  public errorCode(n: number): MessageHeader;
  public errorCode(n?: number) {
    if (typeof n === 'number') {
      this.messageHeaderErrorCode = rangeOfUint32(n)
      return this as MessageHeader
    }
    return this.messageHeaderErrorCode
  }

  public invokeID(): number;
  public invokeID(n: number): MessageHeader;
  public invokeID(n?: number) {
    if (typeof n === 'number') {
      this.messageHeaderInvokeID = rangeOfUint32(n)
      return this as MessageHeader
    }
    return this.messageHeaderInvokeID
  }

}