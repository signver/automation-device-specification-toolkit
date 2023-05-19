import { AMSNetAddress } from "@signver/ams-address";
import { ProtocolHeader } from "./protocol-header";

export abstract class MessageHeader extends ProtocolHeader {
  private static readonly baselength = 32
  private messageHeaderFrom: AMSNetAddress = new AMSNetAddress()
  private messageHeaderTo: AMSNetAddress = new AMSNetAddress()
  private messageHeaderCommand: number = 0
  private messageHeaderFlags: number = 0
  private messageHeaderLength: number = 0
  private messageHeaderErrorCode: number = 0
  private messageHeaderInvokeID: number = 0

  protected override packetLength(): number;
  protected override packetLength(len: number): ThisType<MessageHeader>;
  protected override packetLength(len?: number | undefined) {
    if (typeof len === 'number') {
      this.messageHeaderLength = len
      super.packetLength(MessageHeader.baselength + len)
    }
    return this.messageHeaderLength
  }

  public constructor(dataLength: number) {
    super(MessageHeader.baselength + dataLength)
  }
}