import { AMSPacket } from "@signver/ams-core"
import { rangeOfUint32 } from "@signver/assert/numbers"

type WorkflowStep<Options extends string, Next> = {
  [option in Options]: Next
}

type WorkflowMultiStep<Options extends string, Next> = Next extends { [option in Options]: infer NextStage } ? {
  [option in Options]: Next[option]
} : unknown

export type NetworkOptions = 'tcp' | 'udp'
export type NetworkStage<Next> = WorkflowStep<
  NetworkOptions,
  Next
>

export type SenderOptions = 'from'
export type SenderStage<Next> = WorkflowStep<
  SenderOptions,
  Next
>

export type ReceiverOptions = 'to'
export type ReceiverStage<Next> = WorkflowStep<
  ReceiverOptions,
  Next
>

export type CommandOptions = 'readDeviceInfo' | 'read' | 'write' | 'readState' | 'writeControl' | 'addDeviceNotification' | 'deleteDeviceNotification' | 'deviceNotification' | 'readWrite'

export type FormatOptions = 'request' | 'respond'
export type FormatStage<RequestFlow, ResponseFlow> = WorkflowMultiStep<
  FormatOptions,
  {
    'request': RequestFlow,
    'respond': ResponseFlow
  }
>

export type MetaStage<T = {}> = T & {
  errorCode: GetSetFunction<number, MetaStage<T>>
  invokeID: GetSetFunction<number, MetaStage<T>>
}

type ExcludeMetaStage<T> = Exclude<T, 'errorCode' | 'invokeID'>

export type RequestStage = WorkflowMultiStep<
  CommandOptions,
  {
    readDeviceInfo: MetaStage
    read: ReadRequestStage
    write: WriteRequestStage
    readState: MetaStage
    writeControl: WriteControlRequestStage
    /** @todo */
    addDeviceNotification: void
    /** @todo */
    deleteDeviceNotification: void
    /** @todo */
    deviceNotification: void
    readWrite: ReadWriteRequestStage
  }
>

export interface GetSetFunction<T, R> {
  (): T
  (value: T): R
}

export type ReadRequestOptions = ExcludeMetaStage<keyof ReadRequestStage>
export type ReadRequestStage = MetaStage<{
  indexGroup: GetSetFunction<number, ReadRequestStage>
  indexOffset: GetSetFunction<number, ReadRequestStage>,
  length: GetSetFunction<number, ReadRequestStage>,
}>

export type WriteRequestOptions = ExcludeMetaStage<keyof WriteRequestStage>
export type WriteRequestStage = MetaStage<{
  indexGroup: GetSetFunction<number, WriteRequestStage>
  indexOffset: GetSetFunction<number, WriteRequestStage>,
  length: GetSetFunction<number, WriteRequestStage>,
  data: GetSetFunction<ArrayBuffer, WriteRequestStage>,
}>

export type WriteControlRequestOptions = ExcludeMetaStage<keyof WriteControlRequestStage>
export type WriteControlRequestStage = MetaStage<{
  adsState: GetSetFunction<number, WriteControlRequestStage>
  deviceState: GetSetFunction<number, WriteControlRequestStage>,
  length: GetSetFunction<number, WriteControlRequestStage>,
  data: GetSetFunction<ArrayBuffer, WriteControlRequestStage>,
}>

export type ReadWriteRequestOptions = ExcludeMetaStage<keyof ReadWriteRequestStage>
export type ReadWriteRequestStage = MetaStage<{
  indexGroup: GetSetFunction<number, ReadWriteRequestStage>
  indexOffset: GetSetFunction<number, ReadWriteRequestStage>,
  length: GetSetFunction<number, ReadWriteRequestStage>,
  data: GetSetFunction<ArrayBuffer, ReadWriteRequestStage>,
}>

export type ResponseStage = WorkflowMultiStep<
  CommandOptions,
  {
    readDeviceInfo: ReadDeviceResponseStage
    read: ReadResponseStage
    write: WriteResponseStage
    readState: ReadStateResponseStage
    writeControl: WriteControlResponseStage
    /** @todo */
    addDeviceNotification: void
    /** @todo */
    deleteDeviceNotification: void
    /** @todo */
    deviceNotification: void
    readWrite: ReadWriteResponseStage
  }
>

export type ReadDeviceResponseStage = MetaStage<{
  result: GetSetFunction<number, ReadDeviceResponseStage>
  majorVersion: GetSetFunction<number, ReadDeviceResponseStage>
  minorVersion: GetSetFunction<number, ReadDeviceResponseStage>
  buildVersion: GetSetFunction<number, ReadDeviceResponseStage>
  deviceName: GetSetFunction<string, ReadDeviceResponseStage>
}>

export type ReadResponseStage = MetaStage<{
  result: GetSetFunction<number, ReadResponseStage>
  length: GetSetFunction<number, ReadResponseStage>
  data: GetSetFunction<ArrayBuffer, ReadResponseStage>
}>

export type WriteResponseStage = MetaStage<{
  result: GetSetFunction<number, WriteResponseStage>
}>

export type ReadStateResponseStage = MetaStage<{
  result: GetSetFunction<number, ReadStateResponseStage>
  adsState: GetSetFunction<number, ReadStateResponseStage>
  deviceState: GetSetFunction<number, ReadStateResponseStage>
}>

export type WriteControlResponseStage = MetaStage<{
  result: GetSetFunction<number, WriteControlResponseStage>
}>

export type ReadWriteResponseStage = MetaStage<{
  result: GetSetFunction<number, ReadWriteResponseStage>
  length: GetSetFunction<number, ReadWriteResponseStage>
  data: GetSetFunction<ArrayBuffer, ReadWriteResponseStage>
}>

export type MessageWorkflow =
  NetworkStage<
    SenderStage<
      ReceiverStage<
        FormatStage<
          RequestStage,
          ResponseStage
        >
      >
    >
  >

export function injectMetaStage<Stage, Message extends AMSPacket>(message: Message, stage?: Stage) {
  const injectedStage = {
    ...stage,
    errorCode(n?: number) {
      if (typeof n === 'number') {
        message.header.errorCode = rangeOfUint32(n)
        return injectedStage
      }
      return message.header.errorCode
    },
    invokeID(n?: number) {
      if (typeof n === 'number') {
        message.header.invokeID = rangeOfUint32(n)
        return injectedStage
      }
      return message.header.invokeID
    }
  }
  return injectedStage as MetaStage<Stage>
}
