export interface AMSProtocolHeader {
  length: number
}

export interface AMSHeader {
  source: AMSNetAddress,
  destination: AMSNetAddress
  command: number
  flags: number
  length: number
  errorCode: number
  invokeID: number
}

export type AMSPacket<Data = void> = {
  protocolHeader: AMSProtocolHeader
  header: AMSHeader
} & (Data extends void ? {} : { data: Data })
