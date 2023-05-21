import { ADSReadRequest, ADSReadWriteRequest, ADSWriteControlRequest, ADSWriteRequest, AMSPacket, Command } from '@signver/ams-core'
import { RequestStage, CommandOptions, MetaStage, injectMetaStage } from "../common"
import createReadStage from './read'

function setPacketLength(message: AMSPacket, len: number = 0) {
  const baseLength = 32
  message.protocolHeader.length = baseLength + len
  message.header.length = len
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
    readDeviceInfo: (m) => {
      setPacketLength(m)
      m.header.command = Command.ReadDeviceInfo
    },
    read: (m) => {
      setPacketLength(m, 12);
      m.header.command = Command.Read;
      (m as AMSPacket<ADSReadRequest>).data = {
        indexGroup: 0,
        indexOffset: 0,
        length: 0
      }
    },
    write: (m) => {
      setPacketLength(m, 12)
      m.header.command = Command.Write;
      (m as AMSPacket<ADSWriteRequest>).data = {
        indexGroup: 0,
        indexOffset: 0,
        data: null
      }
    },
    readState: (m) => {
      setPacketLength(m, 0)
      m.header.command = Command.ReadState
    },
    writeControl: (m) => {
      setPacketLength(m, 2 + 2 + 4)
      m.header.command = Command.WriteControl;
      (m as AMSPacket<ADSWriteControlRequest>).data = {
        adsState: 0,
        deviceState: 0,
        data: null
      }
    },
    readWrite: (m) => {
      setPacketLength(m, 4 + 4 + 4 + 4)
      m.header.command = Command.ReadWrite;
      (m as AMSPacket<ADSReadWriteRequest>).data = {
        indexGroup: 0,
        indexOffset: 0,
        length: 0,
        data: null
      }
    }
  }
  return function createStage(message: AMSPacket): RequestStage {
    const middleware: ProxyHandler<RequestStage> = {
      get(target, p: keyof typeof target, receiver) {
        handleInitialPacket[p](message)
        return target[p]
      }
    }

    const meta = injectMetaStage(message)
    const stage = {
      addDeviceNotification: undefined,
      deleteDeviceNotification: undefined,
      deviceNotification: undefined,
      read: createReadStage(message as AMSPacket<ADSReadRequest>),
      readDeviceInfo: meta,
      readState: meta,
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
