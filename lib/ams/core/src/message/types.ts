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

export type ADSData =
  | ADSReadRequest
  | ADSWriteRequest
  | ADSWriteControlRequest
  | ADSAddDeviceNotificationRequest
  | ADSDeleteDeviceNotificationRequest
  | ADSDeviceNotificationRequest
  | ADSReadWriteRequest
  | ADSReadDeviceInfoResponse
  | ADSReadResponse
  | ADSWriteResponse
  | ADSReadStateResponse
  | ADSWriteControlResponse
// TODO

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

export interface ADSAddDeviceNotificationRequest {
  indexGroup: number
  indexOffset: number
  length: number
  transmissionMode: number
  maxDelay: number
  cycleTime: number
}

export interface ADSDeleteDeviceNotificationRequest {
  handle: number
}

export interface ADSDeviceNotificationTimestampHeader {
  timestamp: number
  samples: ADSDeviceNotificationSample[]
}

export interface ADSDeviceNotificationSample {
  handle: number
  data: ArrayBuffer
}

export interface ADSDeviceNotificationRequest {
  headers: ADSDeviceNotificationTimestampHeader[]
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

export interface ADSReadDeviceInfoResponse extends ADSResponse {
  majorVersion: number
  minorVersion: number
  buildVersion: number
  deviceName: ArrayBuffer
}


export interface ADSReadResponse extends ADSResponse {
  length: number
  data: ArrayBuffer
}

export interface ADSWriteResponse extends ADSResponse {
}

export interface ADSReadStateResponse extends ADSResponse {
  adsState: number
  deviceState: number
}

export interface ADSWriteControlResponse extends ADSResponse {
}

export interface ADSAddDeviceNotificationResponse extends ADSResponse {
  handle: number
}

export interface ADSDeleteDeviceNotificationResponse extends ADSResponse {
}