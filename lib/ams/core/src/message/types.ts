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

export interface ADSRequestWithData {
  data: ArrayBuffer | null
}

export interface ADSReadRequest {
  indexGroup: number
  indexOffset: number
  length: number
}

export interface ADSWriteRequest extends ADSRequestWithData {
  indexGroup: number
  indexOffset: number
}

export interface ADSWriteControlRequest extends ADSRequestWithData {
  adsState: number
  deviceState: number
}

export interface ADSReadWriteRequest extends ADSRequestWithData {
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