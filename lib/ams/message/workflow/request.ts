import { ADSReadRequest, AMSPacket } from '@signver/ams-core'
import { RequestStage, FormatOptions, CommandOptions, ReadRequestStage } from "./common"
import { rangeOfUint32 } from '@signver/assert/numbers'

function setPacketLength(message: AMSPacket, len: number) {
  const baseLength = 6 + 32
  message.protocolHeader.length = baseLength + len
  message.protocolHeader.length = len
}

export default (() => {
  const handleInitialPacket: { [c in CommandOptions]: (message: AMSPacket<any>) => void } = {
    addDeviceNotification: (m) => {
      setPacketLength(m, 0)
    },
    deleteDeviceNotification: (m) => {
      setPacketLength(m, 0)
    },
    deviceNotification: (m) => {
      setPacketLength(m, 0)
    },
    read: (m) => {
      setPacketLength(m, 0);
      (m as AMSPacket<ADSReadRequest>).data = {
        indexGroup: 0,
        indexOffset: 0,
        length: 0
      }
    },
    readDeviceInfo: (m) => {
      setPacketLength(m, 0)
    },
    readState: (m) => {
      setPacketLength(m, 0)
    },
    readWrite: (m) => {
      setPacketLength(m, 0)
    },
    write: (m) => {
      setPacketLength(m, 0)
    },
    writeControl: (m) => {
      setPacketLength(m, 0)
    }
  }
  return function createStage(message: AMSPacket): RequestStage {
    const middleware: ProxyHandler<RequestStage> = {
      get(target, p: keyof typeof target, receiver) {
        handleInitialPacket[p](message)
        return target[p]
      }
    }

    const stage = {
      addDeviceNotification: undefined,
      deleteDeviceNotification: undefined,
      deviceNotification: undefined,
      read: createReadStage(message as AMSPacket<ADSReadRequest>),
      readDeviceInfo: undefined,
      readState: undefined,
      readWrite: undefined,
      write: undefined,
      writeControl: undefined
    } as any as RequestStage

    return new Proxy(
      stage,
      middleware
    )
  }
})()

function createReadStage(message: AMSPacket<ADSReadRequest>) {
  const stage = {
    errorCode(n?: number) {
      if (typeof n === 'number') {
        message.header.errorCode = rangeOfUint32(n)
        return stage
      }
      return message.header.errorCode
    },
    invokeID(n?: number) {
      if (typeof n === 'number') {
        message.header.invokeID = rangeOfUint32(n)
        return stage
      }
      return message.header.invokeID
    },
    indexGroup(n?: number) {
      if (typeof n === 'number') {
        message.header.invokeID = rangeOfUint32(n)
        return stage
      }
      return message.header.invokeID
    },
    indexOffset(n?: number) {
      if (typeof n === 'number') {
        message.header.invokeID = rangeOfUint32(n)
        return stage
      }
      return message.header.invokeID
    },
    length(n?: number) {
      if (typeof n === 'number') {
        message.data.length = rangeOfUint32(n)
        return stage
      }
      return message.header.length
    }
  } as ReadRequestStage
}