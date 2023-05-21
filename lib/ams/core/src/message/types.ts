import { AMSNetAddress } from '../address'

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

// Requests

export interface ADSReadRequest {
  indexGroup: number
  indexOffset: number
  length: number
}

// Responses

export interface ADSResponse {
  result: number
}

export interface ADSReadResponse extends ADSResponse {
  length: number
  data: ArrayBuffer
}