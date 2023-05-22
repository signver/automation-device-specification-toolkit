import { ADSWriteControlRequest, AMSPacket } from '@signver/ams-core'
import { injectMetaStage, WriteControlRequestStage } from "../common"
import { rangeOfUint16 } from '@signver/assert/numbers'

export default function createWriteControlStage(message: AMSPacket<ADSWriteControlRequest>) {
  let stage = {
    adsState(n?: number) {
      if (typeof n === 'number') {
        message.data.adsState = rangeOfUint16(n)
        return stage
      }
      return message.data.adsState
    },
    deviceState(n?: number) {
      if (typeof n === 'number') {
        message.data.deviceState = rangeOfUint16(n)
        return stage
      }
      return message.data.deviceState
    },
    data(n?: ArrayBuffer) {
      if (!!n) {
        const original = new DataView(n)
        const clone = new DataView(new ArrayBuffer(n.byteLength))
        for (let i = 0; i < original.byteLength; i++) {
          clone.setUint8(i, original.getUint8(i))
        }
        message.protocolHeader.length = 32 + 8 + original.byteLength
        message.header.length = 8 + original.byteLength
        message.data.data = clone.buffer
        return stage
      }
      // robustness
      /* istanbul ignore next */
      const clone = new DataView(new ArrayBuffer(message.data.data?.byteLength || 0))
      // robustness
      /* istanbul ignore next */
      const original = new DataView(message.data.data || new ArrayBuffer(0))
      for (let i = 0; i < original.byteLength; i++) {
        clone.setUint8(i, original.getUint8(i))
      }
      return clone.buffer
    }
  } as WriteControlRequestStage
  stage = injectMetaStage(message, stage)
  return stage
}